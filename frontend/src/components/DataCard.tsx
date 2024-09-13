import React from "react";
import { FrameProps } from "src/interfaces/types";
import { Table, Image } from "react-bootstrap";

import { Theme, HERO_DIMS } from "../interfaces/constants";
import Tags from "./Tags";


const TableRow = ({i, data}: {i: number, data: object}) => {
    return (
        <tr>
            <td>{i + 2}</td>
            <td><Tags scanEntry={data} reduced={true}></Tags></td>
            <td>More Info!</td>
        </tr>
    )
}


const DataCard = ({title, data}: FrameProps) => {
    // NB: video needs to be in H264 codec (not H265) to play
    // can probably get away with compression
    // TODO: refactor img and video into their own interactive components
    // use 'timeupdate' event on video to sync slider playback button
    // TODO: get tags working as their own component
    // TODO: add on hover border change, pause video unless hover
    
    return( 
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: 'white', outline: `1px solid ${Theme.LIGHT_GREY}`, padding: '2%' }}>
            <div style={{flexGrow: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <video width="300" height="300" autoPlay loop >
                    <source src="../assets/videos/uncompressed.mp4" type="video/mp4"></source>
                </video>
                <Image style={{maxWidth: 220}} src="../assets/imgs/placeholder_xy.png" fluid></Image>
            </div>
            <div style={{flexGrow: 7, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: "0%"}}>
                <h2 style={{textAlign: "center"}}>{title}</h2>
                <div>
                    <span>
                    Foo bar text about this battery
                    </span>
                </div>

                <div>
                    <h4>Scan 1:</h4>
                    <Tags scanEntry={data["0"]} reduced={false}></Tags>
                </div>
                
                <div>
                    <h4>Other scans:</h4>
                    <Table striped bordered hover size="sm">
                        <tbody>
                            {Object.entries(data).slice(1).map(([k, v], i) => <TableRow i={i} data={v}/>)}
                        </tbody>
                    </Table>
                </div>
                
            </div>
        </div>
    )
}

export default DataCard