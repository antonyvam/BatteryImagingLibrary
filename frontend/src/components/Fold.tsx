import React from "react";
import {FoldProps} from "src/interfaces/types";

const Fold = ({children, bgColour}: FoldProps) => {
    const colour = bgColour! as React.CSSProperties["backgroundColor"];
    const style: React.CSSProperties = {
        backgroundColor: colour,
        width: "100vw",
        height: "full",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column"
    };

    return <div style={style}>{children}</div>;
};

export default Fold;
