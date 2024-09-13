
import React from "react";
import { Stack } from "react-bootstrap";
import { FrameProps } from "src/interfaces/types";

const DataFrame = ({title, data}: FrameProps) => {
    return (
    <Stack>
        <div><h2>{title}</h2></div>
    </Stack>
    )
}

export default DataFrame