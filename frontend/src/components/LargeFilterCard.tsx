import {useState, FC, useEffect} from "react";
import ReactSlider from "react-slider";
import {Form, Card, InputGroup} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {UNIT_TO_SCALE, UNITS, Units} from "../interfaces/types";
import {parseStrAsNumber, renderResolutionText, renderUnit} from "../interfaces/helpers";
import "../assets/scss/styles.css";

// Numeric input with units dropdown component
interface NumericInputOptionalDropdown {
    value: number;
    setValue: (val: number) => void;
    addDropdown?: boolean;
    units?: string[];
}

export const NumericInputOptionalDropdown: FC<NumericInputOptionalDropdown> = ({
    value,
    setValue,
    addDropdown = false,
    units = UNITS
}) => {
    // TODO: fix scale-based text rendering
    // TODO: fix over eager text parsing / input
    const [unit, setUnit] = useState<Units>("NANO");
    const onUnitChange = (newUnit: string) => {
        const isUnit = (val: string): val is Units => {
            return UNITS.includes(val as Units);
        };

        if (isUnit(newUnit)) {
            setUnit(newUnit);
        }
    };

    // Only allow floats and scientific notation
    const handleChange = (val: string) => {
        setValue(parseStrAsNumber(val));
    };
    return (
        <InputGroup style={{width: "100%"}} size="sm">
            <Form.Control
                type="text"
                value={renderResolutionText(value, unit)}
                onChange={(e) => handleChange(e.target.value)}
                inputMode="decimal"
                autoComplete="off"
                maxLength={10}
            />
            {addDropdown && (
                <DropdownButton
                    title={renderUnit(unit)}
                    style={{maxWidth: 80}}
                    variant="outline-secondary"
                >
                    {units.map((u) => (
                        <Dropdown.Item key={u} onClick={(_) => onUnitChange(u)}>
                            {renderUnit(u)}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            )}
        </InputGroup>
    );
};

export interface DoubleSliderProps {
    value: {lower: number; upper: number};
    setValue: (val: {lower: number; upper: number}) => void;
    min?: number;
    max?: number;
    step?: number;
    logarithmic?: boolean;
    addDropdown?: boolean;
}

export const DoubleSlider: FC<DoubleSliderProps> = ({
    value,
    setValue,
    min = 1,
    max = 9,
    step = 0.001,
    logarithmic = false,
    addDropdown = false
}) => {
    const [sliderVal, setSliderVal] = useState<{lower: number; upper: number}>({
        lower: min,
        upper: max
    });
    // TODO: Hoist unit up here?

    const onSliderChange = (lower: number, upper: number) => {
        if (logarithmic) {
            setValue({lower: Math.pow(10, lower), upper: Math.pow(10, upper)});
        } else {
            setValue({lower, upper});
        }
    };

    useEffect(() => {
        if (logarithmic) {
            setSliderVal({lower: Math.log10(value.lower), upper: Math.log10(value.upper)});
        } else {
            setSliderVal(value);
        }
    }, [value]);

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 2}}>
            <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                value={[sliderVal.lower, sliderVal.upper]}
                min={min}
                max={max}
                step={step}
                minDistance={0.2}
                pearling
                onChange={([lower, upper]) => onSliderChange(lower, upper)}
                // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
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
            <div style={{display: "flex", flexDirection: "row", gap: 5}}>
                <NumericInputOptionalDropdown
                    value={value.lower}
                    setValue={(v) => {
                        setValue({lower: v, upper: value.upper});
                    }}
                    addDropdown={addDropdown}
                />
                <NumericInputOptionalDropdown
                    value={value.upper}
                    setValue={(v) => {
                        setValue({lower: value.lower, upper: v});
                    }}
                    addDropdown={addDropdown}
                />
            </div>
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
