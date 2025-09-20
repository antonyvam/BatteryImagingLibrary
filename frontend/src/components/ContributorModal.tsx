import {FC, useState} from "react";
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
        subheader: "TLDR Group; Dyson School of Design Engineering ",
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
    },
    {
        name: "Diamond Light Source",
        subheader: "Beamline I12 & Rutherford Appleton Laboratory",
        url: "https://www.diamond.ac.uk/Instruments/Imaging-and-Microscopy/I12.html",
        imgName: "DLS"
    },
    {
        name: "ISIS Neutron and Muon Source",
        subheader: "IMAT",
        url: "https://www.diamond.ac.uk/Instruments/Imaging-and-Microscopy/I12.html",
        imgName: "isis_neutrons"
    },
    {
        name: "ESRF",
        subheader: "ID11 - Material Science beamline",
        url: "https://www.esrf.fr/UsersAndScience/Experiments/StructMaterials/ID11",
        imgName: "ESRF"
    },
    {
        name: "DESY",
        subheader: "P07 - The High Energy Materials Science Beamline",
        url: "https://photon-science.desy.de/facilities/petra_iii/beamlines/p07_high_energy_materials_science/index_eng.html",
        imgName: "DESY"
    },
    {
        name: "UKBIC",
        subheader: "",
        url: "https://www.ukbic.co.uk/",
        imgName: "UKBIC"
    },
    {
        name: "Warwick Manufacturing Group",
        subheader: "Energy Innovation Centre",
        url: "https://warwick.ac.uk/fac/sci/wmg/",
        imgName: "WMG"
    },
    {
        name: "National Renewable Energy Laboratory",
        subheader: "Center for Energy Conversion and Storage Systems",
        url: "https://www.nrel.gov/",
        imgName: "NREL"
    },
    {
        name: "ThermoFisher Scientific",
        subheader: "",
        url: "https://www.thermofisher.com/uk/en/home.html",
        imgName: "thermofisher"
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

    const [contributorIdx, setContributorIdx] = useState(0);

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
                    <span>Many thanks to our institutional collaborators:</span>
                </div>
                <div style={{position: "relative", paddingBottom: 56}}>
                    <Carousel
                        data-bs-theme="dark"
                        className="contributor-carousel"
                        activeIndex={contributorIdx}
                        onSelect={(selectedIdx) => setContributorIdx(selectedIdx)}
                        interval={1000}
                    >
                        {contributorData.map((contrib) => (
                            <Carousel.Item key={contrib.name}>
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
                                                marginBottom: 130
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
                </div>
                {/* <div style={{textAlign: "center", marginTop: 16}}>
                    <h3 style={{fontSize: 22, fontWeight: 600, marginBottom: 4}}>
                        {contributorData[contributorIdx].name}
                    </h3>
                    <p style={{fontSize: 16, color: "#555", margin: 0}}>
                        {contributorData[contributorIdx].subheader}
                    </p>
                </div> */}
            </Modal.Body>
        </Modal>
    );
};

export default ContributorModal;
