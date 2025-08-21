// Render a resolution value as 1x10^n if > 1,000 or < 0.001, else as normal string
export function renderResolutionText(val: number): string {
    if (val === 0 || isNaN(val)) return "0";
    if (Math.abs(val) >= 1000) {
        const exp = Math.floor(Math.log10(Math.abs(val)));
        const base = val / Math.pow(10, exp);
        return `${base.toFixed(1)}×10^${exp}`;
    }
    if (Math.abs(val) > 0 && Math.abs(val) < 0.001) {
        const exp = Math.floor(Math.log10(Math.abs(val)));
        const base = val / Math.pow(10, exp);
        return `${base.toFixed(1)}×10^${exp}`;
    }
    return val.toString();
}
import {Modality, UNIT_TO_UNIT_STR, Units} from "./types";

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
