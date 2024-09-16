import React, {useEffect, useRef, useState} from "react";
import {Table, Button} from "react-bootstrap";

import {FrameProps} from "src/interfaces/types";
import {Theme, HERO_DIMS} from "../interfaces/constants";
import Tags from "./Tags";
import VideoPlayer from "./VideoPlayer";
import Orthoslices from "./Orthoslices";

function fileExists(url: string) {
    const xhr = new XMLHttpRequest();
    try {
        xhr.open("HEAD", url, false); // 'false' makes the request synchronous
        xhr.send();
        return xhr.status >= 200 && xhr.status < 300;
    } catch (err) {
        return false;
    }
}

const TableRow = ({
    i,
    data,
    prevData,
    showModalI
}: {
    i: number;
    data: object;
    prevData: object;
    showModalI: (e: number) => void;
}) => {
    return (
        <tr>
            <td style={{verticalAlign: "center", textAlign: "center"}}>
                <b>{i + 2}</b>
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

const DataCard = ({
    title,
    data,
    showModal,
    setShowModal,
    modalEntry,
    setModalEntry
}: FrameProps) => {
    // NB: video needs to be in H264 codec (not H265) to play
    // can probably get away with compression
    // TODO: refactor img and video into their own interactive components
    // use 'timeupdate' event on video to sync slider playback button
    // TODO: get tags working as their own component
    // TODO: add on hover border change, pause video unless hover
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
            ref={divRef}
            onMouseEnter={(e) => setHover(true)}
            onMouseLeave={(e) => setHover(false)}
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                backgroundColor: "white",
                outline: `1px solid ${Theme.LIGHT_GREY}`,
                padding: "2%"
            }}
        >
            <div
                style={{
                    flexGrow: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <VideoPlayer fname={getFname(data["0"]["battery_number"])} active={hover} />
                <Orthoslices
                    fname={getFname(data["0"]["battery_number"])}
                    wavelengths={data["0"]["wavelengths"]}
                ></Orthoslices>
            </div>
            <div
                style={{
                    flexGrow: 7,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    gap: "20px",
                    padding: "0%"
                }}
            >
                <h2 style={{textAlign: "center"}}>{title}</h2>
                <div>
                    <span>{data["0"]["desc"]}</span>
                </div>

                <div>
                    <h4>Scan 1:</h4>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <div>
                            <Tags scanEntry={data["0"]} prevEntry={null} reduced={false}></Tags>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Button variant="dark" onClick={(e) => showModalSetContent(0)}>
                                More Info
                            </Button>
                        </div>
                    </div>
                </div>

                <div>
                    <h4>Other scans:</h4>
                    <Table striped bordered hover size="sm">
                        <tbody>
                            {entries.slice(1).map(([k, v], i) => (
                                <TableRow
                                    key={i}
                                    i={i}
                                    data={v}
                                    prevData={data[i]}
                                    showModalI={showModalSetContent}
                                />
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default DataCard;
