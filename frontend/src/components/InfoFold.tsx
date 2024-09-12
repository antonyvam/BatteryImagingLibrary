
import React from "react";
import Fold from "./Fold";

import { Theme } from "../interfaces/constants";
import { HERO_DIMS, flexCentreDivStyle } from "../interfaces/constants";
import { Button, ButtonGroup } from "react-bootstrap";

const maxSpanFontSize = `min(2vw, ${HERO_DIMS.w * 0.015}px)`

const InfoFold: React.FC = () => {
    /*Auto-resizing hero div based on fluid image inside parent div. */

    return (
    <Fold bgColour={Theme.INFO_FOLD}>
        <div style={flexCentreDivStyle}>
            <p style={{maxWidth: '40%', color: 'whitesmoke', fontSize: maxSpanFontSize }}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            <ButtonGroup>
                <Button></Button>
            </ButtonGroup>
        </div>
        
    </Fold>
    )
}

export default InfoFold;