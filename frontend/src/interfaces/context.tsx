import React, {useState} from "react";
import AppContext, {ScanDetails} from "./types";
import type {Range, Modality} from "./types";
import {loadAndParseScanDetails} from "./helpers";

const AppContextProvider = (props: {
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) => {
    const [resRange, setResRange] = useState<Range>({lower: 0, upper: 40});
    const [sizeRange, setSizeRange] = useState<Range>({lower: 0, upper: 40});
    const [selectedModalities, setSelectedModalities] = useState<Modality[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [searching, setSearching] = useState<boolean>(true);
    const [scanData, setScanData] = useState<ScanDetails[]>(loadAndParseScanDetails());
    return (
        <AppContext.Provider
            value={{
                resRange: [resRange, setResRange],
                sizeRange: [sizeRange, setSizeRange],
                selectedModalities: [selectedModalities, setSelectedModalities],
                searchText: [searchText, setSearchText],
                searching: [searching, setSearching],
                scanData: [scanData, setScanData]
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
