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

export const UNITS = ["NM", "µM", "MM", "CM"];
export type Units = (typeof UNITS)[number];

export const MODALITIES = [
    "SEM",
    "EDX",
    "EBSD",
    "LAB_XCT",
    "NEUTRON_CT",
    "XRD_CT",
    "SYNCHOTRON_MICRO_CT",
    "SYNCHOTRON_NANO_CT"
];
export type Modality = (typeof MODALITIES)[number];
