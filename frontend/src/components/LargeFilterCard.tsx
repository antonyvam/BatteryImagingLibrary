import {useState, FC, useEffect, useContext, ChangeEvent} from "react";
import {useNavigate, Navigate} from "react-router-dom";
import ReactSlider from "react-slider";
import {Form, Card, InputGroup, Button} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AppContext, {
    isMobile,
    MODALITIES,
    Modality,
    MODALITY_TO_COLOUR,
    UNIT_TO_SCALE,
    UNITS,
    Units
} from "../interfaces/types";
import {
    isModality,
    parseStrAsNumber,
    renderModality,
    renderResolutionText,
    renderUnit
} from "../interfaces/helpers";
import "../assets/scss/styles.css";
import {ModalityBadge} from "./SearchCard";

// Numeric input with units dropdown component
interface NumericInputOptionalDropdown {
    value: number;
    setValue: (val: number) => void;
    addDropdown?: boolean;
    units?: string[];
    squared?: boolean;
    defaultUnit: Units;
    integer?: boolean;
}

export const NumericInputOptionalDropdown: FC<NumericInputOptionalDropdown> = ({
    value,
    setValue,
    addDropdown = false,
    units = UNITS,
    squared = false,
    defaultUnit = "PIXEL",
    integer = false
}) => {
    const [unit, setUnit] = useState<Units>(defaultUnit);
    const [textVal, setTextVal] = useState<string>(value.toString());
    const [keyPressed, setKeyPressed] = useState<boolean>(false);

    const onUnitChange = (newUnit: string) => {
        const isUnit = (val: string): val is Units => {
            return UNITS.includes(val as Units);
        };

        if (isUnit(newUnit)) {
            setUnit(newUnit);
        }
    };

    const getDropdownText = (u: Units, squared: boolean = false) => {
        if (squared) {
            return (
                <>
                    {renderUnit(u)}
                    <sup>2</sup>
                </>
            );
        } else {
            return <>{renderUnit(u)}</>;
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            if (keyPressed) {
                setValue(parseStrAsNumber(textVal) * UNIT_TO_SCALE[unit]); // update after user stops typing
            }

            setKeyPressed(false);
        }, 500);

        return () => {
            clearTimeout(handler); // cleanup on new keystroke
        };
    }, [textVal, unit, setValue]);

    useEffect(() => {
        setTextVal(renderResolutionText(value, unit, integer));
    }, [value, unit]);

    return (
        <InputGroup style={{width: "100%"}} size="sm">
            <Form.Control
                type="text"
                value={textVal}
                onChange={(e) => {
                    setKeyPressed(true);
                    setTextVal(e.target.value);
                }}
                inputMode="decimal"
                autoComplete="off"
                maxLength={10}
            />
            {addDropdown && (
                <DropdownButton
                    title={getDropdownText(unit, squared)}
                    style={{maxWidth: 80}}
                    variant="outline-secondary"
                >
                    {units.map((u) => (
                        <Dropdown.Item key={u} onClick={(_) => onUnitChange(u)}>
                            {getDropdownText(u, squared)}
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
    squared?: boolean;
    showTicks?: boolean;
    defaultUnit?: Units;
    integer?: boolean;
}

export const DoubleSlider: FC<DoubleSliderProps> = ({
    value,
    setValue,
    min = 0,
    max = 9,
    step = 0.001,
    logarithmic = false,
    addDropdown = false,
    squared = false,
    showTicks = false,
    defaultUnit = "PIXEL",
    integer = false
}) => {
    const navigate = useNavigate();
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
        const isSearching = location.pathname.startsWith("/search");
        if (!isSearching) {
            navigate("/search");
        }
    };

    useEffect(() => {
        if (logarithmic) {
            setSliderVal({lower: Math.log10(value.lower), upper: Math.log10(value.upper)});
        } else {
            setSliderVal(value);
        }
    }, [value]);

    // Generate integer marks from min to max
    const intMin = Math.ceil(min);
    const intMax = Math.floor(max);
    const marks = Array.from({length: intMax - intMin}, (_, i) => 1 + intMin + i);

    // Special ticks: 1nm (0), 1um (3), 1mm (6)
    const specialTicks = [0, 3, 6];
    const specialLabels: Record<number, string> = {
        0: "1\xa0nm",
        3: "1\xa0µm",
        6: "1\xa0mm"
    };

    // Render marks function
    const renderMarks = (props: any) => {
        const {
            key,
            className,
            style
        }: {key: number; className: string; style: React.CSSProperties} = props;

        const val = min + key + 1;
        const isSpecial = specialTicks.includes(val);

        if (isSpecial) {
            return (
                <span {...props} key={props.key} className={"slider-mark-special"}>
                    <span style={{position: "relative", top: "-20px"}}>{specialLabels[val]}</span>
                </span>
            );
        } else {
            return <span {...props} key={props.key} className={"slider-mark"}></span>;
        }
    };

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 2}}>
            <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                // markClassName="slider-mark"
                value={[sliderVal.lower, sliderVal.upper]}
                min={min}
                max={max}
                step={step}
                minDistance={0.2}
                pearling
                marks={showTicks ? marks : false}
                renderMark={(props) => renderMarks(props)}
                onChange={([lower, upper]) => onSliderChange(lower, upper)}
                // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                renderTrack={(props, state) => (
                    <div
                        {...props}
                        key={props.key}
                        style={{
                            ...props.style,
                            background: state.index === 1 ? "#0d6efd" : "#e9ecef",
                            height: 6,
                            borderRadius: 3,
                            zIndex: 1
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
                    squared={squared}
                    defaultUnit={defaultUnit}
                    integer={integer}
                />
                <NumericInputOptionalDropdown
                    value={value.upper}
                    setValue={(v) => {
                        setValue({lower: value.lower, upper: v});
                    }}
                    addDropdown={addDropdown}
                    squared={squared}
                    defaultUnit={defaultUnit}
                    integer={integer}
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
    defaultCollapsed?: boolean;
}

export const LargeFilterCard: FC<LargeFilterCardProps> = ({title, children, style}) => {
    const defaultCollapsed = isMobile();
    const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed);

    // Update collapsed state on resize (collapse on mobile by default)
    useEffect(() => {
        const handleResize = () => {
            if (defaultCollapsed === undefined) {
                setCollapsed(isMobile());
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [defaultCollapsed]);

    return (
        <Card
            // className="mb-3 p-2 shadow-sm large-filter-card"
            style={{minWidth: 0, maxWidth: 340, padding: 0, width: "100%", ...style}}
        >
            <Card.Body
                style={{display: "flex", flexDirection: "column", height: "100%", padding: "12 36"}}
            >
                <Card.Title className="mb-3" style={{marginBottom: 0}}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        {title}
                        {defaultCollapsed && (
                            <Button
                                variant="ghost"
                                size="sm"
                                aria-label={collapsed ? "Expand" : "Collapse"}
                                style={{marginLeft: 8, minWidth: 32, padding: 6, lineHeight: 1}}
                                onClick={() => setCollapsed((c) => !c)}
                            >
                                {collapsed ? "▼" : "▲"}
                            </Button>
                        )}
                    </div>
                </Card.Title>

                {!collapsed && (
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start"
                        }}
                    >
                        {children}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export const ModalityCard = () => {
    const navigate = useNavigate();
    const {
        selectedModalities: [selectedModalities, setSelectedModalities]
    } = useContext(AppContext)!;

    const [dropdownSelection, setDropdownSelection] = useState<Modality>("ANY");

    const onDropdownChange = (x: ChangeEvent<HTMLSelectElement>) => {
        const val = x.target.value;
        if (isModality(val)) {
            setDropdownSelection(val);
        }
    };

    const onButtonClick = () => {
        if (selectedModalities.includes(dropdownSelection)) {
            return;
        }

        setSelectedModalities([...selectedModalities, dropdownSelection]);
        navigate("/search");
    };

    const removeModality = (x: Modality) => {
        const newModalities = selectedModalities.filter((v) => v != x);
        setSelectedModalities(newModalities);
    };

    return (
        <LargeFilterCard title="Modality">
            <div style={{display: "flex", flexDirection: "column", gap: 5}}>
                <InputGroup>
                    <select
                        className="form-select"
                        id="modality-dropdown"
                        defaultValue="X-ray"
                        onChange={(e) => onDropdownChange(e)}
                    >
                        {MODALITIES.map((v) => {
                            return (
                                <option value={v} key={v}>
                                    {renderModality(v)}
                                </option>
                            );
                        })}
                    </select>
                    <Button variant="outline-secondary" onClick={onButtonClick}>
                        +
                    </Button>
                </InputGroup>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        overflowY: "scroll",
                        gap: 2
                    }}
                >
                    {selectedModalities.map((v, i) => {
                        return (
                            <ModalityBadge modality={v} canClose={true} onClick={removeModality} />
                        );
                    })}
                </div>
            </div>
        </LargeFilterCard>
    );
};
