import {
    Modality,
    UNIT_TO_SCALE,
    UNIT_TO_UNIT_STR,
    Units,
    ScanDetailsSchema,
    ScanDetails
} from "./types";
import data from "../assets/data.json";

// Render a resolution value as 1x10^n if > 1,000 or < 0.001, else as normal string
export function renderResolutionText(val: number, unit: Units = "NANO"): string {
    const scaled = val * UNIT_TO_SCALE[unit] * val;

    if (scaled === 0 || isNaN(scaled)) return "0";
    if (Math.abs(scaled) >= 1000) {
        const exp = Math.floor(Math.log10(Math.abs(scaled)));
        const base = scaled / Math.pow(10, exp);
        return `${base.toFixed(1)}×10^${exp}`;
    }
    if (Math.abs(scaled) > 0 && Math.abs(scaled) < 0.001) {
        const exp = Math.floor(Math.log10(Math.abs(scaled)));
        const base = scaled / Math.pow(10, exp);
        return `${base.toFixed(1)}×10^${exp}`;
    }
    return scaled.toPrecision(3).toString();
}

export function parseStrAsNumber(s: string): number {
    if (!s) return NaN;
    // Handle scientific notation like 1x10^3 or 1×10^3
    const sciMatch = s.match(/^([+-]?\d*\.?\d+)\s*[x×]\s*10\^([+-]?\d+)$/i);
    if (sciMatch) {
        const base = parseFloat(sciMatch[1]);
        const exp = parseInt(sciMatch[2], 10);
        return base * Math.pow(10, exp);
    }
    // Handle 1e3 or 1E3
    const num = Number(s);
    return isNaN(num) ? 0 : num;
}

export const renderModality = (x: Modality) => {
    switch (x) {
        case "LAB_MICRO_XCT":
            return "Lab micro-XCT";
        case "XRD_CT":
            return "XRD-CT";
        case "NEUTRON_CT":
            return "Neutron-CT";
        case "SYNCHOTRON_MICRO_XCT":
            return "Synchotron micro-XCT";
        case "SYNCHOTRON_NANO_XCT":
            return "Synchotron nano-XCT";
        default:
            return x;
    }
};

export const renderUnit = (x: Units) => {
    return UNIT_TO_UNIT_STR[x];
};

export function loadAndParseScanDetails(): ScanDetails[] {
    const res = data
        .map((item) => {
            return ScanDetailsSchema.safeParse(item);
        })
        .filter((v) => v.success)
        .map((v) => v.data);
    return res;
}
