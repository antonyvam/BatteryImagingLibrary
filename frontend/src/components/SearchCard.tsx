import {FC} from "react";
import {MODALITY_TO_COLOUR, type ScanDetails} from "../interfaces/types";
import {renderDataDims, renderModality, renderSmallestPixelSize} from "../interfaces/helpers";

import ChannelCarousel from "./ChannelCarousel";

interface SearchCardProps {
    scan: ScanDetails;
}

// Abstracted badge component
import type {Modality} from "../interfaces/types";
export const ModalityBadge: FC<{modality: Modality}> = ({modality}) => (
    <span
        style={{
            backgroundColor: MODALITY_TO_COLOUR[modality],
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.9em",
            borderRadius: 8,
            padding: "2px 10px",
            display: "inline-block",
            minWidth: 60,
            textAlign: "center"
        }}
    >
        {renderModality(modality)}
    </span>
);

const SearchCard: FC<SearchCardProps> = ({scan}) => {
    const {thumbnailName, sampleName, scanModality, scanID} = scan;
    const dataDims = scan.dataDimensions_px;
    const pixelSize = scan.pixelSize_µm;

    return (
        <div
            className="search-card"
            style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                overflow: "hidden",
                width: 310,
                background: "#fff",
                boxShadow: "0 2px 8px #0001"
            }}
        >
            <ChannelCarousel
                thumbnailName={thumbnailName}
                scanID={scanID}
                rootDir="thumbnail"
                height={200}
            />
            <div
                style={{
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <div
                    style={{
                        fontWeight: 600,
                        fontSize: 18,
                        marginBottom: 8,
                        background: "#f5f5f5",
                        padding: "4px 12px",
                        borderRadius: 6
                    }}
                >
                    {sampleName}
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5
                    }}
                >
                    <ModalityBadge modality={scanModality} />
                    <div
                        style={{
                            fontSize: 14,
                            color: "#555",
                            background: "#e3eaff",
                            padding: "2px 10px",
                            borderRadius: 4
                        }}
                    >
                        {renderDataDims(dataDims)}
                    </div>
                    <div
                        style={{
                            fontSize: 14,
                            color: "#555",
                            background: "#e3eaff",
                            padding: "2px 10px",
                            borderRadius: 4
                        }}
                    >
                        {renderSmallestPixelSize(pixelSize)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchCard;
