import {useState, useRef, useEffect, useContext, FC} from "react";
import Fold from "./Fold";
import {LargeFilterCard, DoubleSlider, ModalityCard} from "./LargeFilterCard";
import SearchBar from "./SearchBar";
import {Container, Row, Col, Button} from "react-bootstrap";
import AppContext, {isMobile, MAX_SIZE_NM, MAX_AREA_NM} from "../interfaces/types";

import "../assets/scss/styles.css";

// TODO: remove docs & github
const links = ["Paper", "Github", "Browse all", "Contribute!"];

const HeroFold: FC<{searching: boolean}> = ({searching}) => {
    const heroRef = useRef<HTMLDivElement>(null);

    const [heroHeight, setHeroHeight] = useState<number>(600);
    const [imgRight, setImgRight] = useState<number>(0);

    const {
        resRange: [resRange, setResRange],
        sizeRange: [sizeRange, setSizeRange],
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
                    style={{position: "relative", zIndex: 1, paddingTop: 48, paddingBottom: 48}}
                >
                    <h1 className="display-4 mb-3" style={{color: "#fff"}}>
                        Battery Imaging Library
                    </h1>

                    {searching === false && (
                        <Row className="align-items-center mb-4">
                            <Col md={7}>
                                <p className="lead" style={{color: "#fff"}}>
                                    M modalities, S scans and V voxels of open battery imaging data,
                                    from single particles up to full cells. Includes raw and
                                    processed (reconstructed, denoised, segmented, <i>etc.</i>)
                                    data. Start searching!
                                </p>
                            </Col>
                            <Col md={5}>
                                <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                                    {[0, 1].map((row) => (
                                        <div style={{display: "flex", gap: 8}} key={row}>
                                            {links.slice(row * 2, row * 2 + 2).map((label, idx) => (
                                                <Button
                                                    key={label}
                                                    variant="light"
                                                    size="lg"
                                                    className="w-100"
                                                >
                                                    {label}
                                                </Button>
                                            ))}
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
                            gap: 14,
                            display: "flex",
                            justifyContent: "space-evenly",
                            flexWrap: isMobile() ? "wrap" : "nowrap"
                        }}
                    >
                        <LargeFilterCard title="Resolution">
                            <div>
                                <DoubleSlider
                                    value={resRange}
                                    setValue={setResRange}
                                    addDropdown={true}
                                    logarithmic={true}
                                    max={Math.log10(MAX_SIZE_NM)}
                                />
                            </div>
                        </LargeFilterCard>
                        <LargeFilterCard title="Area (cross-section)">
                            <div>
                                <DoubleSlider
                                    value={sizeRange}
                                    setValue={setSizeRange}
                                    addDropdown={true}
                                    logarithmic={true}
                                    max={Math.log10(MAX_AREA_NM)}
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
