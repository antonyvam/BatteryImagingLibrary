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
            <Modal.Body>
                <span>
                    If you have data you'd like to appear in the library, please do the following:
                </span>
                <ol>
                    <li>
                        <b>Upload the data to Zenodo.</b> It's fine to split the data into multiple
                        entries if it's large. It's encouraged to create separate entries for raw,
                        processed (denoised, segmented) and reconstructed data. You can tag it with
                        the 'battery imaging library' and/or 'BIL' tag. If the data is already on{" "}
                        <span> </span>
                        <a href="https://zenodo.org/">zenodo</a>, all you need to do is send us the
                        DOI(s) in step 2.
                    </li>
                    <li>
                        <b>Send an email to a.vamvakeros@imperial.ac.uk.</b> Please include the
                        following (a * means required):
                        <ul>
                            <li>
                                <b>*Sample name:</b> a short name for the sample{" "}
                            </li>
                            <li>
                                <b>*Sample description:</b> brief description of what the sample is{" "}
                            </li>
                            <li>
                                <b>*Zenodo link(s):</b> a list of zenodo link(s) for the data. If
                                there are multiple, please describe what each link is ('slices 0-50'
                                or 'raw', 'reconstructed', <i>etc.</i>)
                            </li>
                            <li>
                                <b>*Scan modality:</b> SEM/EDS/XCT/TEM/...
                            </li>
                            <li>
                                <b>*Pixel size:</b> µm per pixel / voxel in each direction{" "}
                                <i>i.e, </i>
                                7;7;10{" "}
                            </li>
                            <li>
                                <b>*DOI:</b> how you want people to cite you when they use the BIL
                                website - this can be an existing publication or the zenodo DOI
                            </li>
                            <li>
                                <b>Instrument:</b> what instrument was used to collect the data
                            </li>
                            <li>
                                <b>Data size:</b> pixels/voxels in each direction <i>i.e, </i>{" "}
                                1000;1000 or 500;500;500
                            </li>
                            <li>
                                <b>Sample chemistry:</b> LFP? NMC? 532 or 811? LLZO?
                            </li>
                            <li>
                                <b>Scan parameters:</b> relevant imaging parameters like beam
                                current, dwell/exposure time <i>etc.</i> - ideally this is formatted
                                in a JSON
                            </li>
                            <li>
                                <b>Scan type:</b> what is the image of? Pick one of
                                particle/electrode/cell/pack
                            </li>
                        </ul>
                    </li>
                </ol>
            </Modal.Body>
        </Modal>
    );
};

export default ContributeModal;
