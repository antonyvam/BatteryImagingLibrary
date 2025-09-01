import {z} from "zod";
import {createContext, ReactElement} from "react";

// Utility to detect mobile
export const isMobile = () => typeof window !== "undefined" && window.innerWidth <= 768;

export interface FoldProps {
    children: ReactElement;
    bgColour: string;
    hero: boolean;
}

export const MAX_SIZE_NM = 1e9;
export const MAX_AREA_NM = 1e16;

export const UNITS = ["NANO", "MICRON", "MILLI", "CENTI"] as const;
export type Units = (typeof UNITS)[number];
export const UNIT_TO_UNIT_STR: Record<Units, string> = {
    NANO: "nm",
    MICRON: "µm",
    MILLI: "mm",
    CENTI: "cm"
};
export const UNIT_TO_SCALE: Record<Units, number> = {NANO: 1, MICRON: 1e3, MILLI: 1e6, CENTI: 1e8};

export const MODALITIES = [
    "SEM",
    "EDS",
    "EBSD",
    "LAB_MICRO_XCT",
    "NEUTRON_CT",
    "XRD_CT",
    "SYNCHOTRON_MICRO_XCT",
    "SYNCHOTRON_NANO_XCT"
] as const;
export type Modality = (typeof MODALITIES)[number];

export const MODALITY_TO_COLOUR: Record<Modality, string> = {
    SEM: "#387780",
    EDS: "#1fadd8ff",
    EBSD: "#8EA604",
    LAB_MICRO_XCT: "#bb441dff",
    NEUTRON_CT: "#888682ff",
    XRD_CT: "#D76A03",
    SYNCHOTRON_MICRO_XCT: "#d41919ff",
    SYNCHOTRON_NANO_XCT: "#ff0000ff"
};

export interface ExampleCardData {
    modality: Modality;
    text: string;
    imgPath: string;
}

export type ScanDetails = {
    scanID: number;
    sampleID: number;
    sampleName: string;
    chemistry: string;
    sampleDescription: string;
    scanType: string;
    scanModality: Modality;
    instrument: string;
    pixelSize_µm: (number | string)[];
    dataDimensions_px: (number | string)[];
    dataDimensions_µm: (number | string)[];
    thumbnailType: string;
    thumbnailName: string[];
    scanParameters: Record<string, string>;
    DOIs: string[];
    zenodoLinks: {
        rawZenodoLinks: string[];
        rawZenodoLabels: string[];
        processedZenodoLinks: string[];
        processedZenodoLabels: string[];
        reconstructedZenodoLinks: string[];
        reconstructedZenodoLabels: string[];
    };
};

export const ScanDetailsSchema = z.object({
    scanID: z.number(),
    sampleID: z.number(),
    sampleName: z.string(),
    chemistry: z.string(),
    sampleDescription: z.string(),
    scanType: z.string(),
    scanModality: z.enum(MODALITIES),
    instrument: z.string(),
    pixelSize_µm: z.array(z.union([z.number(), z.string()])),
    dataDimensions_px: z.array(z.union([z.number(), z.string()])),
    dataDimensions_µm: z.array(z.union([z.number(), z.string()])),
    thumbnailType: z.string(),
    thumbnailName: z.array(z.string()),
    scanParameters: z.record(z.string(), z.string()),
    DOIs: z.array(z.string()),
    zenodoLinks: z.object({
        rawZenodoLinks: z.array(z.string()),
        rawZenodoLabels: z.array(z.string()),
        processedZenodoLinks: z.array(z.string()),
        processedZenodoLabels: z.array(z.string()),
        reconstructedZenodoLinks: z.array(z.string()),
        reconstructedZenodoLabels: z.array(z.string())
    })
});

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
    scanData: [scanData: ScanDetails[], setScanData: (e: ScanDetails[]) => void];
    selectedScan: [
        selectedScan: ScanDetails | null,
        setSelectedScan: (e: ScanDetails | null) => void
    ];
}

const AppContext = createContext<contextProps | null>(null);
export default AppContext;
