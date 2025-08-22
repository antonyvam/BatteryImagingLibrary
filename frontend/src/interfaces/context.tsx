import React, {useState} from "react";
import AppContext from "./types";
import type {Range, Modality} from "./types";

const AppContextProvider = (props: {
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) => {
    const [resRange, setResRange] = useState<Range>({lower: 0, upper: 40});
    const [sizeRange, setSizeRange] = useState<Range>({lower: 0, upper: 40});
    const [selectedModalities, setSelectedModalities] = useState<Modality[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [searching, setSearching] = useState<boolean>(false);
    return (
        <AppContext.Provider
            value={{
                resRange: [resRange, setResRange],
                sizeRange: [sizeRange, setSizeRange],
                selectedModalities: [selectedModalities, setSelectedModalities],
                searchText: [searchText, setSearchText],
                searching: [searching, setSearching]
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
