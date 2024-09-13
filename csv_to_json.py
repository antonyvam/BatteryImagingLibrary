from typing import Literal
import csv
from json import dump

# TODO: add filepath mappings to gifs/orthoslices
# requires defining a primary gif

imaging_types = ("lab", "xrd", "neutron", "synchotron")
ScanTypes = Literal["full", "roi"]

data: dict[str, dict] = {}
for t in imaging_types:
    data[t] = {}


def append_to_dict(obj: dict, key: str, entry: dict[str, str | float | int]) -> None:
    keys = obj.keys()
    if key in keys:
        n_existing_entries = len(obj[key].keys())
        obj[key][str(n_existing_entries)] = entry
    else:
        obj[key] = {}
        obj[key]["0"] = entry


with open("test_sheet.csv", newline="") as csvfile:
    reader = csv.reader(csvfile, delimiter="|")
    headers: list[str] = next(
        reader,
    )
    for row in reader:
        imaging_type = row[1]
        assert imaging_type in imaging_types
        battery_type = row[2]
        entry: dict[str, str | float | int] = {}
        for i, h in enumerate(headers):
            if i < 3:
                continue
            entry[h] = str(row[i])
        append_to_dict(data[imaging_type], battery_type, entry)
print(data)

with open("frontend/src/assets/data.json", "w") as f:
    dump(data, f, indent=2, sort_keys=False)
