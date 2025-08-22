import React, {createContext, ReactElement} from "react";

export type Range = {lower: number; upper: number};

export interface contextProps {
    resRange: [resRange: Range, setResRange: (e: Range) => void];
    sizeRange: [sizeRange: Range, setSizeRange: (e: Range) => void];
    selectedModalities: [
        selectedModalities: Modality[],
        setSelectedModalities: (e: Modality[]) => void
    ];
    searchText: [searchText: string, setSearchText: (e: string) => void];
    searching: [searching: boolean, setSearching: (e: boolean) => void];
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
export const UNIT_TO_SCALE: Record<Units, number> = {NANO: 1, MICRON: 1e3, MILLI: 1e6, CENTI: 1e9};

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
