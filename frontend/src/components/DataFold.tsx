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

    // TOOD: search bar at the top
    // TODO: this should have max width in px and be like 80% otherwise or something

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
                <DataModal show={showModal} setShow={setShowModal} entry={modalEntry} />
            </div>
        </Fold>
    );
};

export default DataFold;
