import React, {useState} from "react";
import Fold from "./Fold";

import "../assets/scss/styles.css";
import data from "../assets/data.json";

import DataFrame from "./old/DataFrame";
import DataModal from "./Modal";
import {regexSearch} from "../interfaces/helpers";
import {Contents} from "./old/Contents";
import {SearchFilters} from "./SearchFilters";
import {SearchTerm} from "src/interfaces/types";

console.log(data);

// How to do search?
// loop over all kvs in data and return yes for entry if it matches regex (i.e lowercase spaces removed)
// how

const DataFold: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalEntry, setModalEntry] = useState<object | null>(null);

    const defaultSearch: SearchTerm = {tag: "search", value: ""};
    const [searchText, setSearchText] = useState<SearchTerm[]>([defaultSearch]);

    return (
        <Fold bgColour={"white"} hero={false}>
            <div className="data-fold">
                <Contents data={data["data"]} />
                <SearchFilters data={data} searchText={searchText} setSearchText={setSearchText} />
                {Object.entries(data["data"])
                    .filter(([_, v]) => regexSearch(searchText, v))
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
