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
    return (
        <div
            style={{
                display: "flex",
                flexDirection: isMobile() ? "column" : "column",
                gap: 8,
                width: "100%"
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
                          {heroButtons.slice(i * 2, i * 2 + 2).map((btn) =>
                              btn.type === "link" ? (
                                  <Button
                                      key={btn.label}
                                      variant="light"
                                      size="sm"
                                      className="w-100"
                                      as="a"
                                      href={btn.url || undefined}
                                      target={btn.url ? "_blank" : undefined}
                                      rel={btn.url ? "noopener noreferrer" : undefined}
                                      style={{
                                          backgroundColor: btn.color,
                                          color: btn.color ? "white" : "black",
                                          fontSize: "0.95em",
                                          padding: "6px 0",
                                          minWidth: 0
                                      }}
                                  >
                                      {btn.label}
                                  </Button>
                              ) : (
                                  <Button
                                      key={btn.label}
                                      variant="light"
                                      size="sm"
                                      className="w-100"
                                      onClick={btn.onClick}
                                      style={{
                                          fontSize: "0.95em",
                                          padding: "6px 0",
                                          minWidth: 0
                                      }}
                                  >
                                      {btn.label}
                                  </Button>
                              )
                          )}
                      </div>
                  ))
                : [0, 1].map((row) => (
                      <div style={{display: "flex", gap: 8}} key={row}>
                          {heroButtons.slice(row * 3, row * 3 + 3).map((btn) =>
                              btn.type === "link" ? (
                                  <Button
                                      key={btn.label}
                                      variant="light"
                                      size="lg"
                                      className="w-100"
                                      as="a"
                                      href={btn.url || undefined}
                                      target={btn.url ? "_blank" : undefined}
                                      rel={btn.url ? "noopener noreferrer" : undefined}
                                      style={{
                                          backgroundColor: btn.color,
                                          color: btn.color ? "white" : "black"
                                      }}
                                  >
                                      {btn.label}
                                  </Button>
                              ) : (
                                  <Button
                                      key={btn.label}
                                      variant="light"
                                      size="lg"
                                      className="w-100"
                                      onClick={btn.onClick}
                                  >
                                      {btn.label}
                                  </Button>
                              )
                          )}
                      </div>
                  ))}
        </div>
    );
};
