import React from "react";

import "../assets/scss/styles.css";
import {Accordion} from "react-bootstrap";
import {getTitle} from "./DataFrame";

export const Contents = ({data}: {data: object}) => {
    return (
        <div className="contents" style={{marginBottom: "3%"}}>
            <div className="data-frame">Contents</div>
            <Accordion>
                {Object.entries(data).map(([k, v], i) => (
                    <Accordion.Item key={k} eventKey={i.toString()}>
                        <Accordion.Header>
                            <a href={"#" + k} style={{textAlign: "right"}}>
                                {getTitle(k)}
                            </a>
                        </Accordion.Header>
                        <Accordion.Body>
                            {Object.entries(v).map(([k2, v2], i) => (
                                <p key={k + "_" + k2}>
                                    <a href={"#" + k + "_" + k2}>{k2}</a>
                                </p>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};
