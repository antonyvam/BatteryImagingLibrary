import React, {useContext} from "react";
import AppContext from "./interfaces/types";
import ScanModal from "./components/ScanModal";

import HeroFold from "./components/HeroFold";
import ExampleCard from "./components/ExampleCard";
import SearchCard from "./components/SearchCard";
import {Container, Row, Col} from "react-bootstrap";

import "./assets/scss/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import {scanMatchesSearch} from "./interfaces/helpers";

const exampleData = [
    {
        title: "Lithium-ion Tomography",
        text: "High-res 3D scan of a commercial Li-ion cell. Includes segmentation and metadata."
    },
    {
        title: "Solid-State Battery",
        text: "Dataset from a solid-state battery, imaged at 50nm resolution."
    },
    {title: "Degradation Study", text: "Time-lapse imaging of battery cycling and degradation."},
    {
        title: "Electrolyte Mapping",
        text: "Spatial mapping of electrolyte distribution in a pouch cell."
    }
];

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
            {!searching && (
                <Container className="my-5">
                    <h2 className="mb-4">Examples</h2>
                    <Row>
                        {exampleData.map((ex, idx) => (
                            <Col md={12} className="mb-3" key={idx}>
                                <ExampleCard title={ex.title} text={ex.text} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}
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
