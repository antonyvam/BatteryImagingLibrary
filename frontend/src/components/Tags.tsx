import React from "react";
import {TagsProps} from "src/interfaces/types";

const COLOURS = [
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#8EA604",
    "#F5BB00",
    "#D76A03",
    "#BF3100",
    "#FF88DC",
    "#91A6FF",
    "#FF5154",
    "#9A275A",
    "#CB958E",
    "#253031",
    "#BCAB79",
    "#EC9F05",
    "#0E402D",
    "#757780",
    "#8ACE00",
    "#D2CCA1",
    "#387780"
];

export const IGNORE_HEADERS = [
    "global_scan_number",
    "local_scan_number",
    "battery_number",
    "imaging_type",
    "battery",
    "url",
    "wavelengths",
    "desc",
    "comments"
];

export const getText = (
    header: string,
    value: string | number | Array<number>,
    reduced: boolean
) => {
    let prefix = "";
    let tag = "";
    if (header == "scan") {
        tag = value + " " + "scan";
    } else if (header == "image_size") {
        tag = value[0] + "x" + value[1] + "x" + value[2];
    } else if (header == "projections") {
        tag = value + " projections";
    } else if (header == "exposure_time_s") {
        prefix = "exposure: ";
        tag = value + "s";
    } else if (header == "potential_kv") {
        prefix = "potential: ";
        tag = value + "kV";
    } else if (header == "power") {
        prefix = "power: ";
        tag = value + "W";
    } else if (header == "pixel_binning") {
        prefix = "pixel binning: ";
        tag = value.toString();
    } else if (header == "scan_time_min") {
        prefix = "scan time: ";
        tag = value + "mins";
    } else if (header == "voxel_size_microns") {
        prefix = "voxel size: ";
        tag = value + "µm";
    } else if (header == "frame_binning") {
        prefix = "frame binning: ";
        tag = value.toString();
    } else if (header == "acq_time_min") {
        prefix = "acquisition time: ";
        tag = value.toString() + "mins";
    } else if (header == "magnification") {
        prefix = "magnification: ";
        tag = value.toString() + "x";
    } else {
        tag = value.toString();
    }
    if (reduced === false) {
        return prefix + tag;
    } else {
        return tag;
    }
};
// TODO: add check if value for header same as previous scan, if it is then ignore it
const getTag = (
    header: string,
    value: string,
    i: number,
    reduced: boolean,
    prevVal: string | null
) => {
    if (value == "N/A") {
        return <div key={i}></div>;
    } else if (prevVal == value) {
        return <div key={i}></div>;
    } else if (IGNORE_HEADERS.includes(header)) {
        return <div key={i}></div>;
    } else {
        return (
            <span
                key={i}
                className="badge"
                style={{backgroundColor: COLOURS[i - 1], fontSize: "0.8em"}}
            >
                {getText(header, value, reduced)}
            </span>
        );
    }
};

const Tags = ({scanEntry, prevEntry, reduced}: TagsProps) => {
    const wrap = reduced ? "wrap" : "wrap";
    const overflow = reduced ? "visible" : "visible";
    const maxWidth = reduced ? "24em" : "30em";
    const scanEntries = Object.entries(scanEntry);
    const prevEntries =
        prevEntry === null
            ? scanEntries.map(([k, v], i) => [null, null])
            : Object.entries(prevEntry);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                justifyItems: "flex-start",
                flexWrap: wrap,
                overflowX: overflow,
                gap: "1px 2px",
                maxWidth: maxWidth
            }}
        >
            {scanEntries.map(([k, v], i) => getTag(k, v, i, reduced, prevEntries[i][1]))}
        </div>
    );
};

export default Tags;
