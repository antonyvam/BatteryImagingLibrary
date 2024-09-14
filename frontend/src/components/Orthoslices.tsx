import React, {useState} from "react";
import {Image, ButtonGroup, ToggleButton} from "react-bootstrap";

const Orthoslices = ({
    fname,
    wavelengths
}: {
    fname: string;
    wavelengths: Array<string> | string;
}) => {
    const [dir, setDir] = useState<"xy" | "yz" | "xz">("xy");
    const [lambda, setLambda] = useState<string>("");
    const radios = [
        {name: "xy", value: "xy"},
        {name: "yz", value: "yz"},
        {name: "xz", value: "xz"}
    ];
    const radioClicked = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value as "xy" | "yz" | "xz";
        setDir(val);
    };
    const lambdaRadioClicked = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value as string;
        console.log(val, typeof val);
        console.log(wavelengths);
        setLambda("_" + val + "nm");
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
            <Image src={`../assets/imgs/${fname}/${dir}${lambda}.png`} fluid></Image>
            <ButtonGroup style={{marginTop: 12}}>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx + fname}
                        id={`radio-${idx}-${fname}`}
                        type="checkbox"
                        variant="outline-dark"
                        value={radio.value}
                        checked={dir === radio.value}
                        onChange={(e) => radioClicked(e)}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
            {typeof wavelengths != "string" && (
                <ButtonGroup style={{marginTop: 4}}>
                    {wavelengths.map((l, idx) => (
                        <ToggleButton
                            key={idx + fname + l}
                            id={`radio-${idx}-${fname}-${l}`}
                            type="checkbox"
                            variant="outline-dark"
                            value={l}
                            checked={lambda === "_" + l + "nm"}
                            onChange={(e) => lambdaRadioClicked(e)}
                        >
                            {l + "nm"}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            )}
        </div>
    );
};

export default Orthoslices;
