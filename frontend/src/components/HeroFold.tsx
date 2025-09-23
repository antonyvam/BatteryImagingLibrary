import {useState, useRef, useEffect, useContext, FC} from "react";
import {useNavigate, Navigate} from "react-router-dom";
import Fold from "./Fold";
import {LargeFilterCard, DoubleSlider, ModalityCard} from "./LargeFilterCard";
import SearchBar from "./SearchBar";
import {Container, Row, Col, Button} from "react-bootstrap";
import {HeroButtons} from "./HeroButtons";
import AppContext, {isMobile, MIN_SIZE_NM, MAX_SIZE_NM, MAX_L_PX} from "../interfaces/types";

import "../assets/scss/styles.css";

// Button configuration: label, type ('link' or 'action'), and value (url or function)
type HeroButton =
    | {label: string; type: "link"; url: string; color?: string}
    | {label: string; type: "action"; onClick: () => void; color?: string};

const HeroFold: FC<{searching: boolean}> = ({searching}) => {
    const navigate = useNavigate();
    const heroRef = useRef<HTMLDivElement>(null);

    const [heroHeight, setHeroHeight] = useState<number>(600);
    const [imgRight, setImgRight] = useState<number>(0);

    const {
        resRange: [resRange, setResRange],
        sizeRange: [sizeRange, setSizeRange],
        selectedModalities: [, setSelectedModalities],
        searchText: [, setSearchText],
        showContribute: [, setShowContribute],
        showContributors: [, setShowContributors],
        selectedScan: [selectedScan]
    } = useContext(AppContext)!;

    useEffect(() => {
        const updateDims = () => {
            if (heroRef.current) {
                setHeroHeight(heroRef.current.offsetHeight);
                // Compute offset so image is flush with right side of viewport
                const foldRect = heroRef.current.getBoundingClientRect();
                const rightOffset = Math.max(
                    0,
                    window.innerWidth - (foldRect.left + foldRect.width)
                );
                setImgRight(rightOffset);
            }
        };
        updateDims();
        window.addEventListener("resize", updateDims);
        return () => window.removeEventListener("resize", updateDims);
    }, [searching, selectedScan]);

    // Button actions/links
    const heroButtons: HeroButton[] = [
        {
            label: "About",
            type: "action",
            onClick: () => {}
        },
        {
            label: "Paper",
            type: "link",
            url: ""
        },
        {
            label: "Github",
            type: "link",
            url: "https://github.com/antonyvam/BatteryImagingLibrary"
        },
        {
            label: "Zenodo",
            type: "link",
            url: "https://zenodo.org/communities/batteryimaginglibrary/records"
        },

        {
            label: "Contributors",
            type: "action",
            onClick: () => setShowContributors(true)
        },
        {
            label: "Contribute!",
            type: "action",
            onClick: () => setShowContribute(true)
        }
    ];

    return (
        <Fold bgColour="#35383d" hero={false}>
            <div ref={heroRef} style={{position: "relative", minHeight: 180}}>
                {/* Background image absolutely positioned, flush to HeroFold edge, height matches HeroFold */}
                <img
                    src="/assets/imgs/hero_rot.png"
                    alt="hero"
                    style={{
                        position: "absolute",
                        top: 0,
                        right: -imgRight,
                        height: heroHeight,
                        zIndex: 0,
                        opacity: 0.65,
                        pointerEvents: "none"
                    }}
                />
                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        paddingTop: 16,
                        paddingBottom: 8,
                        width: "100%"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: isMobile() ? "column" : "row",
                            alignItems: "flex-end",
                            justifyContent: "space-between",
                            gap: isMobile() ? 16 : 32,
                            marginBottom: 24
                        }}
                    >
                        {/* Title and search bar stacked vertically */}
                        <div style={{flex: 1, display: "flex", flexDirection: "column", gap: 12}}>
                            <h1
                                className={isMobile() ? "text-center mb-3" : "mb-3"}
                                style={{
                                    color: "#fff"
                                }}
                            >
                                Battery Imaging Library
                            </h1>
                            <div style={{marginTop: 8}}>
                                <SearchBar variant="light" />
                            </div>
                        </div>
                        {/* HeroButtons stacked to the right (or below on mobile) */}
                        {!isMobile() && (
                            <HeroButtons heroButtons={heroButtons} isMobile={isMobile} />
                        )}
                    </div>
                    {/* Filters row remains below */}
                    <div
                        style={{
                            columnGap: 64,
                            rowGap: 4,
                            marginBottom: 16,
                            display: "flex",
                            flex: "row",
                            justifyContent: "space-evenly",
                            flexWrap: isMobile() ? "wrap" : "nowrap"
                        }}
                    >
                        <LargeFilterCard title="Pixel Size">
                            <div>
                                <DoubleSlider
                                    value={resRange}
                                    setValue={setResRange}
                                    addDropdown={true}
                                    logarithmic={true}
                                    min={Math.log10(MIN_SIZE_NM)}
                                    max={Math.log10(MAX_SIZE_NM)}
                                    showTicks={true}
                                    defaultUnit="MICRON"
                                />
                            </div>
                        </LargeFilterCard>
                        <LargeFilterCard title="Longest side (px)">
                            <div>
                                <DoubleSlider
                                    value={sizeRange}
                                    setValue={setSizeRange}
                                    addDropdown={false}
                                    logarithmic={true}
                                    min={1}
                                    max={Math.log10(MAX_L_PX)}
                                    integer={true}
                                />
                            </div>
                        </LargeFilterCard>
                        <ModalityCard />
                    </div>
                </div>
            </div>
        </Fold>
    );
};

export default HeroFold;
