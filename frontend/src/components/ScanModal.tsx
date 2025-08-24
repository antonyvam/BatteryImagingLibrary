import React, {useState} from "react";
import {Modal, Button, Badge, Collapse, Table} from "react-bootstrap";
import ChannelCarousel from "./ChannelCarousel";
import {MODALITY_TO_COLOUR, ScanDetails} from "../interfaces/types";
import {renderModality, renderSmallestPixelSize, renderDataDims} from "../interfaces/helpers";

interface ScanModalProps {
    show: boolean;
    scan: ScanDetails;
    onClose: () => void;
}

const ScanModal: React.FC<ScanModalProps> = ({show, scan, onClose}) => {
    const [paramsOpen, setParamsOpen] = useState(false);

    // Prepare scanParameters as array of [key, value] pairs, two per row
    const paramRows = Object.entries(scan.scanParameters).reduce<[Array<[string, any]>]>(
        (rows, entry, idx, arr) => {
            if (idx % 2 === 0) rows.push(arr.slice(idx, idx + 2));
            return rows;
        },
        [[]]
    );

    // Zenodo links
    const {rawZenodoLinks, processedZenodoLinks, reconstructedZenodoLinks} = scan.zenodoLinks;

    return (
        <Modal
            show={show}
            onHide={onClose}
            size="xl"
            centered
            dialogClassName="scan-modal-wide"
            style={{maxWidth: "90vw"}}
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
                            marginTop: 8
                        }}
                    >
                        <Badge
                            style={{
                                backgroundColor: MODALITY_TO_COLOUR[scan.scanModality],
                                fontSize: "1em"
                            }}
                        >
                            {renderModality(scan.scanModality)}
                        </Badge>
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
                        {scan.sampleDescription}
                    </div>

                    {/* Collapsible Scan Parameters */}
                    <div>
                        <Button
                            variant="outline-secondary"
                            onClick={() => setParamsOpen(!paramsOpen)}
                            aria-controls="scan-params-collapse"
                            aria-expanded={paramsOpen}
                            size="sm"
                        >
                            {paramsOpen ? "Hide" : "Show"} Scan Parameters
                        </Button>
                        <Collapse in={paramsOpen}>
                            <div id="scan-params-collapse" style={{marginTop: 12}}>
                                <Table bordered size="sm">
                                    <tbody>
                                        {paramRows.map((row, idx) => (
                                            <tr key={idx}>
                                                {row.map(([k, v]) => (
                                                    <React.Fragment key={k}>
                                                        <td style={{fontWeight: 600, width: "20%"}}>
                                                            {k}
                                                        </td>
                                                        <td style={{width: "30%"}}>{v}</td>
                                                    </React.Fragment>
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
                            </div>
                        </Collapse>
                    </div>

                    {/* Zenodo Links */}
                    <div>
                        <h5>Zenodo Links</h5>
                        <div style={{display: "flex", flexDirection: "row", gap: 32}}>
                            {rawZenodoLinks && rawZenodoLinks.length > 0 && (
                                <div>
                                    <div style={{fontWeight: 600}}>Raw</div>
                                    <ul>
                                        {rawZenodoLinks.map((url, i) => (
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
                            )}
                            {processedZenodoLinks && processedZenodoLinks.length > 0 && (
                                <div>
                                    <div style={{fontWeight: 600}}>Processed</div>
                                    <ul>
                                        {processedZenodoLinks.map((url, i) => (
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
                            )}
                            {reconstructedZenodoLinks && reconstructedZenodoLinks.length > 0 && (
                                <div>
                                    <div style={{fontWeight: 600}}>Reconstructed</div>
                                    <ul>
                                        {reconstructedZenodoLinks.map((url, i) => (
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
                            )}
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ScanModal;
