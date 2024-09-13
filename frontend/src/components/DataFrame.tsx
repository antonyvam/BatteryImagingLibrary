
import React from "react";
import { Stack } from "react-bootstrap";
import { FrameProps } from "src/interfaces/types";
import DataCard from "./DataCard";

import { Theme, HERO_DIMS } from "../interfaces/constants";


const DataFrame = ({title, data}: FrameProps) => {
    const getTitle = (titleStr: string) => {
        if (titleStr == 'xrd') { return "XRD"}
        else if (titleStr == 'lab') {return "Laboratory"}
        else {
            return (titleStr.charAt(0).toUpperCase() + titleStr.slice(1));
        }
    }

    return (
        <Stack style={{margin: '1%'}}>
            <div style={{backgroundColor: Theme.HERO_BG, borderRadius: '20px 20px 0px 0px', color: 'whitesmoke', padding: '10px 10px',outline: `1px solid ${Theme.LIGHT_GREY}` }}><h2>{getTitle(title)}</h2></div>
            {Object.entries(data).map(([k, v]) => <DataCard title={k} data={v} key={k} />)}
        </Stack>
    )
}

export default DataFrame