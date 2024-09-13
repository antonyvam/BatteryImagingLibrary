import React from "react";
import { FrameProps } from "src/interfaces/types";
import { Table, Image } from "react-bootstrap";

import { Theme, HERO_DIMS } from "../interfaces/constants";


const DataCard = ({title, data}: FrameProps) => {
    return(
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: 'white', outline: `1px solid ${Theme.LIGHT_GREY}`, padding: '2%' }}>
            <div style={{flexGrow: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <video width="300" height="300" autoPlay loop >
                    <source src="../assets/videos/uncompressed.mp4" type="video/mp4"></source>
                </video>
                <Image style={{maxWidth: 220}} src="../assets/imgs/placeholder_xy.png" fluid></Image>
            </div>
            <div style={{flexGrow: 7, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: "0%"}}>
                <h2 style={{textAlign: "center"}}>{title}</h2>
                <div style={{height: 200}}>tags</div>
                <h4>Other scans:</h4>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan={2}>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default DataCard