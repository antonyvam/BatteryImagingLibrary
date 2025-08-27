import React, {useContext} from "react";
import AppContext from "./interfaces/types";
import ScanModal from "./components/ScanModal";

import HeroFold from "./components/HeroFold";
import ExampleCards from "./components/ExampleCard";
import SearchCard from "./components/SearchCard";
import {Container} from "react-bootstrap";

import "./assets/scss/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import {scanMatchesSearch} from "./interfaces/helpers";

const App: React.FC = () => {
    const {
        searching: [searching],
        scanData: [scanData],
        searchText: [searchText],
        selectedModalities: [selectedModalities],
        resRange: [resRange],
        sizeRange: [sizeRange],
        selectedScan: [selectedScan, setSelectedScan]
    } = useContext(AppContext)!;

    return (
        <div className="app">
            <HeroFold searching={searching} />
            {!searching && <ExampleCards />}
            {searching && (
                <Container className="my-5">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-evenly",
                            gap: 18
                        }}
                    >
                        {scanData
                            .filter((s) =>
                                scanMatchesSearch(
                                    s,
                                    searchText,
                                    resRange,
                                    sizeRange,
                                    selectedModalities
                                )
                            )
                            .map((v, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedScan(v)}
                                    style={{cursor: "pointer"}}
                                >
                                    <SearchCard scan={v} />
                                </div>
                            ))}
                    </div>
                </Container>
            )}
            {/* Scan Modal */}
            {selectedScan && (
                <ScanModal
                    show={selectedScan !== null}
                    scan={selectedScan}
                    onClose={() => setSelectedScan(null)}
                />
            )}
        </div>
    );
};

export default App;
