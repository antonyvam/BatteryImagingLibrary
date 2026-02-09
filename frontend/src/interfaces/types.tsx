import {z} from "zod";
import {createContext, ReactElement} from "react";

// Utility to detect mobile
export const isMobile = () => typeof window !== "undefined" && window.innerWidth <= 768;

export interface FoldProps {
    children: ReactElement;
    bgColour: string;
    hero: boolean;
}

export const MIN_SIZE_NM = 0.1;
export const MAX_SIZE_NM = 1e7;
export const MAX_L_PX = 50_000;

export const UNITS = ["NANO", "MICRON", "MILLI", "CENTI", "PIXEL"] as const;
export type Units = (typeof UNITS)[number];
export const UNIT_TO_UNIT_STR: Record<Units, string> = {
    NANO: "nm",
    MICRON: "µm",
    MILLI: "mm",
    CENTI: "cm",
    PIXEL: "px"
};
export const UNIT_TO_SCALE: Record<Units, number> = {
    NANO: 1,
    MICRON: 1e3,
    MILLI: 1e6,
    CENTI: 1e8,
    PIXEL: 1
};

export const MODALITIES = [
    "ANY",
    "SEM",
    "EDS",
    "EBSD",
    "LAB_MICRO_XCT",
    "LAB_NANO_XCT",
    "NEUTRON_CT",
    "XRD_CT",
    "XANES_CT",
    "SYNCHOTRON_MICRO_XCT",
    "SYNCHOTRON_NANO_XCT",
    "S3DXRD",
    "TEM",
    "APT"
] as const;
export type Modality = (typeof MODALITIES)[number];

export const MODALITY_TO_COLOUR: Record<Modality, string> = {
    SEM: "#387780",
    EDS: "#1fadd8ff",
    EBSD: "#8EA604",
    LAB_MICRO_XCT: "#bb441dff",
    LAB_NANO_XCT: "rgb(255, 87, 32)",
    NEUTRON_CT: "#888682ff",
    XRD_CT: "#D76A03",
    XANES_CT: "rgb(80, 255, 109)",
    SYNCHOTRON_MICRO_XCT: "#d41919ff",
    SYNCHOTRON_NANO_XCT: "#ff0000ff",
    S3DXRD: "#ac34c9",
    TEM: "#01328d",
    APT: "#4a148c",
    ANY: "#000000"
};

export interface ExampleCardData {
    modality: Modality;
    text: string;
    imgPath: string;
    isVideo: boolean;
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
    pixelSize_µm: (number | string)[] | null;
    dataDimensions_px: (number | string)[] | null;
    dataDimensions_µm: number[] | null;
    thumbnailType: string;
    thumbnailName: string[];
    scanParameters: Record<string, string>;
    citations: string[];
    contributors: string;
    licence: "CC-4.0" | "CC0";
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
    pixelSize_µm: z.array(z.union([z.number(), z.string()])).nullable(),
    dataDimensions_px: z.array(z.union([z.number(), z.string()])).nullable(),
    // dataDimensions_µm: z.array(z.union([z.number(), z.string()])),
    dataDimensions_µm: z.array(z.number()).nullable(),
    thumbnailType: z.string(),
    thumbnailName: z.array(z.string()),
    scanParameters: z.record(z.string(), z.string()),
    citations: z.array(z.string()),
    contributors: z.string(),
    licence: z.enum(["CC-4.0", "CC0"]),
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
    scanData: [scanData: ScanDetails[], setScanData: (e: ScanDetails[]) => void];
    selectedScan: [
        selectedScan: ScanDetails | null,
        setSelectedScan: (e: ScanDetails | null) => void
    ];
    showContribute: [showContribute: boolean, setShowContribute: (e: boolean) => void];
    showContributors: [showContributors: boolean, setShowContributors: (e: boolean) => void];
    showAbout: [showAbout: boolean, setShowAbout: (e: boolean) => void];
    isSearching: [isSearching: boolean, setIsSearching: (e: boolean) => void];
}

const AppContext = createContext<contextProps | null>(null);
export default AppContext;
