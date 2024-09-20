import React, {useRef, useState} from "react";
import {InputGroup, Form} from "react-bootstrap";
import {SearchFilterProps} from "src/interfaces/types";
import {COLOURS, getPrefixAndSuffix, getText} from "./Tags";

import "../assets/scss/styles.css";
import {SearchTags} from "./SearchTags";

export const SearchFilters = ({data, searchText, setSearchText}: SearchFilterProps) => {
    const [selectedHeader, setSelectedHeader] = useState<string>("Category");
    const [bg, setBG] = useState<string>("#ffffff");

    const searchRef = useRef<HTMLInputElement>(null);

    const getDropdownOptions = (k: string, v: string, returnK: boolean, i: number) => {
        const [hText, vText] = getPrefixAndSuffix(k, v, true);
        if (hText == "") {
            return <></>;
        } else if (returnK) {
            return (
                <option key={k + "|" + i.toString()} value={k}>
                    {hText.charAt(0).toUpperCase() + hText.slice(1, -2)}
                </option>
            );
        } else {
            return (
                <option key={v + "|" + i.toString()} value={v.toString()}>
                    {v.toString()}
                </option>
            );
        }
    };

    const setCategory = (str: string) => {
        const split = str.split("|");
        const idx = parseInt(split[1]) + 4;
        const newBGColour = COLOURS[idx];

        setSelectedHeader(split[0]);
        setBG(newBGColour);
    };

    const setValue = (str: string) => {
        appendToSearch(str, selectedHeader);
    };

    const checkKeyPress = (e: any) => {
        if (e.keyCode == 13) {
            const search = searchRef.current;
            if (search == null) {
                return;
            }
            appendToSearch(search.value, "search");
            search.value = "";
        }
    };

    const appendToSearch = (newEntry: string, newTag: string) => {
        setSearchText([...searchText, {tag: newTag, value: newEntry}]);
    };

    return (
        <div style={{marginBottom: "3%", display: "flex", flexDirection: "column"}}>
            <div className="search-filters">
                <InputGroup>
                    <InputGroup.Text>Search:</InputGroup.Text>
                    <Form.Control
                        ref={searchRef}
                        onKeyDown={(e) => checkKeyPress(e)}
                    ></Form.Control>
                </InputGroup>
                <InputGroup>
                    <Form.Select
                        style={{maxWidth: "9em", marginLeft: "4%"}}
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                    >
                        <option>Category</option>
                        {Object.entries(data["unique_props"]).map(([k, v], i) =>
                            getDropdownOptions(k, "", true, i)
                        )}
                    </Form.Select>
                    <Form.Select
                        style={{maxWidth: "9em", outline: `2px solid ${bg}`}}
                        onChange={(e) => setValue(e.target.value)}
                    >
                        <option>Value</option>
                        {selectedHeader != "Category" &&
                            data["unique_props"][selectedHeader].map((v: string, i: number) =>
                                getDropdownOptions(selectedHeader, v, false, i)
                            )}
                    </Form.Select>
                </InputGroup>
            </div>
            <SearchTags data={data} searchText={searchText} setSearchText={setSearchText} />
        </div>
    );
};

//{searchText.map(() => {})}
