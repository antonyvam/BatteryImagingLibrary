import React, {useEffect, useRef, useState} from "react";
import {Table, Button, Accordion} from "react-bootstrap";

import {FrameProps} from "src/interfaces/types";
import {Theme} from "../interfaces/constants";
import {fileExists} from "../interfaces/helpers";
import Tags from "./Tags";
import VideoPlayer from "./VideoPlayer";
import Orthoslices from "./Orthoslices";

import {regexSearch} from "../interfaces/helpers";

import "../assets/scss/styles.css";

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

const TableRow = ({
    i,
    data,
    prevData,
    showModalI
}: {
    i: number;
    data: object;
    prevData: object | null | undefined;
    showModalI: (e: number) => void;
}) => {
    return (
        <tr>
            <td style={{verticalAlign: "center", textAlign: "center"}}>
                <b>{i + 1}</b>
            </td>
            <td>
                <Tags scanEntry={data} prevEntry={prevData} reduced={false}></Tags>
            </td>
            <td style={{verticalAlign: "center", textAlign: "center"}}>
                <Button variant="dark" onClick={(e) => showModalI(data["local_scan_number"])}>
                    More Info
                </Button>
            </td>
        </tr>
    );
};

const DataCard = ({title, data, setShowModal, setModalEntry, searchText}: FrameProps) => {
    // NB: video needs to be in H264 codec (not H265) to play
    // can probably get away with compression

    const divRef = useRef<HTMLDivElement>(null);
    const [hover, setHover] = useState<boolean>(false);
    const entries = Object.entries(data);

    const getFname = (batteryNumber: string) => {
        const fileValid = fileExists(`../assets/videos/${batteryNumber}.mp4`);
        if (fileValid) {
            return batteryNumber;
        } else {
            return "1";
        }
    };

    const showModalSetContent = (scanEntryNumber: number) => {
        setModalEntry(data[scanEntryNumber.toString()]);
        setShowModal(true);
    };

    useEffect(() => {
        if (hover) {
            divRef.current!.style.zIndex = "12";
            divRef.current!.style.outline = `1px solid ${Theme.INFO_FOLD}`;
        } else {
            divRef.current!.style.zIndex = "0";
            divRef.current!.style.outline = `1px solid ${Theme.LIGHT_GREY}`;
        }
    }, [hover]);

    return (
        <div
            id={data["0"]["imaging_type"] + "_" + title}
            ref={divRef}
            onMouseEnter={(e) => setHover(true)}
            onPointerEnter={(e) => setHover(true)}
            onPointerLeave={(e) => setHover(false)}
            onMouseLeave={(e) => setHover(false)}
            className="data-card"
        >
            <h2 style={{textAlign: "center"}}>{title}</h2>
            <div className="data-column-lhs">
                <VideoPlayer fname={getFname(data["0"]["global_scan_number"] + 1)} active={hover} />
                {vw > 600 && (
                    <Orthoslices
                        fname={getFname(data["0"]["global_scan_number"] + 1)}
                        wavelengths={data["0"]["wavelengths"]}
                        modal={false}
                    />
                )}
            </div>
            <div className="data-column-rhs">
                <div>
                    <span>{data["0"]["desc"]}</span>
                </div>

                <Accordion style={{width: "100%"}} flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <h3>Scans</h3>
                        </Accordion.Header>
                        <Accordion.Body style={{padding: "5px 0px"}}>
                            <Table striped bordered hover size="sm">
                                <tbody>
                                    {entries
                                        .filter(([k, v]) => regexSearch(searchText, v))
                                        .map(([k, v], i) => (
                                            <TableRow
                                                key={i}
                                                i={i}
                                                data={v}
                                                prevData={data[i - 1]}
                                                showModalI={showModalSetContent}
                                            />
                                        ))}
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
};

export default DataCard;
