import React, {useRef, useState} from "react";
import {CloseButton} from "react-bootstrap";
import {COLOURS, getText} from "./Tags";

import {SearchFilterProps, SearchTerm} from "src/interfaces/types";

export const SearchTags = ({data, searchText, setSearchText}: SearchFilterProps) => {
    const removeFromSearch = (index: number) => {
        setSearchText(searchText.filter((_, i) => i != index));
    };

    const getSearchTag = (term: SearchTerm, index: number) => {
        let tagIdx = Object.keys(data["unique_props"]).indexOf(term.tag);
        if (tagIdx == -1) {
            tagIdx = COLOURS.length - 1;
        } else {
            tagIdx += 1;
        }
        if (term.value == "") {
            return <></>;
        }

        return (
            <span
                key={index}
                className="badge"
                style={{backgroundColor: COLOURS[tagIdx], fontSize: "0.8em"}}
            >
                {getText(term.tag, term.value, true)}
                <CloseButton variant="white" onClick={(_) => removeFromSearch(index)} />
            </span>
        );
    };

    return <div className="search-texts">{searchText.map((term, i) => getSearchTag(term, i))}</div>;
};
