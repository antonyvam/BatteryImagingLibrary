import {FC} from "react";
import {Modal, Carousel} from "react-bootstrap";

export type ContributorData = {
    name: string;
    subheader: string;
    url: string;
    imgName: string;
};

interface ContributorModalProps {
    show: boolean;
    onClose: () => void;
}

const contributorData: ContributorData[] = [
    {
        name: "Imperial College London",
        subheader: "Department of Battery Research",
        url: "https://www.imperial.ac.uk/",
        imgName: "imperial"
    },
    {
        name: "Finden",
        subheader: "Helping clients with advanced characterisation",
        url: "https://www.finden.co.uk/",
        imgName: "finden"
    },
    {
        name: "University of Manchester",
        subheader: "Department of Materials",
        url: "https://www.materials.manchester.ac.uk/",
        imgName: "manchester"
    },
    {
        name: "University College London",
        subheader: "Department of Chemistry",
        url: "https://www.ucl.ac.uk/mathematical-physical-sciences/chemistry",
        imgName: "ucl"
    },
    {
        name: "University of Southampton",
        subheader: "μ-VIS X-ray Imaging Centre",
        url: "https://muvis.org/",
        imgName: "southampton"
    }
];

const ContributorModal: FC<ContributorModalProps> = ({show, onClose}) => {
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
                <Modal.Title style={{fontWeight: 700, fontSize: 28}}>Contributors</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{marginBottom: 24}}>
                    <span>Thanks to our institutional collaborators:</span>
                </div>
                <Carousel data-bs-theme="dark">
                    {contributorData.map((contrib, idx) => (
                        <Carousel.Item key={contrib.name} interval={1000}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}
                            >
                                <a href={contrib.url} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={`../assets/imgs/institutions/${contrib.imgName}.png`}
                                        // alt={contrib.name}
                                        style={{
                                            width: 420,
                                            height: 120,
                                            objectFit: "contain",
                                            marginBottom: 16
                                        }}
                                    />
                                </a>
                            </div>
                            <Carousel.Caption>
                                <h3>{contrib.name}</h3>
                                <p>{contrib.subheader}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Modal.Body>
        </Modal>
    );
};

export default ContributorModal;
