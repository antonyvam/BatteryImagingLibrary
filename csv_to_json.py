from typing import Literal
import csv
from json import dump

# TODO: add filepath mappings to gifs/orthoslices
# requires defining a primary gif

imaging_types = ("lab", "xrd", "neutron", "synchotron")
float_categories = ("exposure_time_s", "power", "voxel_size_microns", "magnification")
int_categories = (
    "battery_number" "projections",
    "potential_kv",
    "projections",
    "pixel_binning",
    "frame_binning",
    "scan_time_min",
    "frame_binning",
    "acq_time_min",
)


out: dict[str, dict] = {"data": {}, "unique_props": {}}
for t in imaging_types:
    out["data"][t] = {}


def append_to_dict(
    obj: dict, key: str, entry: dict[str, str | float | int | list]
) -> None:
    keys = obj.keys()
    if key in keys:
        n_existing_entries = len(obj[key].keys())
        obj[key][n_existing_entries] = entry
    else:
        obj[key] = {}
        obj[key][0] = entry


INVALID_STR = "N/A"


def process_entry(val: str, header: str) -> str | float | int | list:
    if val == "":
        return INVALID_STR
    elif header in float_categories:
        return float(val)
    elif header in int_categories:
        return int(val)
    elif header == "image_size":
        dims = val.split("x")
        return [int(d) for d in dims]
    elif header == "wavelengths":
        dims = val.split(", ")
        return [str(d) for d in dims]
    else:
        return str(val)


with open("test_sheet.csv", newline="") as csvfile:
    reader = csv.reader(csvfile, delimiter="|")
    headers: list[str] = next(
        reader,
    )
    for h in headers:
        out["unique_props"][h] = []

    local_scan_count, prev_battery_type = 0, ""
    for j, row in enumerate(reader):
        imaging_type = row[1]
        assert imaging_type in imaging_types

        battery_type = row[2]
        if prev_battery_type == battery_type:
            local_scan_count += 1
        else:
            print(f"changing from {prev_battery_type} to {imaging_type}")
            local_scan_count = 0
        prev_battery_type = battery_type

        entry: dict[str, str | float | int | list] = {}
        entry["global_scan_number"] = j
        entry["local_scan_number"] = local_scan_count
        for i, h in enumerate(headers):
            to_add = process_entry(row[i], h)
            is_new = to_add not in out["unique_props"][h]
            is_valid = to_add != INVALID_STR
            if is_new and is_valid and h != "desc":
                out["unique_props"][h].append(to_add)
            entry[h] = to_add
        append_to_dict(out["data"][imaging_type], battery_type, entry)
print(out)

with open("frontend/src/assets/data.json", "w") as f:
    dump(out, f, indent=2, sort_keys=False)
