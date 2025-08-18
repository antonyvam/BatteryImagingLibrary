import React from "react";
import Fold from "./Fold";
import LargeFilterCard from "./LargeFilterCard";
import SearchBar from "./SearchBar";
import "../assets/scss/styles.css";
import {Container, Row, Col, Button, Card} from "react-bootstrap";

const HeroFold: React.FC = () => {
    return (
        <Fold bgColour="#e9ecef" hero={true}>
            <div style={{position: "relative", minHeight: 600}}>
                {/* Background image absolutely positioned */}
                <img
                    src="/assets/imgs/hero_rot.png"
                    alt="hero"
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        height: "100%",
                        zIndex: 0,
                        opacity: 0.15,
                        pointerEvents: "none"
                    }}
                />
                <Container
                    style={{position: "relative", zIndex: 1, paddingTop: 48, paddingBottom: 48}}
                >
                    <h1 className="display-4 mb-3">Battery Imaging Library</h1>
                    <Row className="align-items-center mb-4">
                        <Col md={7}>
                            <p className="lead">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Pellentesque euismod, nisi eu consectetur.
                            </p>
                        </Col>
                        <Col md={5}>
                            <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                                <div style={{display: "flex", gap: 8}}>
                                    <Button variant="primary" size="lg" className="w-100">
                                        Button 1
                                    </Button>
                                    <Button variant="secondary" size="lg" className="w-100">
                                        Button 2
                                    </Button>
                                    <Button variant="success" size="lg" className="w-100">
                                        Button 3
                                    </Button>
                                </div>
                                <div style={{display: "flex", gap: 8}}>
                                    <Button variant="warning" size="lg" className="w-100">
                                        Button 4
                                    </Button>
                                    <Button variant="info" size="lg" className="w-100">
                                        Button 5
                                    </Button>
                                    <Button variant="dark" size="lg" className="w-100">
                                        Button 6
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <SearchBar />
                        </Col>
                    </Row>
                    <Row className="mb-4" style={{gap: 16}}>
                        <Col md={4}>
                            <LargeFilterCard title="Resolution">
                                <div>
                                    <label htmlFor="resolution-slider" className="form-label">
                                        Resolution: <span id="resolution-value">50</span>
                                    </label>
                                    <input
                                        type="range"
                                        className="form-range"
                                        id="resolution-slider"
                                        min={10}
                                        max={100}
                                        step={1}
                                        defaultValue={50}
                                        onInput={(e) => {
                                            const val = (e.target as HTMLInputElement).value;
                                            const label =
                                                document.getElementById("resolution-value");
                                            if (label) label.textContent = val;
                                        }}
                                    />
                                </div>
                            </LargeFilterCard>
                        </Col>
                        <Col md={4}>
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
                                            const label =
                                                document.getElementById("imagesize-value");
                                            if (label) label.textContent = val;
                                        }}
                                    />
                                </div>
                            </LargeFilterCard>
                        </Col>
                        <Col md={4}>
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
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fold>
    );
};

export default HeroFold;
