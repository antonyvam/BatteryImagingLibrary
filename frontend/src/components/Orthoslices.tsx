import React, {useState} from "react";
import {Image, ButtonGroup, ToggleButton} from "react-bootstrap";

const Orthoslices = ({
    fname,
    wavelengths,
    modal = false
}: {
    fname: string;
    wavelengths: Array<string> | string;
    modal: boolean;
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
        setLambda("_" + val + "nm");
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 20,
                maxWidth: "220px",
                marginRight: "auto",
                marginLeft: "auto"
            }}
        >
            <Image src={`../assets/imgs/${fname}/${dir}${lambda}.png`} fluid></Image>
            <ButtonGroup style={{marginTop: 12}}>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx + fname + modal}
                        id={`radio-${idx}-${fname}-${modal}`}
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
