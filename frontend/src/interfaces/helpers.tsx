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
