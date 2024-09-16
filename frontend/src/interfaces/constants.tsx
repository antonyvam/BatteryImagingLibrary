import {ThemeCols} from "./types";

export const HERO_DIMS: {w: number; h: number} = {w: 1401, h: 610};
export const Theme: ThemeCols = {
    HERO_BG: "#707070",
    INFO_FOLD: "#212121",
    DATA_FOLD: "#f8f9fa",
    BLUE: "#0d6efd",
    LIGHT_GREY: "#bcc3cf"
};

export const flexCentreDivStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    color: "whitesmoke",
    margin: "3%"
};

export const cardStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    margin: "3%",
    width: "76%",
    maxWidth: 1000
};

export const heroGradDivStyle: React.CSSProperties = {
    zIndex: 0,
    position: "absolute",
    width: "100%",
    top: 0,
    right: 0,
    background:
        "linear-gradient(0deg, rgba(22,22,22,1) 8%, rgba(214,214,214,0.07886904761904767) 100%)",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    color: "whitesmoke"
};
