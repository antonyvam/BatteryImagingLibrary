import React, {useRef, useEffect, useContext} from "react";
import Fold from "./Fold";
import {LargeFilterCard, DoubleSlider} from "./LargeFilterCard";
import SearchBar from "./SearchBar";
import "../assets/scss/styles.css";
import {Container, Row, Col, Button} from "react-bootstrap";
import {MODALITIES} from "../interfaces/types";
import {renderModality} from "../interfaces/helpers";
import AppContext from "../interfaces/types";

const links = ["Paper", "Github", "Scripts", "Docs", "About", "Contribute"];

const HeroFold: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);

    const [heroHeight, setHeroHeight] = React.useState<number>(600);
    const [imgRight, setImgRight] = React.useState<number>(0);

    const {
        resRange: [resRange, setResRange],
        sizeRange: [sizeRange, setSizeRange]
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
    }, []);

    return (
        <Fold bgColour="#35383d" hero={false}>
            <div ref={heroRef} style={{position: "relative", minHeight: 600}}>
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
                    <Row className="align-items-center mb-4">
                        <Col md={7}>
                            <p className="lead" style={{color: "#fff"}}>
                                M modalities, S scans and V voxels of open battery imaging data,
                                from single particles up to full cells. Includes raw and processed
                                (reconstructed, denoised, segmented, <i>etc.</i>) data. Start
                                searching!
                            </p>
                        </Col>
                        <Col md={5}>
                            <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                                {[0, 1].map((row) => (
                                    <div style={{display: "flex", gap: 8}} key={row}>
                                        {links.slice(row * 3, row * 3 + 3).map((label, idx) => (
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
                    <Row className="mb-4">
                        <Col>
                            <SearchBar variant="light" />
                        </Col>
                    </Row>
                    <Row
                        className="mb-4"
                        style={{gap: 16, display: "flex", justifyContent: "space-evenly"}}
                    >
                        <LargeFilterCard title="Resolution">
                            <div>
                                <DoubleSlider
                                    value={resRange}
                                    setValue={setResRange}
                                    addDropdown={true}
                                    logarithmic={true}
                                />
                            </div>
                        </LargeFilterCard>
                        <LargeFilterCard title="Image Size">
                            <div>
                                <DoubleSlider value={sizeRange} setValue={setSizeRange} />
                            </div>
                        </LargeFilterCard>
                        <LargeFilterCard title="Modality">
                            <div>
                                <select
                                    className="form-select"
                                    id="modality-dropdown"
                                    defaultValue="X-ray"
                                >
                                    {MODALITIES.map((v) => {
                                        return (
                                            <option value={v} key={v}>
                                                {renderModality(v)}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </LargeFilterCard>
                    </Row>
                </Container>
            </div>
        </Fold>
    );
};

export default HeroFold;
