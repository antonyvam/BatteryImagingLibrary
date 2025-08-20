import React from "react";
import {Stack} from "react-bootstrap";
import {FrameProps} from "src/interfaces/types";
import DataCard from "./DataCard";

import "../assets/scss/styles.css";
import {regexSearch} from "../../interfaces/helpers";

export const getTitle = (titleStr: string) => {
    if (titleStr == "xrd") {
        return "XRD-CT";
    } else if (titleStr == "lab") {
        return "Lab XCT";
    } else if (titleStr == "neutron") {
        return "Neutron-CT";
    } else if (titleStr == "synchotron") {
        return "Synchotron XCT";
    } else {
        return titleStr.charAt(0).toUpperCase() + titleStr.slice(1);
    }
};

const DataFrame = ({
    title,
    data,
    showModal,
    setShowModal,
    modalEntry,
    setModalEntry,
    searchText
}: FrameProps) => {
    return (
        <Stack style={{margin: "1%"}} id={title}>
            <div className="data-frame">
                <h1>{getTitle(title)}</h1>
            </div>
            {Object.entries(data)
                .filter(([k, v]) => regexSearch(searchText, v))
                .map(([k, v]) => (
                    <DataCard
                        title={k}
                        data={v}
                        key={k}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        modalEntry={modalEntry}
                        setModalEntry={setModalEntry}
                        searchText={searchText}
                    />
                ))}
        </Stack>
    );
};

export default DataFrame;
