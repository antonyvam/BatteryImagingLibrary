import React from "react";
import {Card, Button} from "react-bootstrap";
import {Container, Row, Col} from "react-bootstrap";
import {ExampleCardData} from "../interfaces/types";
import {renderModality} from "../interfaces/helpers";

const DUMMY_TEXT =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet.";

const exampleData: ExampleCardData[] = [
    {
        modality: "XRD_CT",
        text: DUMMY_TEXT,
        img_path: ""
    },
    {
        modality: "LAB_MICRO_XCT",
        text: DUMMY_TEXT,
        img_path: ""
    },
    {
        modality: "NEUTRON_CT",
        text: DUMMY_TEXT,
        img_path: ""
    },
    {
        modality: "SEM",
        text: DUMMY_TEXT,
        img_path: ""
    },
    {
        modality: "EDS",
        text: DUMMY_TEXT,
        img_path: ""
    },
    {
        modality: "EBSD",
        text: DUMMY_TEXT,
        img_path: ""
    }
];

interface ExampleCardProps {
    cardData: ExampleCardData;
}

const ExampleCard: React.FC<ExampleCardProps> = ({cardData}) => {
    const handleSeeAll = () => {
        // Dummy function
    };
    return (
        <Card className="mb-3 shadow" style={{minHeight: 120}}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    maxHeight: 300
                }}
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
                <img
                    src="/assets/imgs/modal/10/10_1H.png"
                    style={{
                        objectFit: "scale-down",
                        objectPosition: "top center",
                        maxHeight: 300
                        // height: "100%"
                        // height: "fill-parent"
                    }}
                />
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
