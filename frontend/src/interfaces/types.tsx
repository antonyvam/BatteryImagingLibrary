import {createContext, ReactElement} from "react";

interface contextProps {
    foo: [foo: number | null, setFoo: (e: number | null) => void];
}

const AppContext = createContext<contextProps | null>(null);
export default AppContext;

export interface FoldProps {
    children: ReactElement;
    bgColour: string;
    hero: boolean;
}

export const UNITS = ["NANO", "MICRON", "MILLI", "CENTI"] as const;
export type Units = (typeof UNITS)[number];
export const UNIT_TO_UNIT_STR: Record<Units, string> = {
    NANO: "nm",
    MICRON: "µm",
    MILLI: "mm",
    CENTI: "cm"
};

export const MODALITIES = [
    "SEM",
    "EDX",
    "EBSD",
    "LAB_MICRO_XCT",
    "NEUTRON_CT",
    "XRD_CT",
    "SYNCHOTRON_MICRO_XCT",
    "SYNCHOTRON_NANO_XCT"
] as const;
export type Modality = (typeof MODALITIES)[number];
