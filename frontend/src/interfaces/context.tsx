import React, {useState} from "react";
import AppContext, {MAX_SIZE_NM, MAX_AREA_NM, ScanDetails} from "./types";
import type {Range, Modality} from "./types";
import {loadAndParseScanDetails} from "./helpers";

const AppContextProvider = (props: {
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) => {
    const [resRange, setResRange] = useState<Range>({lower: 0, upper: MAX_SIZE_NM});
    const [sizeRange, setSizeRange] = useState<Range>({lower: 0, upper: MAX_AREA_NM});
    const [selectedModalities, setSelectedModalities] = useState<Modality[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [scanData, setScanData] = useState<ScanDetails[]>(loadAndParseScanDetails());
    const [selectedScan, setSelectedScan] = useState<ScanDetails | null>(null);
    const [showContribute, setShowContribute] = useState<boolean>(false);
    return (
        <AppContext.Provider
            value={{
                resRange: [resRange, setResRange],
                sizeRange: [sizeRange, setSizeRange],
                selectedModalities: [selectedModalities, setSelectedModalities],
                searchText: [searchText, setSearchText],
                scanData: [scanData, setScanData],
                selectedScan: [selectedScan, setSelectedScan],
                showContribute: [showContribute, setShowContribute]
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
