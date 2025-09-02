import {FC, CSSProperties, useState, useRef, useEffect} from "react";

interface ChannelCarouselProps {
    thumbnailName: string[];
    scanID: string | number;
    rootDir: string;
    height?: number;
}

const ChannelCarousel: FC<ChannelCarouselProps> = ({
    thumbnailName,
    scanID,
    rootDir,
    height = 200
}) => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const imgRef = useRef<HTMLImageElement>(null);
    const [imgStyle, setImgStyle] = useState<CSSProperties>({});

    const images = thumbnailName.map((name) => `/assets/imgs/${rootDir}/${scanID}/${name}`);

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
                let style: CSSProperties = {
                    objectFit: "cover",
                    objectPosition: "top center",
                    width: "100%",
                    height: "100%"
                };
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
        <div style={{position: "relative", width: "100%", height, background: "#eee"}}>
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
    );
};

export default ChannelCarousel;
