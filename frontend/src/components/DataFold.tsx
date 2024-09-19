import React, {useState} from "react";
import Fold from "./Fold";

import "../assets/scss/styles.css";
import data from "../assets/data.json";

import DataFrame from "./DataFrame";
import DataModal from "./Modal";
import {regexSearch} from "../interfaces/helpers";
import {InputGroup, Form} from "react-bootstrap";
import {Contents} from "./Contents";

console.log(data);

// How to do search?
// loop over all kvs in data and return yes for entry if it matches regex (i.e lowercase spaces removed)
// how

const DataFold: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalEntry, setModalEntry] = useState<object | null>(null);

    const [searchText, setSearchText] = useState<string>("");

    // TOOD: search bar at the top
    // TODO: this should have max width in px and be like 80% otherwise or something
    console.log(regexSearch("", data["data"]));

    return (
        <Fold bgColour={"white"} hero={false}>
            <div className="data-fold">
                <Contents data={data["data"]}></Contents>
                <div style={{marginBottom: "3%"}}>
                    <InputGroup>
                        <InputGroup.Text>Search:</InputGroup.Text>
                        <Form.Control
                            onChange={(e) => setSearchText(e.target.value)}
                        ></Form.Control>
                    </InputGroup>
                </div>
                {Object.entries(data["data"])
                    .filter(([k, v]) => regexSearch(searchText, v))
                    .map(([k, v]) => (
                        <DataFrame
                            key={k}
                            title={k}
                            data={v}
                            showModal={showModal}
                            setShowModal={setShowModal}
                            modalEntry={modalEntry}
                            setModalEntry={setModalEntry}
                            searchText={searchText}
                        />
                    ))}
                <DataModal show={showModal} setShow={setShowModal} entry={modalEntry} />
            </div>
        </Fold>
    );
};

export default DataFold;
