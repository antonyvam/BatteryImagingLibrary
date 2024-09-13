import React, {useState} from "react";
import {Image, ButtonGroup, ToggleButton} from "react-bootstrap";

const Orthoslices = ({fname}: {fname: string}) => {
    const [dir, setDir] = useState<"xy" | "yz" | "xz">("xy");
    const radios = [
        {name: "xy", value: "xy"},
        {name: "yz", value: "yz"},
        {name: "xz", value: "xz"}
    ];
    const radioClicked = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value as "xy" | "yz" | "xz";
        console.log(dir, val);
        setDir(val);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 20,
                maxWidth: 220
            }}
        >
            <Image src={`../assets/imgs/${fname}/${dir}.png`} fluid></Image>
            <ButtonGroup style={{marginTop: 12, zIndex: 10}}>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="checkbox"
                        variant="outline-dark"
                        name="radio"
                        value={radio.value}
                        checked={dir === radio.value}
                        onChange={(e) => radioClicked(e)}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </div>
    );
};

export default Orthoslices;
