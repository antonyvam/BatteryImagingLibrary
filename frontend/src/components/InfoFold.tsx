import React from "react";
import Fold from "./Fold";

import { Theme } from "../interfaces/constants";
import { HERO_DIMS, flexCentreDivStyle } from "../interfaces/constants";
import { Button } from "react-bootstrap";

const maxSpanFontSize = `min(2vw, ${HERO_DIMS.w * 0.015}px)`;
const btnTexts = ["GitHub", "Zenodo", "Paper"];
const btnLinks = ["Coming Soon", "Coming soon", "Coming soon"];

const infoText = `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."`

const getBtn = (i: number, val: string) => {
    const variant = (i == 1) ? "primary" : "light" ;
    const style: React.CSSProperties = {marginLeft: '10px', marginRight: '10px', fontSize: maxSpanFontSize };
    return (<Button key={String(i)} variant={variant} href={btnLinks[i]} style={style}>{val}</Button>)
} 


const InfoFold: React.FC = () => {
    return (
    <Fold bgColour={Theme.INFO_FOLD}>
        <div style={flexCentreDivStyle}>
            <p style={{maxWidth: '40%', color: 'whitesmoke', fontSize: maxSpanFontSize }}>{infoText}</p>
            <div style={{'display': 'flex'}}>
                {btnTexts.map((val, i) => getBtn(i, val))}
            </div>
        </div>
        
    </Fold>
    )
}

export default InfoFold;