import React from "react";
import {FoldProps} from "src/interfaces/types";

const Fold = ({children, bgColour, hero = false}: FoldProps) => {
    const colour = bgColour! as React.CSSProperties["backgroundColor"];
    const style: React.CSSProperties = {
        background: colour,
        width: "100vw",
        height: "full",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column"
    };

    if (hero) {
        style["background"] =
            "linear-gradient(0deg, rgba(33,33,33,1) 0%, rgba(214,214,214,0.14) 50%)";
    }

    return <div style={style}>{children}</div>;
};

export default Fold;
