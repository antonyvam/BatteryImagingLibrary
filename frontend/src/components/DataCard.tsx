import React from "react";
import { FrameProps } from "src/interfaces/types";
import { Table, Image, Button } from "react-bootstrap";

import { Theme, HERO_DIMS } from "../interfaces/constants";
import Tags from "./Tags";


const TableRow = ({i, data, prevData}: {i: number, data: object, prevData: object}) => {
    return (
        <tr>
            <td style={{margin: 'auto'}}><b>{i + 2}</b></td>
            <td><Tags scanEntry={data} prevEntry={prevData} reduced={false}></Tags></td>
            <td style={{verticalAlign: 'center', textAlign: 'center'}}><Button variant="dark">More Info</Button></td>
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

    const entries = Object.entries(data);
    
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    </span>
                </div>

                <div>
                    <h4>Scan 1:</h4>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <div>   
                            <Tags scanEntry={data["0"]} prevEntry={null} reduced={false}></Tags>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Button style={{margin: 2}} variant="primary">Zenodo</Button>
                            <Button variant="dark">More Info</Button>
                        </div>
                    </div>
                </div>
                
                
                <div>
                    <h4>Other scans:</h4>
                    <Table striped bordered hover size="sm">
                        <tbody>
                            {entries.slice(1).map(([k, v], i) => <TableRow key={i} i={i} data={v} prevData={data[i]}/>)}
                        </tbody>
                    </Table>
                </div>
                
            </div>
        </div>
    )
}

export default DataCard