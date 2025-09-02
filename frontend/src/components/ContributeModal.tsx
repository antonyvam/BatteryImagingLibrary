import {FC} from "react";
import {Modal} from "react-bootstrap";

interface ContributeModalProps {
    show: boolean;
    onClose: () => void;
}

const ContributeModal: FC<ContributeModalProps> = ({show, onClose}) => {
    // Center modal with custom style (copied from ScanModal)
    const modalStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        margin: 0
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            size="xl"
            centered
            dialogClassName="scan-modal-wide"
            style={modalStyle}
        >
            <Modal.Header closeButton>
                <Modal.Title style={{fontWeight: 700, fontSize: 28}}>Contribute</Modal.Title>
            </Modal.Header>
            <Modal.Body>{/* Add contribute content here */}</Modal.Body>
        </Modal>
    );
};

export default ContributeModal;
