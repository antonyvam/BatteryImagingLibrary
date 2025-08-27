import React, {useRef, useState, useEffect} from "react";
import {Card, Button} from "react-bootstrap";
import {Container, Row, Col} from "react-bootstrap";
import {ExampleCardData, isMobile} from "../interfaces/types";
import {renderModality} from "../interfaces/helpers";
import VideoPlayer from "./VideoPlayer";

const DUMMY_TEXT =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet.";

const exampleData: ExampleCardData[] = [
    {
        modality: "XRD_CT",
        text: DUMMY_TEXT,
        imgPath: "XRD_CT"
    },
    {
        modality: "LAB_MICRO_XCT",
        text: DUMMY_TEXT,
        imgPath: "XCT"
    },
    {
        modality: "NEUTRON_CT",
        text: DUMMY_TEXT,
        imgPath: ""
    },
    {
        modality: "SEM",
        text: DUMMY_TEXT,
        imgPath: ""
    },
    {
        modality: "EDS",
        text: DUMMY_TEXT,
        imgPath: "EDS"
    },
    {
        modality: "EBSD",
        text: DUMMY_TEXT,
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
            style={{minHeight: 120}}
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
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row",
                                gap: 20
                            }}
                        >
                            {renderModality(cardData.modality)}
                            <Button
                                variant="secondary"
                                size="sm"
                                style={{marginLeft: 0}}
                                onClick={handleSeeAll}
                            >
                                See all {">"}
                            </Button>
                        </div>
                    </Card.Title>

                    <Card.Text>{cardData.text}</Card.Text>
                </Card.Body>
                <VideoPlayer fname={cardData.imgPath} active={hover} />
                {/* <img
                    src={cardData.imgPath}
                    style={{
                        objectFit: "scale-down",
                        objectPosition: "top center",
                        maxHeight: 200
                        // height: "100%"
                        // height: "fill-parent"
                    }}
                /> */}
            </div>
        </Card>
    );
};

const ExampleCards = () => {
    return (
        <Container className="my-5">
            <h2 className="mb-4">Examples</h2>
            <Row>
                {exampleData.map((ex, idx) => (
                    <Col md={12} className="mb-3" key={idx}>
                        <ExampleCard cardData={ex} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ExampleCards;
