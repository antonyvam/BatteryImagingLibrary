import {useState, useRef, useEffect, FC} from "react";
import type {ScanDetails} from "../interfaces/types";
import {renderDataDims, renderModality} from "../interfaces/helpers";

interface SearchCardProps {
    scan: ScanDetails;
}

const SearchCard: FC<SearchCardProps> = ({scan}) => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const imgRef = useRef<HTMLImageElement>(null);
    const [imgStyle, setImgStyle] = useState<React.CSSProperties>({});

    const {thumbnailName, thumbnailType, sampleName, scanModality} = scan;
    const dataDims = scan.dataDimensions_px;
    const images = thumbnailName.map((name) => `/assets/imgs/${scan.scanID}/${name}`);

    // Adjust image style for best fit and aspect ratio
    useEffect(() => {
        const handleResize = () => {
            if (imgRef.current) {
                const container = imgRef.current.parentElement;
                if (!container) return;
                const cW = container.clientWidth;
                const cH = container.clientHeight;
                const iW = imgRef.current.naturalWidth;
                const iH = imgRef.current.naturalHeight;
                if (!iW || !iH) return;
                // Focus on top center
                let style: React.CSSProperties = {
                    objectFit: "cover",
                    objectPosition: "top center",
                    width: "100%",
                    height: "100%"
                };
                // Optionally, further logic for aspect ratio
                setImgStyle(style);
            }
        };
        const img = imgRef.current;
        if (img) {
            img.onload = handleResize;
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            if (img) img.onload = null;
        };
    }, [currentIdx]);

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIdx((idx) => (idx === 0 ? images.length - 1 : idx - 1));
    };
    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIdx((idx) => (idx === images.length - 1 ? 0 : idx + 1));
    };

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
            <div style={{position: "relative", width: "100%", height: 200, background: "#eee"}}>
                {images.length > 1 && (
                    <button
                        onClick={handlePrev}
                        style={{
                            position: "absolute",
                            left: 8,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 2,
                            background: "#fff8",
                            border: "none",
                            borderRadius: "50%",
                            width: 32,
                            height: 32,
                            cursor: "pointer"
                        }}
                    >
                        &lt;
                    </button>
                )}
                <img
                    ref={imgRef}
                    src={images[currentIdx]}
                    alt={`Preview ${currentIdx + 1}`}
                    style={imgStyle}
                />
                {images.length > 1 && (
                    <button
                        onClick={handleNext}
                        style={{
                            position: "absolute",
                            right: 8,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 2,
                            background: "#fff8",
                            border: "none",
                            borderRadius: "50%",
                            width: 32,
                            height: 32,
                            cursor: "pointer"
                        }}
                    >
                        &gt;
                    </button>
                )}
            </div>
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
                    <div
                        style={{
                            fontSize: 14,
                            color: "#555",
                            background: "#e3eaff",
                            padding: "2px 10px",
                            borderRadius: 4
                        }}
                    >
                        {renderModality(scanModality)}
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
                        {renderDataDims(dataDims)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchCard;
