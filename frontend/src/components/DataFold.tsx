import React, {useState} from "react";
import Fold from "./Fold";

import {Theme, HERO_DIMS, cardStyle} from "../interfaces/constants";

import "../assets/scss/styles.css";
import data from "../assets/data.json";

import DataFrame from "./DataFrame";
import DataModal from "./Modal";

const maxTitleFontSize = `min(2vw, ${HERO_DIMS.w * 0.02}px)`;
const maxTextFontSize = `min(2vw, ${HERO_DIMS.w * 0.015}px)`;

console.log(data);

const DataFold: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalEntry, setModalEntry] = useState<object | null>(null);

    // search bar at the top
    // map over all imaging types to make frames
    // (inside) map over all battery types to make cards
    // need/want global data structure to do this? maybe only data fold needs to see the info?
    // the modal might - although that could be a child of data fold I suppose

    return (
        <Fold bgColour={Theme.DATA_FOLD}>
            <div style={cardStyle}>
                {Object.entries(data["data"]).map(([k, v]) => (
                    <DataFrame
                        key={k}
                        title={k}
                        data={v}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        modalEntry={modalEntry}
                        setModalEntry={setModalEntry}
                    />
                ))}
                <DataModal show={showModal} setShow={setShowModal} entry={data["0"]} />
            </div>
        </Fold>
    );
};

export default DataFold;
