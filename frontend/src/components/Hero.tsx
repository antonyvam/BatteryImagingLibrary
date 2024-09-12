import React from "react";
import Image from 'react-bootstrap/Image';
import Fold from "./Fold";
import { Theme, heroGradDivStyle, HERO_DIMS } from "../interfaces/constants";
import { hexToRGB } from "../interfaces/helpers";


const maxTitleFontSize = `min(5vw, ${HERO_DIMS.w * 0.05}px)`
const maxSpanFontSize = `min(2vw, ${HERO_DIMS.w * 0.02}px)`
const marginOffset = `min(${HERO_DIMS.h - 210}px, 28%)`


const c1 = "#0d6efd";
const c2 = "#FD9C0D";
const liStyle: React.CSSProperties = {color: c1};
const bStyle: React.CSSProperties = {
    background: `linear-gradient(to right, ${c1}, ${c2})`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: "transparent",
};
const atteryStyle: React.CSSProperties = {color: c2};

const Hero: React.FC = () => {
    /*Auto-resizing hero div based on fluid image inside parent div. */

    const getStyle = (colourStr: string): React.CSSProperties => {
        // update gradient end colour of hero div based on theme in constants
        const endGradCol = hexToRGB(colourStr, 1);
        const gradStr = `linear-gradient(0deg, ${endGradCol} 8%, rgba(214,214,214,0.07886904761904767) 100%)`;
        const style = heroGradDivStyle
        style["background"] = gradStr
        return style
    }

    return (
    <Fold bgColour={Theme.HERO_BG}>
        <div style={{width: 'full', height: 'full'}}>
            <Image src="/assets/imgs/hero.png" style={{zIndex: -1}} fluid></Image>
            <div style={getStyle(Theme.INFO_FOLD)}>
                <h2 style={{fontSize: maxTitleFontSize, marginTop: marginOffset }}> 
                    <span style={liStyle}>li</span>
                    <span style={bStyle}>b</span>
                    <span style={atteryStyle}>attery</span>
                    <span> ct</span>
                    
                </h2>
                <span style={{maxWidth: "40%", fontSize: maxSpanFontSize, textAlign: 'center'}}> Raw data, reconstructions, and processing scripts for lab-, synchotron-, neturon- and XRD- CT scans of commerical batteries.   </span>
            </div>
        </div>
    </Fold>
    )
}

export default Hero;