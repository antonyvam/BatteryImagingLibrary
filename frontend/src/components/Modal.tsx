import React from "react";
import {Modal, Button} from "react-bootstrap";

import {ModalProps} from "react-bootstrap";

// todo: parameteise modal with set/show hide of entryboolean

const DataModal = ({show, setShow, entry, setEntry}: ModalProps) => {
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
                        <p>
                            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                            commodi aspernatur enim, consectetur. Cumque deleniti temporibus ipsam
                            atque a dolores quisquam quisquam adipisci possimus laboriosam.
                            Quibusdam facilis doloribus debitis! Sit quasi quod accusamus eos quod.
                            Ab quos consequuntur eaque quo rem! Mollitia reiciendis porro quo magni
                            incidunt dolore amet atque facilis ipsum deleniti rem!
                        </p>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
};

export default DataModal;
