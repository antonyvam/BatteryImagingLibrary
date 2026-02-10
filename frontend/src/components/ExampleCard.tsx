import {FC, useRef, useState, useEffect, useContext} from "react";
import {Card, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";
import AppContext, {ExampleCardData, isMobile, MAX_L_PX, MAX_SIZE_NM} from "../interfaces/types";
import {renderModality} from "../interfaces/helpers";
import VideoPlayer from "./VideoPlayer";

const exampleData: ExampleCardData[] = [
    {
        modality: "SEM",
        text: "Scanning electron microscopy for nanoscale imaging of surface and cross-sectional morphology, capturing fine structural features of electrodes and particles.",
        imgPath: "SEM",
        isVideo: true
    },
    {
        modality: "EDS",
        text: "Energy-dispersive X-ray spectroscopy coupled to SEM, producing spatially resolved chemical maps or spectral cubes that reveal elemental distributions.",
        imgPath: "EDS",
        isVideo: true
    },
    {
        modality: "EBSD",
        text: "Electron backscatter diffraction for crystallographic mapping at the microscale, including raw Kikuchi patterns and indexed orientation maps for advanced analysis.",
        imgPath: "ebsd",
        isVideo: true
    },
    {
        modality: "LAB_MICRO_XCT",
        text: "Non-destructive 3D imaging of whole cells at the micron scale, widely used to study internal structure, defects, and design of commercial batteries.",
        imgPath: "XCT",
        isVideo: true
    },
    {
        modality: "NEUTRON_CT",
        text: "Complementary to X-ray CT, neutron imaging highlights low-Z materials such as electrolytes, polymers, and separators that are difficult to see with X-rays.",
        imgPath: "NEUTRON_CT",
        isVideo: true
    },
    {
        modality: "XRD_CT",
        text: "X-ray diffraction computed tomography combining spatial and crystallographic information, enabling mapping of phase distributions, strain, and lattice evolution in working batteries.",
        imgPath: "XRD_CT",
        isVideo: true
    },
    {
        modality: "SYNCHOTRON_MICRO_XCT",
        text: "High-resolution, wide FoV, 3D imaging of battery electrodes at the microscale, including operando cycling datasets.",
        imgPath: "micro_CT",
        isVideo: true
    },
    {
        modality: "SYNCHOTRON_NANO_XCT",
        text: "High-resolution 3D imaging of battery electrodes at the nanoscale, revealing porosity, cracks, and fine morphological features of the electode particles invisible to micro-CT.",
        imgPath: "nano_CT",
        isVideo: true
    },
    {
        modality: "S3DXRD",
        text: "Scanning three-dimensional X-ray diffraction for spatially resolved crystallographic mapping, enabling grain-resolved imaging of phase distribution, lattice strain, orientation, & structural heterogeneity in polycrystalline materials.",
        imgPath: "S3XRD",
        isVideo: false
    },
    {
        modality: "TEM",
        text: "Transmission electron microscopy for high-resolution imaging of electrode materials at the atomic scale, revealing lattice structure, defects, etc.",
        imgPath: "TEM",
        isVideo: false
    },
    {
        modality: "XANES_CT",
        text: "X-ray Absorption Near-Edge Structure Computed-Tomography allows for in-situ 3D mapping of local chemical environmnents.",
        imgPath: "XANES_CT",
        isVideo: false
    },
    {
        modality: "APT",
        text: "Atom probe tomography enables 3D compositional mapping at sub-nm resolution of phenomena like SEI formation and microstructural degradation.",
        imgPath: "APT",
        isVideo: false
    }
];

interface ExampleCardProps {
    cardData: ExampleCardData;
}

const ExampleCard: FC<ExampleCardProps> = ({cardData}) => {
    const navigate = useNavigate();
    const divRef = useRef<HTMLDivElement>(null);
    const {
        searchText: [, setSearchText],
        selectedModalities: [, setSelectedModalities],
        resRange: [, setResRange],
        sizeRange: [, setSizeRange],
        isSearching: [, setIsSearching]
    } = useContext(AppContext)!;

    const handleSeeAll = () => {
        setSelectedModalities([cardData.modality]);
        setSearchText("");
        setResRange({lower: 0, upper: MAX_SIZE_NM});
        setSizeRange({lower: 0, upper: MAX_L_PX});
        setIsSearching(true);
        navigate("/search");
    };

    const [hover, setHover] = useState<boolean>(false);

    useEffect(() => {
        if (hover) {
            divRef.current!.style.zIndex = "12";
            divRef.current!.style.outline = `1px solid #000000`;
        } else {
            divRef.current!.style.zIndex = "0";
            divRef.current!.style.outline = `1px solid #ffffff`;
        }
    }, [hover]);

    return (
        <Card
            className="mb-3 shadow"
            style={{minHeight: 120, maxWidth: 600}}
            onMouseEnter={(e) => setHover(true)}
            onPointerEnter={(e) => setHover(true)}
            onPointerLeave={(e) => setHover(false)}
            onMouseLeave={(e) => setHover(false)}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: isMobile() ? "column" : "row",
                    maxHeight: isMobile() ? 600 : 300
                }}
                ref={divRef}
            >
                <Card.Body>
                    <Card.Title className="h4" style={{marginBottom: 0}}>
                        {renderModality(cardData.modality)}
                    </Card.Title>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            gap: 20
                        }}
                    >
                        <Card.Text>{cardData.text}</Card.Text>
                        <Button variant="secondary" onClick={handleSeeAll}>
                            See all!
                        </Button>
                    </div>
                </Card.Body>

                {cardData.isVideo ? (
                    <VideoPlayer fname={cardData.imgPath} active={hover} />
                ) : (
                    <img
                        src={`../assets/imgs/examples/${cardData.imgPath}.png`}
                        style={{
                            objectFit: "cover",
                            width: 300,
                            height: 300
                        }}
                    />
                )}
                {/* <VideoPlayer fname={cardData.imgPath} active={hover} /> */}
            </div>
        </Card>
    );
};

const ExampleCards = () => {
    return (
        <Container style={{marginTop: 16}}>
            <h2 className="mb-4">Examples</h2>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 20,
                    justifyContent: "space-evenly"
                }}
            >
                {exampleData.map((ex, idx) => (
                    <ExampleCard cardData={ex} key={idx} />
                ))}
            </div>
        </Container>
    );
};

export default ExampleCards;
