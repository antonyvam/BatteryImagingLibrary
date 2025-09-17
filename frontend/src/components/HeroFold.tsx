import {useState, useRef, useEffect, useContext, FC} from "react";
import {useNavigate, Navigate} from "react-router-dom";
import Fold from "./Fold";
import {LargeFilterCard, DoubleSlider, ModalityCard} from "./LargeFilterCard";
import SearchBar from "./SearchBar";
import {Container, Row, Col, Button} from "react-bootstrap";
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
        selectedModalities: [selectedModalities, setSelectedModalities],
        searchText: [searchText, setSearchText],
        showContribute: [showContribute, setShowContribute],
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
            url: "https://zenodo.org/communities/batteryimaginglibrary/records",
            color: "#0047a8"
        },
        {
            label: "Browse all",
            type: "action",
            onClick: () => {
                navigate("/search");
                // setSearching(true);
                setSelectedModalities([]);
                setSearchText("");
                setResRange({lower: 0, upper: MAX_SIZE_NM});
                setSizeRange({lower: 0, upper: MAX_L_PX});
            }
        },
        {
            label: "Contributors",
            type: "action",
            onClick: () => setShowContribute(true)
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
                <Container
                    style={{position: "relative", zIndex: 1, paddingTop: 4, paddingBottom: 4}}
                >
                    <h1 style={{color: "#fff"}}>Battery Imaging Library</h1>

                    {searching === false && (
                        <Row className="align-items-center mb-4">
                            <Col md={7}>
                                <p className="lead" style={{color: "#fff", fontSize: "1.2em"}}>
                                    8 modalities, 100s of scans and over 500 billion voxels of open
                                    battery imaging data, from single particles up to full cells.
                                    Includes raw, processed and reconstructed data. Start searching!
                                </p>
                            </Col>
                            <Col md={5}>
                                <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                                    {[0, 1].map((row) => (
                                        <div style={{display: "flex", gap: 8}} key={row}>
                                            {heroButtons.slice(row * 3, row * 3 + 3).map((btn) =>
                                                btn.type === "link" ? (
                                                    <Button
                                                        key={btn.label}
                                                        variant="light"
                                                        size="lg"
                                                        className="w-100"
                                                        as="a"
                                                        href={btn.url || undefined}
                                                        target={btn.url ? "_blank" : undefined}
                                                        rel={
                                                            btn.url
                                                                ? "noopener noreferrer"
                                                                : undefined
                                                        }
                                                        style={{
                                                            backgroundColor: btn.color,
                                                            color: btn.color ? "white" : "black"
                                                        }}
                                                    >
                                                        {btn.label}
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        key={btn.label}
                                                        variant="light"
                                                        size="lg"
                                                        className="w-100"
                                                        onClick={btn.onClick}
                                                    >
                                                        {btn.label}
                                                    </Button>
                                                )
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    )}
                    <Row className="mb-4">
                        <Col>
                            <SearchBar variant="light" />
                        </Col>
                    </Row>
                    <Row
                        className="mb-4"
                        style={{
                            columnGap: 14,
                            display: "flex",
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
                                    min={2}
                                    max={Math.log10(MAX_L_PX)}
                                    squared={true}
                                />
                            </div>
                        </LargeFilterCard>
                        <ModalityCard />
                    </Row>
                </Container>
            </div>
        </Fold>
    );
};

export default HeroFold;
