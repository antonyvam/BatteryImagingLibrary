import React, {useEffect, useState} from "react";
import {Modal, Button, Table} from "react-bootstrap";
import {fileExists} from "../interfaces/helpers";
import {ModalProps} from "react-bootstrap";
import Orthoslices from "./Orthoslices";

import {IGNORE_HEADERS, getText, getPrefixAndSuffix} from "./Tags";

// todo: parameteise modal with set/show hide of entryboolean

const kvValid = (kv: [string, any]) => {
    const header = kv[0];
    const value = kv[1];
    if (!IGNORE_HEADERS.includes(header) && value != "N/A") {
        return true;
    } else {
        return false;
    }
};

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

const DataTable = ({entry}: {entry: Object}) => {
    // change this as viewport dims change (i.e go to single row format)

    const getNRows = (entry: object) => {
        const kvs = Object.entries(entry);
        let j = 0;
        for (let i = 0; i < kvs.length; i++) {
            if (kvValid(kvs[i])) {
                j += 1;
            }
        }
        const scalar = vw > 600 ? 2 : 1;
        return Math.ceil(j / scalar);
    };

    const getSingleKV = (entryKV: [string, any]) => {
        const [prefix, suffix] = getPrefixAndSuffix(entryKV[0], entryKV[1], true);
        console.log(prefix, suffix);
        const headerText = prefix.charAt(0).toUpperCase() + prefix.slice(1);
        return (
            <>
                <th>{headerText}</th>
                <td>{suffix}</td>
            </>
        );
    };

    const getRow = (entryKVs: [string, any][], idx: number) => {
        return (
            <tr key={idx}>
                {getSingleKV(entryKVs[idx])}
                {vw > 600 && getSingleKV(entryKVs[idx + 1])}
            </tr>
        );
    };

    const getEntries = (entry: object) => {
        const N = getNRows(entry);
        const arrN = [...Array(N).keys()];
        const KVs = Object.entries(entry).filter((v, _) => kvValid(v));
        const scalar = vw > 600 ? 2 : 1;
        return arrN.map((_, i, __) => getRow(KVs, scalar * i));
    };

    return (
        <Table striped bordered hover size="sm">
            <tbody>{getEntries(entry)}</tbody>
        </Table>
    );
};

const DataModal = ({show, setShow, entry, setEntry}: ModalProps) => {
    const [fname, setFname] = useState<string>("1");

    const getFname = (batteryNumber: string) => {
        const fileValid = fileExists(`../assets/imgs/${batteryNumber}/`);
        if (fileValid) {
            return batteryNumber;
        } else {
            return "1";
        }
    };

    useEffect(() => {
        if (entry == null) {
            return;
        }
        const newFname = getFname(entry["global_scan_number"] + 1);
        setFname(newFname);
    }, [entry]);

    if (entry == null) {
        return <></>;
    } else {
        return (
            <>
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            {entry["battery"] + " - scan " + (entry["local_scan_number"] + 1)}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                        style={{display: "flex", flexDirection: "column", alignItems: "center"}}
                    >
                        <Orthoslices
                            fname={fname}
                            wavelengths={entry["wavelengths"]}
                            modal={true}
                        />
                        <Button
                            href={entry["url"]}
                            style={{marginTop: "14px", marginBottom: "14px"}}
                        >
                            Download on Zenodo
                        </Button>
                        <DataTable entry={entry} />
                    </Modal.Body>
                </Modal>
            </>
        );
    }
};

export default DataModal;
