import React from "react";
import {Card} from "react-bootstrap";

export interface LargeFilterCardProps {
    title: string;
    children: React.ReactNode;
    onChange?: (value: any) => void;
    style?: React.CSSProperties;
}

const LargeFilterCard: React.FC<LargeFilterCardProps> = ({title, children, style}) => {
    return (
        <Card
            className="mb-3 p-2 shadow-sm"
            style={{minWidth: 0, maxWidth: 340, width: "100%", ...style}}
        >
            <Card.Body>
                <Card.Title className="mb-3">{title}</Card.Title>
                {children}
            </Card.Body>
        </Card>
    );
};

export default LargeFilterCard;
