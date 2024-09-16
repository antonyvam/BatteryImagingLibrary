import React from "react";
import Image from "react-bootstrap/Image";
import Fold from "./Fold";
import {Theme} from "../interfaces/constants";
import "../assets/scss/styles.css";

const Hero: React.FC = () => {
    /*Auto-resizing hero div based on fluid image inside parent div. */

    return (
        <Fold bgColour={Theme.HERO_BG} hero={true}>
            <div className="hero-parent-div">
                <Image
                    src="/assets/imgs/hero.png"
                    style={{zIndex: -1, left: "0%", top: "0%"}}
                    fluid
                ></Image>
                <Image
                    src="/assets/imgs/hero.png"
                    style={{visibility: "hidden", zIndex: -10, height: 0, width: 0}}
                    fluid
                ></Image>
                <div className="hero-grad-div">
                    <h1 className="title">
                        <span className="li-text">li</span>
                        <span className="b-text">b</span>
                        <span className="attery-text">attery</span>
                        <span>-ct</span>
                    </h1>
                    <span className="subhead">
                        Raw data, reconstructions, and processing scripts for lab-, synchotron-,
                        neturon- and XRD- CT scans of commerical batteries.
                    </span>
                </div>
            </div>
        </Fold>
    );
};

export default Hero;
