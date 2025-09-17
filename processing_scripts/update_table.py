import os
import json
import re
from dataclasses import dataclass, asdict
from typing import Literal, List
from time import sleep

import pandas as pd

from google import genai
from google.genai import types
from pydantic import BaseModel


Instrument = Literal[
    "SEM", "EDS", "EBSD", "LAB_MICRO_XCT", "NEUTRON_CT", "XRD_CT", "SYNCHOTRON_MICRO_XCT", "SYNCHOTRON_NANO_CT"
]
RecordType = Literal["Raw", "Reconstructed", "Processed", "UNKNOWN"]


@dataclass
class Entry:
    name: str
    zenodo_title: str
    instrument: Instrument
    record_type: RecordType
    record_label: str
    creators: List[str]
    description: str
    url: str


def load_bil_tsv(path: str) -> pd.DataFrame:
    return pd.read_csv(path, sep="\t")


def load_zenodo_entries(path: str) -> list[Entry]:
    with open(path, "r") as f:
        data = json.load(f)
    entries: list[Entry] = []
    for item in data:
        # Only parse items with required fields
        if all(
            k in item
            for k in [
                "name",
                "zenodo_title",
                "instrument",
                "record_type",
                "record_label",
                "creators",
                "description",
                "url",
            ]
        ):
            entries.append(Entry(**item))
    return entries


def normalize_string(s: str) -> str:
    return re.sub(r"[_\s]+", "", s).lower()


def fuzzy_match(a: str, b: str, threshold: float = 0.8) -> bool:
    a_norm = normalize_string(a)
    b_norm = normalize_string(b)
    # Simple ordered character match
    matches = sum(1 for x, y in zip(a_norm, b_norm) if x == y)
    min_len = min(len(a_norm), len(b_norm))
    if min_len == 0:
        return False
    score = matches / min_len
    return score >= threshold


client = genai.Client()


class Response(BaseModel):
    matches: bool


def gemini_match(entry: Entry, row_name: str, row_desc: str, row_instrument: str) -> Response:
    prompt = f""" 
    Below are some details of a zenodo entry and a row in a spreadsheet. It is your job to determine if the
    zenodo entry matches the spreadsheet. Look for similiarites between filenames/titles and descriptions.

    Zenodo:
    - name: {entry.name}
    - title: {entry.zenodo_title}
    - description: {entry.description}
    
    Spreadsheet row:
    - name: {row_name}
    - description: {row_desc}
    - instrument: {row_instrument}
"""
    response = client.models.generate_content(
        model="gemini-2.0-flash-lite",
        contents=prompt,
        config=types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(thinking_budget=0),  # Disables thinking
            response_mime_type="application/json",
            response_schema=Response,
            temperature=0,
        ),
    )
    parsed = Response.model_validate_json(response.text)
    print(parsed)
    return parsed


def update_bil_with_entries(df: pd.DataFrame, entries: list[Entry]) -> pd.DataFrame:
    for entry in entries:
        for idx, row in df.iterrows():
            # First filter by instrument
            if normalize_string(entry.instrument) != normalize_string(str(row["Scan modality"])):
                continue
            # Then fuzzy match Sample Name
            row_details = [str(row[i]) for i in ["Sample Name", "Sample Description", "Instrument"]]
            resp = gemini_match(entry, *row_details)
            print(entry.name, row_details[0], resp.matches)
            if resp.matches:
                # Update Zenodo Links and Labels
                if entry.record_type == "Raw":
                    link_col, label_col = "Raw Zenodo links", "Raw Zenodo labels"
                elif entry.record_type == "Reconstructed":
                    link_col, label_col = "Reconstructed Zenodo links", "Reconstructed Zenodo labels"
                elif entry.record_type == "Processed":
                    link_col, label_col = "Processed Zenodo links", "Processed Zenodo labels"
                else:
                    continue
                # Append URL and label
                df.at[idx, link_col] = (
                    str(row[link_col]) + ";" if pd.notna(row[link_col]) and row[link_col] else ""
                ) + entry.url
                df.at[idx, label_col] = (
                    str(row[label_col]) + ";" if pd.notna(row[label_col]) and row[label_col] else ""
                ) + entry.record_label  # entry.record_label
                # Update Contributors
                df.at[idx, "Contributors"] = ", ".join(entry.creators)
            sleep(2.1)
    return df


def main():
    bil_path = os.path.join(os.path.dirname(__file__), "in", "BIL.tsv")
    zenodo_path = os.path.join(os.path.dirname(__file__), "in", "zenodo_entries.json")
    out_path = os.path.join(os.path.dirname(__file__), "out", "BIL_modified.tsv")

    df = load_bil_tsv(bil_path)
    entries = load_zenodo_entries(zenodo_path)
    df_updated = update_bil_with_entries(df, entries)
    df_updated.to_csv(out_path, sep="\t", index=False)


if __name__ == "__main__":
    main()
