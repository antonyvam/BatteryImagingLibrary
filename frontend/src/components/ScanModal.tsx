import {FC, useState, useEffect, Fragment, useContext} from "react";
import {useParams} from "react-router-dom";
import AppContext from "../interfaces/types";
import {isArrayEmpty} from "../interfaces/helpers";
import {Modal, Button, Accordion, Table, Form} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import ChannelCarousel from "./ChannelCarousel";
import {ScanDetails} from "../interfaces/types";
import {renderSmallestPixelSize, renderDataDims} from "../interfaces/helpers";
import {ModalityBadge} from "./SearchCard";

interface ScanModalProps {
    show: boolean;
    scan?: ScanDetails | null;
    onClose: () => void;
}

const ScanModal: FC<ScanModalProps> = ({show, scan: propScan, onClose}) => {
    const {id} = useParams<{id: string}>();
    const appContext = useContext(AppContext);
    const scanData = appContext?.scanData[0] || [];
    const [scan, setScan] = useState<ScanDetails | null>(propScan ?? null);

    // If scan is not provided, look it up from scanData using id
    useEffect(() => {
        if (!scan && id && scanData.length > 0) {
            const found = scanData.find((s) => String(s.scanID) === id);
            if (found) setScan(found);
        }
    }, [id, scan, scanData]);

    // Modal centering and responsive width
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!scan) return null;

    // Prepare scanParameters as array of [key, value] pairs, two per row
    const paramEntries: [string, string][] = Object.entries(scan.scanParameters || {});
    const paramRows: [string, string][][] = [];
    for (let i = 0; i < paramEntries.length; i += 2) {
        paramRows.push(paramEntries.slice(i, i + 2));
    }
    const paramsAvailable = paramEntries.length > 0;
    const {rawZenodoLinks, processedZenodoLinks, reconstructedZenodoLinks} = scan.zenodoLinks;
    const {citations} = scan;

    // Responsive flex for Zenodo links
    const zenodoFlex: React.CSSProperties =
        windowWidth > 700
            ? {display: "flex", flexDirection: "row" as const, gap: 32}
            : {display: "flex", flexDirection: "column" as const, gap: 18};

    // Center modal with custom style
    const modalStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        margin: 0
    };

    const styleRelatedScans = (scanData: ScanDetails[], currentScan: ScanDetails) => {
        const valid = scanData.filter(
            (v) => v.sampleID == currentScan.sampleID && v.scanID != currentScan.scanID
        );
        return valid.map((v, i) => {
            return (
                <>
                    <a href={`${v.scanID}`}>
                        {v.sampleName} ({v.scanID})
                    </a>
                    {i < valid.length - 1 && ", "}
                </>
            );
        });
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
                <Modal.Title style={{fontWeight: 700, fontSize: 28}}>{scan.sampleName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display: "flex", flexDirection: "column", gap: 24}}>
                    {/* Channel Carousel */}
                    <ChannelCarousel
                        thumbnailName={scan.thumbnailName}
                        scanID={scan.scanID}
                        rootDir="modal"
                        height={500}
                    />

                    {/* Metadata Row */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 16,
                            marginTop: 8,
                            justifyContent: "center",
                            flexWrap: "wrap"
                        }}
                    >
                        <ModalityBadge
                            modality={scan.scanModality}
                            canClose={false}
                            onClick={() => {
                                /**/
                            }}
                            isLarge={true}
                        />
                        <div
                            style={{
                                fontSize: 16,
                                color: "#555",
                                background: "#e3eaff",
                                padding: "4px 14px",
                                borderRadius: 4
                            }}
                        >
                            {renderSmallestPixelSize(scan.pixelSize_µm)}
                        </div>
                        <div
                            style={{
                                fontSize: 16,
                                color: "#555",
                                background: "#e3eaff",
                                padding: "4px 14px",
                                borderRadius: 4
                            }}
                        >
                            {renderDataDims(scan.dataDimensions_px)}
                        </div>
                        <div
                            style={{
                                fontSize: 16,
                                color: "#555",
                                background: "#e3eaff",
                                padding: "4px 14px",
                                borderRadius: 4
                            }}
                        >
                            {scan.instrument}
                        </div>
                    </div>

                    {/* Description */}
                    <div
                        style={{
                            fontSize: 18,
                            margin: "12px 0",
                            background: "#f8f9fa",
                            padding: "10px 18px",
                            borderRadius: 6
                        }}
                    >
                        <p>{scan.sampleDescription}</p>
                        <p>Related: {styleRelatedScans(scanData, scan)}</p>
                    </div>

                    <Accordion defaultActiveKey="0" alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Zenodo Links</Accordion.Header>
                            <Accordion.Body>
                                <div style={zenodoFlex}>
                                    {[
                                        {label: "Raw", arr: rawZenodoLinks},
                                        {label: "Processed", arr: processedZenodoLinks},
                                        {label: "Reconstructed", arr: reconstructedZenodoLinks}
                                    ].map(({label, arr}) =>
                                        !isArrayEmpty(arr) ? (
                                            <div key={label}>
                                                <div style={{fontWeight: 600}}>{label}</div>
                                                <ul>
                                                    {arr
                                                        .map((url, i) => ({url, i}))
                                                        .filter(({url}) => url && url !== "")
                                                        .map(({url, i}) => (
                                                            <li key={i}>
                                                                <a
                                                                    href={url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    {url}
                                                                </a>
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>
                                        ) : null
                                    )}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                        {paramsAvailable && (
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Scan Parameters</Accordion.Header>
                                <Accordion.Body>
                                    <Table bordered size="sm">
                                        <tbody>
                                            {paramRows.map((row, idx) => (
                                                <tr key={idx}>
                                                    {row.map(([k, v]) => (
                                                        <Fragment key={k}>
                                                            <td
                                                                style={{
                                                                    fontWeight: 600,
                                                                    width: "20%"
                                                                }}
                                                            >
                                                                {k}
                                                            </td>
                                                            <td style={{width: "30%"}}>{v}</td>
                                                        </Fragment>
                                                    ))}
                                                    {row.length < 2 && (
                                                        <>
                                                            <td></td>
                                                            <td></td>
                                                        </>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Accordion.Body>
                            </Accordion.Item>
                        )}

                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Citations</Accordion.Header>
                            <Accordion.Body>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        justifyContent: "flex-start",
                                        gap: 20,
                                        paddingBottom: 30,
                                        alignItems: "baseline"
                                    }}
                                >
                                    <div>
                                        <b>Contributor:</b> {scan.contributors}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 16,
                                            color: "#555",
                                            background: "#e3eaff",
                                            padding: "4px 14px",
                                            borderRadius: 4
                                        }}
                                    >
                                        {scan.licence}
                                    </div>
                                </div>
                                {citations && citations.length > 0 ? (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column"
                                        }}
                                    >
                                        If you find this data useful in your research, please cite
                                        the following:
                                        {citations.map((doi, idx) => (
                                            <InputGroup
                                                className="mb-3"
                                                key={idx}
                                                style={{padding: 4}}
                                            >
                                                <InputGroup.Text
                                                    id="basic-addon1"
                                                    style={{maxWidth: "85%", overflow: "scroll"}}
                                                >
                                                    {doi}
                                                </InputGroup.Text>
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(doi);
                                                    }}
                                                >
                                                    Copy
                                                </Button>
                                            </InputGroup>
                                        ))}
                                    </div>
                                ) : (
                                    <div>No DOIs available.</div>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </Modal.Body>
        </Modal>
    );
};
export default ScanModal;
