import React from "react";
import Image from 'react-bootstrap/Image';
import Fold from "./Fold";
import { Theme } from "../interfaces/constants";
import { hexToRGB } from "../interfaces/helpers";


const gradStyle: React.CSSProperties = {
    zIndex: 0, 
    position: "absolute", 
    width: "100%", 
    height: "100%", 
    top: 0, 
    right: 0, 
    background: "linear-gradient(0deg, rgba(22,22,22,1) 8%, rgba(214,214,214,0.07886904761904767) 100%)",
    display: "flex",
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    color: "whitesmoke",
}




const Hero: React.FC = () => {

    const getStyle = (colourStr: string): React.CSSProperties => {
        const endGradCol = hexToRGB(colourStr, 1);
        const gradStr = `linear-gradient(0deg, ${endGradCol} 8%, rgba(214,214,214,0.07886904761904767) 100%)`;
        const style = gradStyle
        style["background"] = gradStr
        return style
    }


    return (
    <Fold bgColour={Theme.HERO_BG}>
        <div style={{width: 'full', height: 'full'}}>
            <Image src="/assets/imgs/hero.png" style={{zIndex: -1}} fluid></Image>
            <div style={getStyle(Theme.INFO_FOLD)}>
                <h2 style={{fontSize: "6vw", marginTop: "20%" }}>libattery ct</h2>
                <span style={{maxWidth: "50%", fontSize: "2vw", textAlign: 'center'}}> Raw data, reconstructions, and processing scripts for lab-, synchotron-, neturon- and XRD- CT scans of commerical batteries.   </span>
            </div>
        </div>
    </Fold>
    )
}

export default Hero;