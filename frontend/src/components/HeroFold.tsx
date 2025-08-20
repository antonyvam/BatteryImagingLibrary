import React, {useRef, useEffect, useState} from "react";
import Fold from "./Fold";
import {LargeFilterCard, DoubleSlider} from "./LargeFilterCard";
import SearchBar from "./SearchBar";
import "../assets/scss/styles.css";
import {Container, Row, Col, Button} from "react-bootstrap";

const links = ["Paper", "Github", "Scripts", "Docs", "About", "Contribute"];

const HeroFold: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const [heroHeight, setHeroHeight] = useState<number>(600);
    const [imgRight, setImgRight] = useState<number>(0);

    const [resRange, setResRange] = useState<{lower: number; upper: number}>({lower: 0, upper: 0});

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
                        {/* TODO: make all these sliders small components in large filter card,
                        decrease size ofl arge filter card */}
                        <LargeFilterCard title="Resolution">
                            <div>
                                <DoubleSlider
                                    value={resRange}
                                    setValue={(v) => {
                                        setResRange(v);
                                    }}
                                />
                            </div>
                        </LargeFilterCard>
                        <LargeFilterCard title="Image Size">
                            <div>
                                <label htmlFor="imagesize-slider" className="form-label">
                                    Image Size: <span id="imagesize-value">500</span>
                                </label>
                                <input
                                    type="range"
                                    className="form-range"
                                    id="imagesize-slider"
                                    min={100}
                                    max={1000}
                                    step={10}
                                    defaultValue={500}
                                    onInput={(e) => {
                                        const val = (e.target as HTMLInputElement).value;
                                        const label = document.getElementById("imagesize-value");
                                        if (label) label.textContent = val;
                                    }}
                                />
                            </div>
                        </LargeFilterCard>
                        <LargeFilterCard title="Modality">
                            <div>
                                <label htmlFor="modality-dropdown" className="form-label">
                                    Modality
                                </label>
                                <select
                                    className="form-select"
                                    id="modality-dropdown"
                                    defaultValue="X-ray"
                                >
                                    <option value="X-ray">X-ray</option>
                                    <option value="Neutron">Neutron</option>
                                    <option value="Electron">Electron</option>
                                    <option value="Optical">Optical</option>
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
