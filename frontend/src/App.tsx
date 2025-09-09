import {FC, useContext, useEffect} from "react";
import {Routes, Route, Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import AppContext from "./interfaces/types";
import ScanModal from "./components/ScanModal";
import ContributeModal from "./components/ContributeModal";

import HeroFold from "./components/HeroFold";
import ExampleCards from "./components/ExampleCard";
import SearchCard from "./components/SearchCard";
import {Container} from "react-bootstrap";

import "./assets/scss/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import {scanMatchesSearch, smartShuffle} from "./interfaces/helpers";

const App: FC = () => {
    const {
        scanData: [scanData],
        searchText: [searchText],
        selectedModalities: [selectedModalities],
        resRange: [resRange],
        sizeRange: [sizeRange],
        selectedScan: [selectedScan, setSelectedScan],
        showContribute: [showContribute, setShowContribute]
    } = useContext(AppContext)!;

    const navigate = useNavigate();
    const location = useLocation();

    // if location.state?.background exists, it means we navigated to a modal
    const state = location.state as {background?: Location};

    const goBack = () => {
        setSelectedScan(null);
        navigate("/search");
    };

    // Determine if current route is '/search'
    const isSearching = location.pathname.startsWith("/search");

    return (
        <div className="app">
            <HeroFold searching={isSearching} />
            <Routes location={state?.background || location}>
                <Route path="/" element={<ExampleCards />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route
                    path="/search"
                    element={
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
                                {smartShuffle(
                                    scanData.filter((s) =>
                                        scanMatchesSearch(
                                            s,
                                            searchText,
                                            resRange,
                                            sizeRange,
                                            selectedModalities
                                        )
                                    ),
                                    ["scanModality", "sampleID"],
                                    {
                                        scanModality: (s) => s.scanModality,
                                        sampleID: (s) => s.sampleID
                                    }
                                ).map((v, i) => (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            {
                                                setSelectedScan(v);
                                                navigate(`/search/${v.scanID}`);
                                            }
                                        }}
                                        style={{cursor: "pointer"}}
                                    >
                                        <SearchCard scan={v} />
                                    </div>
                                ))}
                            </div>
                        </Container>
                    }
                />
                <Route path="/search/:id" element={<ScanModal show={true} onClose={goBack} />} />
            </Routes>

            <Outlet />
            {state?.background && (
                <Routes>
                    <Route
                        path="/search/:id"
                        element={<ScanModal show={true} onClose={goBack} />}
                    />
                </Routes>
            )}
            {/* Contribute Modal */}
            {showContribute && (
                <ContributeModal show={showContribute} onClose={() => setShowContribute(false)} />
            )}
        </div>
    );
};

export default App;
