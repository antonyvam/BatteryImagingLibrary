import React, {useState} from "react";
import AppContext, {MAX_SIZE_NM, MAX_L_PX, ScanDetails} from "./types";
import type {Range, Modality} from "./types";
import {loadAndParseScanDetails} from "./helpers";

const AppContextProvider = (props: {
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) => {
    const [resRange, setResRange] = useState<Range>({lower: 0, upper: MAX_SIZE_NM});
    const [sizeRange, setSizeRange] = useState<Range>({lower: 0, upper: MAX_L_PX});
    const [selectedModalities, setSelectedModalities] = useState<Modality[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [scanData, setScanData] = useState<ScanDetails[]>(loadAndParseScanDetails());
    const [selectedScan, setSelectedScan] = useState<ScanDetails | null>(null);
    const [showContribute, setShowContribute] = useState<boolean>(false);
    const [showContributors, setShowContributors] = useState<boolean>(false);
    const [showAbout, setShowAbout] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    return (
        <AppContext.Provider
            value={{
                resRange: [resRange, setResRange],
                sizeRange: [sizeRange, setSizeRange],
                selectedModalities: [selectedModalities, setSelectedModalities],
                searchText: [searchText, setSearchText],
                scanData: [scanData, setScanData],
                selectedScan: [selectedScan, setSelectedScan],
                showContribute: [showContribute, setShowContribute],
                showContributors: [showContributors, setShowContributors],
                showAbout: [showAbout, setShowAbout],
                isSearching: [isSearching, setIsSearching]
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
