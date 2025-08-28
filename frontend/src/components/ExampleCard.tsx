import React, {useRef, useState, useEffect} from "react";
import {Card, Button} from "react-bootstrap";
import {Container, Row, Col} from "react-bootstrap";
import {ExampleCardData, isMobile, MODALITY_TO_COLOUR} from "../interfaces/types";
import {renderModality} from "../interfaces/helpers";
import VideoPlayer from "./VideoPlayer";

const exampleData: ExampleCardData[] = [
    {
        modality: "XRD_CT",
        text: "X-ray diffraction computed tomography combining spatial and crystallographic information, enabling mapping of phase distributions, strain, and lattice evolution in working batteries.",
        imgPath: "XRD_CT"
    },
    {
        modality: "LAB_MICRO_XCT",
        text: "Non-destructive 3D imaging of whole cells at the micron scale, widely used to study internal structure, defects, and design of commercial batteries.",
        imgPath: "XCT"
    },
    {
        modality: "SYNCHOTRON_NANO_XCT",
        text: "High-resolution 3D imaging of battery electrodes at the nanoscale, revealing porosity, cracks, and fine morphological features of the electode particles invisible to micro-CT.",
        imgPath: "nano_CT"
    },
    {
        modality: "NEUTRON_CT",
        text: "Complementary to X-ray CT, neutron imaging highlights low-Z materials such as electrolytes, polymers, and separators that are difficult to see with X-rays.",
        imgPath: ""
    },
    {
        modality: "SEM",
        text: "Scanning electron microscopy for nanoscale imaging of surface and cross-sectional morphology, capturing fine structural features of electrodes and particles.",
        imgPath: "SEM"
    },
    {
        modality: "EDS",
        text: "Energy-dispersive X-ray spectroscopy coupled to SEM, producing spatially resolved chemical maps or spectral cubes that reveal elemental distributions.",
        imgPath: "EDS"
    },
    {
        modality: "EBSD",
        text: "Electron backscatter diffraction for crystallographic mapping at the microscale, including raw Kikuchi patterns and indexed orientation maps for advanced analysis.",
        imgPath: "ebsd"
    }
];

interface ExampleCardProps {
    cardData: ExampleCardData;
}

const ExampleCard: React.FC<ExampleCardProps> = ({cardData}) => {
    const divRef = useRef<HTMLDivElement>(null);

    const handleSeeAll = () => {
        // Dummy function
    };

    const [hover, setHover] = useState<boolean>(false);

    useEffect(() => {
        if (hover) {
            divRef.current!.style.zIndex = "12";
            divRef.current!.style.outline = `1px solid #000000`;
        } else {
            divRef.current!.style.zIndex = "0";
            divRef.current!.style.outline = `1px solid #ffffff`;
        }
    }, [hover]);

    return (
        <Card
            className="mb-3 shadow"
            style={{minHeight: 120, maxWidth: 600}}
            onMouseEnter={(e) => setHover(true)}
            onPointerEnter={(e) => setHover(true)}
            onPointerLeave={(e) => setHover(false)}
            onMouseLeave={(e) => setHover(false)}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: isMobile() ? "column" : "row",
                    maxHeight: isMobile() ? 600 : 300
                }}
                ref={divRef}
            >
                <Card.Body>
                    <Card.Title className="h4" style={{marginBottom: 0}}>
                        {renderModality(cardData.modality)}
                    </Card.Title>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            gap: 20
                        }}
                    >
                        <Card.Text>{cardData.text}</Card.Text>
                        <Button variant="secondary" onClick={handleSeeAll}>
                            See all!
                        </Button>
                    </div>
                </Card.Body>
                <VideoPlayer fname={cardData.imgPath} active={hover} />
            </div>
        </Card>
    );
};

const ExampleCards = () => {
    return (
        <Container className="my-5">
            <h2 className="mb-4">Examples</h2>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 40,
                    justifyContent: "space-evenly"
                }}
            >
                {exampleData.map((ex, idx) => (
                    <ExampleCard cardData={ex} />
                ))}
            </div>
        </Container>
    );
};

export default ExampleCards;
