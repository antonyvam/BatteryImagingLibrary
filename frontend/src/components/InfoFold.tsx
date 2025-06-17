import React from "react";
import Fold from "./Fold";

import {Theme} from "../interfaces/constants";
import {Button} from "react-bootstrap";

const btnTexts = ["GitHub", "Notebooks", "Zenodo", "Contribute!", "Paper"];
const bgColours = ["", "rgb(243, 119, 38)", "", "#87BCDE", ""];
const btnLinks = ["Coming Soon", "Coming soon", "Coming soon"];

const infoText =
    "Raw data, reconstructions, and processing scripts for lab-, synchotron-, neturon- and XRD- CT scans of commerical batteries."; //"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ";

const getBtn = (i: number, val: string) => {
    const variant = i == 2 ? "primary" : "light";
    const textColour = bgColours[i] != "" ? "white" : "";
    const style: React.CSSProperties = {
        marginLeft: "10px",
        marginRight: "10px",
        color: textColour,
        backgroundColor: bgColours[i],
        outlineColor: bgColours[i]
    };
    return (
        <Button key={String(i)} variant={variant} href={btnLinks[i]} style={style}>
            {val}
        </Button>
    );
};

const InfoFold: React.FC = () => {
    return (
        <Fold bgColour={Theme.INFO_FOLD} hero={false}>
            <div className="flex-centre-style">
                <p className="info-text">{infoText}</p>
                <div style={{display: "flex"}}>{btnTexts.map((val, i) => getBtn(i, val))}</div>
            </div>
        </Fold>
    );
};

export default InfoFold;
