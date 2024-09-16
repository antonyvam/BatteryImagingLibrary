import React from "react";
import {Stack} from "react-bootstrap";
import {FrameProps} from "src/interfaces/types";
import DataCard from "./DataCard";

import "../assets/scss/styles.css";

const DataFrame = ({
    title,
    data,
    showModal,
    setShowModal,
    modalEntry,
    setModalEntry
}: FrameProps) => {
    const getTitle = (titleStr: string) => {
        if (titleStr == "xrd") {
            return "XRD";
        } else if (titleStr == "lab") {
            return "Laboratory";
        } else {
            return titleStr.charAt(0).toUpperCase() + titleStr.slice(1);
        }
    };

    return (
        <Stack style={{margin: "1%"}}>
            <div className="data-frame">
                <h1>{getTitle(title)}</h1>
            </div>
            {Object.entries(data).map(([k, v]) => (
                <DataCard
                    title={k}
                    data={v}
                    key={k}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    modalEntry={modalEntry}
                    setModalEntry={setModalEntry}
                />
            ))}
        </Stack>
    );
};

export default DataFrame;
