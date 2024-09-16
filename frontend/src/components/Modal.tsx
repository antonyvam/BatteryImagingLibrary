import React, {useEffect, useState} from "react";
import {Modal, Button} from "react-bootstrap";
import {fileExists} from "../interfaces/helpers";
import {ModalProps} from "react-bootstrap";
import Orthoslices from "./Orthoslices";

// todo: parameteise modal with set/show hide of entryboolean

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
        console.log(entry);
        console.log(newFname);
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
                    <Modal.Body>
                        <Orthoslices
                            fname={fname}
                            wavelengths={entry["wavelengths"]}
                            modal={true}
                        />
                    </Modal.Body>
                </Modal>
            </>
        );
    }
};

export default DataModal;
