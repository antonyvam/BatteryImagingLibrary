import { createContext, ReactElement } from "react";

interface contextProps {
    foo: [
        foo: number | null,
        setFoo: (e: number | null) => void
    ]
};

const AppContext = createContext<contextProps | null>(null);
export default AppContext;

export interface FoldProps {
    children: ReactElement,
    bgColour: string
}

export interface ThemeCols {
    HERO_BG: string,
    INFO_FOLD: string,
    DATA_FOLD: string
}

export interface FrameProps {
    title: string,
    data: object
}