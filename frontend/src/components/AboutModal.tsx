import {FC} from "react";
import {Modal} from "react-bootstrap";

interface AboutModalProps {
    show: boolean;
    onClose: () => void;
}

const AboutModal: FC<AboutModalProps> = ({show, onClose}) => {
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
                <Modal.Title style={{fontWeight: 700, fontSize: 28}}>About</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    The Battery Imaging Library (BIL) is one of the first open, curated collection
                    of multi-modal and multi-length scale battery imaging datasets. There are 8
                    modalities, 80+ scans and over 500 billion voxels of open battery imaging data,
                    from single particles up to full cells. It contains raw, reconstructed and
                    processed data, as well as scripts on the{" "}
                    <a href="https://github.com/antonyvam/BatteryImagingLibrary">Github</a> for
                    processing each modality.
                </p>
                <p>
                    BIL is a project lead by Antonis Vamvakeros in the{" "}
                    <a href="https://tldr-group.github.io/#/">tldr-group</a>, with help from many
                    wonderful institutional collaborators. We welcome any additional contributions
                    (see the 'Contribute!' button), and would love to expand our range of
                    chemistries and modalities.
                </p>
                <p> Happy searching!</p>
            </Modal.Body>
        </Modal>
    );
};

export default AboutModal;
