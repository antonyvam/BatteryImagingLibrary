import os
import json
import re
from dataclasses import dataclass, asdict
from typing import Literal, List

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


def get_record_type(filename: str, description: str) -> RecordType:
    fname = filename.lower()
    if any(x in fname for x in ["_raw", "_sinograms", "_radiographs"]):
        return "Raw"
    if "_rec" in fname:
        return "Reconstructed"
    desc = description.lower()
    if "reconstructed" in desc:
        return "Reconstructed"
    if "raw" in desc:
        return "Raw"
    return "UNKNOWN"


def get_instrument(filename: str) -> Instrument:
    fname = filename.lower()
    # EBSD/EDS/SEM detection
    if "ebsd" in fname:
        return "EBSD"
    if "eds" in fname:
        return "EDS"
    if "sem" in fname or "fib sem" in fname:
        return "SEM"
    if "xrdct_" in fname:
        return "XRD_CT"
    if "synchotron_microct" in fname:
        return "SYNCHOTRON_MICRO_XCT"
    if "neutron_ct" in fname:
        return "NEUTRON_CT"
    if "lab_microct" in fname:
        return "LAB_MICRO_XCT"
    return "LAB_MICRO_XCT"  # fallback


def strip_description(desc: str) -> str:
    idx = desc.find("If you use these data,")
    if idx != -1:
        return desc[:idx].strip()
    return desc.strip()


def get_creators(creators_list):
    return [c["name"] for c in creators_list if "name" in c]


def get_name(filename: str, instrument: str, record_type: str) -> str:
    # Remove instrument and record_type from filename
    name = filename
    name = re.sub(r"lab_microct_|xrdct_|synchotron_microct_|neutron_ct_", "", name, flags=re.IGNORECASE)
    name = re.sub(r"(_raw|_rec|_sinograms|_radiographs)", "", name, flags=re.IGNORECASE)
    name = re.sub(r"\.json$", "", name, flags=re.IGNORECASE)
    return name


def main():
    json_dir = "zenodo_jsons"
    entries: List[Entry] = []
    for fname in os.listdir(json_dir):
        if not fname.endswith(".json"):
            continue
        fpath = os.path.join(json_dir, fname)
        with open(fpath, "r") as f:
            parsed_json = json.load(f)
        meta = parsed_json.get("metadata", {})
        description = meta.get("description", "")
        record_type = get_record_type(fname, description)
        instrument = get_instrument(fname)
        zenodo_title = meta.get("title", "")
        creators = get_creators(meta.get("creators", []))
        url = parsed_json.get("links", {}).get("html", "")
        desc_stripped = strip_description(description)
        name = get_name(fname, instrument, record_type)
        entry = Entry(
            name=name,
            zenodo_title=zenodo_title,
            instrument=instrument,
            record_type=record_type,
            record_label=record_type,
            creators=creators,
            description=desc_stripped,
            url=url,
        )
        entries.append(entry)

    # Save as JSON
    with open("zenodo_entries.json", "w") as f:
        json.dump([asdict(e) for e in entries], f, indent=2)


if __name__ == "__main__":
    main()
