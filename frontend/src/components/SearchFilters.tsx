import React, {useState} from "react";
import {InputGroup, Form} from "react-bootstrap";
import {SearchFilterProps} from "src/interfaces/types";
import {COLOURS, getPrefixAndSuffix} from "./Tags";

import {FormControl} from "react-bootstrap";

import "../assets/scss/styles.css";

// when category changes, change the value dropdown to be that colour
// add in added tags in div at bottom
// render serach + categories div as row flex if computer, column if mobile
// added filter tags are just badges with x button which deletes search text at index i
export const SearchFilters = ({data, setSearchText}: SearchFilterProps) => {
    const [selectedHeader, setSelectedHeader] = useState<string>("Category");
    const [bg, setBG] = useState<string>("#ffffff");

    const getDropdownOptions = (k: string, v: string, returnK: boolean, i: number) => {
        const [hText, vText] = getPrefixAndSuffix(k, v, true);
        if (hText == "") {
            return <></>;
        } else if (returnK) {
            return (
                <option key={k} value={k + "|" + i.toString()}>
                    {hText.charAt(0).toUpperCase() + hText.slice(1, -2)}
                </option>
            );
        } else {
            return (
                <option key={v} value={v + "|" + i.toString()}>
                    {v.toString()}
                </option>
            );
        }
    };

    const setCategory = (str: string) => {
        const split = str.split("|");
        const idx = parseInt(split[1]) + 4;
        const newBGColour = COLOURS[idx];
        console.log(newBGColour, idx, split);

        setSelectedHeader(split[0]);
        setBG(newBGColour);
    };

    return (
        <div style={{marginBottom: "3%", display: "flex", flexDirection: "column"}}>
            <div className="search-filters">
                <InputGroup>
                    <InputGroup.Text>Search:</InputGroup.Text>
                    <Form.Control onChange={(e) => setSearchText(e.target.value)}></Form.Control>
                </InputGroup>
                <InputGroup>
                    <Form.Select
                        style={{maxWidth: "9em"}}
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                    >
                        <option>Category</option>
                        {Object.entries(data["unique_props"]).map(([k, v], i) =>
                            getDropdownOptions(k, "", true, i)
                        )}
                    </Form.Select>
                    <Form.Select style={{maxWidth: "9em", outline: `2px solid ${bg}`}}>
                        <option>Value</option>
                        {selectedHeader != "Category" &&
                            data["unique_props"][selectedHeader].map((v: string, i: number) =>
                                getDropdownOptions(selectedHeader, v, false, i)
                            )}
                    </Form.Select>
                </InputGroup>
            </div>
            <div className="searchTexts"></div>
        </div>
    );
};
