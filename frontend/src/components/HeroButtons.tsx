import React from "react";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

type FloatingButtonProps = {
    iconPath: string;
    onClick: () => void;
    ariaLabel: string;
};

const FloatingButton: React.FC<FloatingButtonProps> = ({iconPath, onClick, ariaLabel}) => {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {ariaLabel}
        </Tooltip>
    );

    return (
        <OverlayTrigger placement="right" delay={{show: 100, hide: 100}} overlay={renderTooltip}>
            <button
                onClick={onClick}
                aria-label={ariaLabel}
                style={{
                    background: "#fff",
                    borderRadius: "50%",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    width: 48,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                    border: "none",
                    cursor: "pointer"
                }}
            >
                <img
                    src={iconPath}
                    alt="icon"
                    style={{width: 24, height: 24, objectFit: "contain"}}
                />
            </button>
        </OverlayTrigger>
    );
};

export const FloatingButtons: React.FC = () => {
    const navigate = useNavigate();

    const isSearching = location.pathname.startsWith("/search");
    const navPath = isSearching ? "/" : "/search";
    const navButtonPath = isSearching
        ? "/assets/imgs/icons/home.png"
        : "/assets/imgs/icons/data.png";
    const label = isSearching ? "Home" : "Browse library";

    return (
        <div
            style={{
                position: "fixed",
                bottom: 4,
                left: 12,
                display: "flex",
                flexDirection: "column",
                zIndex: 1000
            }}
        >
            <FloatingButton
                iconPath="/assets/imgs/icons/up.png" // Up arrow
                onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
                ariaLabel="Scroll to top"
            />
            <FloatingButton
                iconPath={navButtonPath} // Home icon
                onClick={() => navigate(navPath)}
                ariaLabel={label}
            />
        </div>
    );
};

type HeroButton =
    | {label: string; type: "link"; url: string; color?: string}
    | {label: string; type: "action"; onClick: () => void; color?: string};

interface HeroButtonsProps {
    heroButtons: HeroButton[];
    isMobile: () => boolean;
}

export const HeroButtons: React.FC<HeroButtonsProps> = ({heroButtons, isMobile}) => {
    // Button sizing for even layout
    const BUTTON_WIDTH = 160;
    const BUTTON_HEIGHT = 48;

    // Helper to get shared button style
    const getButtonStyle = (color?: string, fontSize?: string) => ({
        backgroundColor: color,
        color: color ? "white" : "black",
        fontSize: fontSize || undefined,
        minWidth: BUTTON_WIDTH,
        minHeight: BUTTON_HEIGHT,
        maxWidth: BUTTON_WIDTH,
        maxHeight: BUTTON_HEIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    });

    // Helper to render a button (link or action)
    const renderHeroButton = (btn: HeroButton, size: "sm" | "lg", key?: React.Key) => {
        const style = getButtonStyle(btn.color, size === "sm" ? "0.95em" : undefined);
        if (btn.type === "link") {
            return (
                <Button
                    key={btn.label}
                    variant="light"
                    size={size}
                    as="a"
                    href={btn.url || undefined}
                    target={btn.url ? "_blank" : undefined}
                    rel={btn.url ? "noopener noreferrer" : undefined}
                    style={style}
                >
                    {btn.label}
                </Button>
            );
        } else {
            return (
                <Button
                    key={btn.label}
                    variant="light"
                    size={size}
                    onClick={btn.onClick}
                    style={style}
                >
                    {btn.label}
                </Button>
            );
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 8
            }}
        >
            {/* On mobile, stack all buttons vertically */}
            {isMobile()
                ? Array.from({length: Math.ceil(heroButtons.length / 2)}, (_, i) => (
                      <div
                          key={i}
                          style={{
                              display: "flex",
                              gap: 4,
                              marginBottom: 4
                          }}
                      >
                          {heroButtons
                              .slice(i * 2, i * 2 + 2)
                              .map((btn) => renderHeroButton(btn, "sm", btn.label))}
                      </div>
                  ))
                : [0, 1].map((row) => (
                      <div style={{display: "flex", gap: 8}} key={row}>
                          {heroButtons
                              .slice(row * 3, row * 3 + 3)
                              .map((btn) => renderHeroButton(btn, "lg", btn.label))}
                      </div>
                  ))}
        </div>
    );
};
