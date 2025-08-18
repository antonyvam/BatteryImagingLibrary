import React from "react";
import {Card} from "react-bootstrap";

interface ExampleCardProps {
    title: string;
    text: string;
}

const ExampleCard: React.FC<ExampleCardProps> = ({title, text}) => {
    return (
        <Card className="mb-3 shadow" style={{minHeight: 120}}>
            <Card.Body>
                <Card.Title className="h4">{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ExampleCard;
