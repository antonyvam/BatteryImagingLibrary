import React from "react";
import ReactSlider from "react-slider";
import {Form, Card} from "react-bootstrap";
import "../assets/scss/styles.css";

export interface DoubleSliderProps {
    value: {lower: number; upper: number};
    setValue: (val: {lower: number; upper: number}) => void;
    min?: number;
    max?: number;
    step?: number;
    units?: string[];
    selectedUnit?: string;
    onUnitChange?: (unit: string) => void;
}

// TODO: render res in scientific notation if larger than certain amount
const defaultUnits = ["nm", "μm", "mm"];

export const DoubleSlider: React.FC<DoubleSliderProps> = ({
    value,
    setValue,
    min = 0,
    max = 100,
    step = 1,
    units = defaultUnits,
    selectedUnit = defaultUnits[0],
    onUnitChange
}) => {
    return (
        <div style={{display: "flex", flexDirection: "row", gap: 5}}>
            <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                value={[value.lower, value.upper]}
                min={min}
                max={max}
                step={step}
                minDistance={10}
                pearling
                onChange={([lower, upper]) => setValue({lower, upper})}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                renderTrack={(props, state) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            background: state.index === 1 ? "#0d6efd" : "#e9ecef",
                            height: 6,
                            borderRadius: 3
                        }}
                    />
                )}
            />
            <Form.Select
                style={{maxWidth: 80}}
                value={selectedUnit}
                onChange={(e) => onUnitChange && onUnitChange(e.target.value)}
            >
                {units.map((u) => (
                    <option value={u} key={u}>
                        {u}
                    </option>
                ))}
            </Form.Select>
        </div>
    );
};

export interface LargeFilterCardProps {
    title: string;
    children: React.ReactNode;
    onChange?: (value: any) => void;
    style?: React.CSSProperties;
}

export const LargeFilterCard: React.FC<LargeFilterCardProps> = ({title, children, style}) => {
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
