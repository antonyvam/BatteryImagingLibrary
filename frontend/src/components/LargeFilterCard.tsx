import {useState, FC} from "react";
import ReactSlider from "react-slider";
import {Form, Card} from "react-bootstrap";
import {UNITS, Units} from "../interfaces/types";
import {renderUnit} from "../interfaces/helpers";
import "../assets/scss/styles.css";

// Numeric input with units dropdown component
interface NumericInputWithUnitsProps {
    value: number;
    setValue: (val: number) => void;
    units?: string[];
    selectedUnit?: string;
    onUnitChange?: (unit: string) => void;
    placeholder?: string;
}

export const NumericInputWithUnits: FC<NumericInputWithUnitsProps> = ({
    value,
    setValue,
    units = UNITS
}) => {
    const [unit, setUnit] = useState<Units>("NANO");
    const onUnitChange = (newUnit: string) => {
        const isUnit = (val: string): val is Units => {
            return UNITS.includes(val as Units);
        };

        if (isUnit(newUnit)) {
            setUnit(unit);
        }
    };

    // Only allow floats and scientific notation
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (/^[-+]?\d*\.?\d*(e[-+]?\d*)?$/i.test(val) || val === "") {
            setValue(parseFloat(val));
        }
    };
    return (
        <Form.Group style={{width: "100%"}}>
            <div style={{display: "flex", flexDirection: "row", gap: 5}}>
                <Form.Control
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder={"1"}
                    inputMode="decimal"
                    autoComplete="off"
                />
                <Form.Select
                    style={{maxWidth: 80}}
                    value={unit}
                    onChange={(e) => onUnitChange(e.target.value)}
                >
                    {units.map((u) => (
                        <option value={u} key={u}>
                            {renderUnit(u)}
                        </option>
                    ))}
                </Form.Select>
            </div>
        </Form.Group>
    );
};

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

export const DoubleSlider: FC<DoubleSliderProps> = ({
    value,
    setValue,
    min = 0,
    max = 100,
    step = 1,
    units = UNITS,
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
            <NumericInputWithUnits
                value={value.upper}
                setValue={(v) => {
                    value.lower, v;
                }}
            />
        </div>
    );
};

export interface LargeFilterCardProps {
    title: string;
    children: React.ReactNode;
    onChange?: (value: any) => void;
    style?: React.CSSProperties;
}

export const LargeFilterCard: FC<LargeFilterCardProps> = ({title, children, style}) => {
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
