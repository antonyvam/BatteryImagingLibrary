import React from "react";
import Fold from "./Fold";

import { Theme, HERO_DIMS } from "../interfaces/constants";
import { Stack } from "react-bootstrap";

import "../assets/scss/styles.css";

const maxTitleFontSize = `min(2vw, ${HERO_DIMS.w * 0.02}px)`
const maxTextFontSize = `min(2vw, ${HERO_DIMS.w * 0.015}px)`;

const DataFold: React.FC = () => {
    // map over all imaging types to make frames
    // (inside) map over all battery types to make cards
    // need/want global data structure to do this? maybe only data fold needs to see the info?
    // the modal might - although that could be a child of data fold I suppose

    return (
    <Fold bgColour={Theme.DATA_FOLD}>
        <Stack style={{alignItems: 'center', marginTop: '3%', width: '56%'}}>
            <button className="accordion">Section 1</button>
            <div className="panel">
                <p>Lorem ipsum...</p>
            </div>

            <button className="accordion">Section 2</button>
            <div className="panel">
                <p>Lorem ipsum...</p>
            </div>

            <button className="accordion">Section 3</button>
            <div className="panel">
                <p>Lorem ipsum...</p>
            </div>
        </Stack>

    </Fold>
    )
}

export default DataFold;