from PIL import Image, ImageDraw, ImageFont
import numpy as np
from dataclasses import dataclass, field
from typing import Literal, Tuple, Optional

# Global image size
FIG_W_PX = 2400
FIG_H_PX = 2000


def frac_to_px(x_frac: float, y_frac: float) -> Tuple[int, int]:
    """Convert fractional coordinates (0-1) to pixel coordinates."""
    return int(x_frac * FIG_W_PX), int(y_frac * FIG_H_PX)


def log_to_px(x_log: float, x_start: float, x_end: float, log_min: float, log_max: float) -> int:
    """Convert a value in nanometers (log scale) to pixel x coordinate, with offset and custom log range."""
    px_min, px_max = int(x_start * FIG_W_PX), int(x_end * FIG_W_PX)
    x_log = np.log10(x_log)
    px = px_min + (x_log - log_min) / (log_max - log_min) * (px_max - px_min)
    return int(px)


@dataclass
class InsetImage:
    image: Optional[Image.Image]
    img_loc: Tuple[float, float, float, float]  # (x0, y0, w, h) in fig fraction
    bar_loc: float  # 0 to 1, fractional position along the bar for line origin
    inset_loc: Tuple[float, float, float, float] | None = (
        None  # (x0, y0, x1, y1) in axes fraction for where lines land on image
    )
    sf: float = 1


@dataclass
class Modality:
    label: str
    scale_range_nm: Tuple[float, float]
    colour: str
    text_loc: float  # 0 to 1, fractional position along the bar for text
    inset_images: Tuple[InsetImage, ...] = field(default_factory=tuple)


def draw_bar(
    draw,
    modality: Modality,
    y_px: int,
    bar_height_px: int,
    font: ImageFont.ImageFont,
    x_start: float,
    x_end: float,
    log_min: float,
    log_max: float,
    draw_shadow: bool = True,
    shadow_offset: Tuple[int, int] = (26, -26),
):
    x0, x1 = modality.scale_range_nm
    bar_x0 = log_to_px(x0, x_start, x_end, log_min, log_max)
    bar_x1 = log_to_px(x1, x_start, x_end, log_min, log_max)
    # Draw bar

    r_edge = 7
    if draw_shadow:
        sx, sy = shadow_offset
        draw.rounded_rectangle(
            [bar_x0 - sx, y_px - sy, bar_x1 - sx, y_px + bar_height_px - sy], fill="#000000", radius=r_edge
        )
    draw.rounded_rectangle([bar_x0, y_px, bar_x1, y_px + bar_height_px], fill=modality.colour, radius=r_edge)
    # Draw label text
    text_x = bar_x0 + modality.text_loc * (bar_x1 - bar_x0)
    text_y = y_px
    draw.text((text_x, text_y), modality.label, fill="white", font=font)


def draw_inset_images(
    base_img: Image.Image,
    draw,
    modality: Modality,
    y_px: int,
    bar_height_px: int,
    x_start: float,
    x_end: float,
    log_min: float,
    log_max: float,
    lw: float = 7,
    draw_shadow: bool = True,
    shadow_offset: Tuple[int, int] = (4, -4),
):
    for inset in modality.inset_images:
        if inset.image is None:
            continue

        # Draw the image if present
        x_frac, y_frac, w_frac, h_frac = inset.img_loc

        x_px_img, y_px_img = frac_to_px(x_frac, y_frac)
        ih, iw = inset.image.height, inset.image.width
        w_px, h_px = int(iw * inset.sf), int(ih * inset.sf)
        img_resized = inset.image.resize((w_px, h_px))

        # Draw line from bar to image
        x0, x1 = modality.scale_range_nm
        bar_x0 = log_to_px(x0, x_start, x_end, log_min, log_max)
        bar_x1 = log_to_px(x1, x_start, x_end, log_min, log_max)
        bar_x = bar_x0 + inset.bar_loc * (bar_x1 - bar_x0)
        bar_y = y_px + bar_height_px // 2

        if inset.inset_loc is None:
            x0i, y0i, x1i, y1i = x_px_img, y_px_img, x_px_img + w_px, y_px_img + h_px
        else:
            x0i = x_px_img + int(inset.inset_loc[0] * w_px)
            y0i = y_px_img + int(inset.inset_loc[1] * h_px)
            x1i = x_px_img + int(inset.inset_loc[2] * w_px)
            y1i = y_px_img + int(inset.inset_loc[3] * h_px)

        o_px = 4
        border_w = int(lw / 2)
        # draw.line([(bar_x, bar_y), (x0i + o_px, y0i + o_px)], fill=modality.colour, width=lw)
        # draw.line([(bar_x, bar_y), (x1i - o_px, y1i - o_px)], fill=modality.colour, width=lw)

        if draw_shadow:
            x0i, y0i, x1i, y1i = x_px_img, y_px_img, x_px_img + w_px, y_px_img + h_px
            draw.rounded_rectangle(
                [
                    x0i - shadow_offset[0] - border_w,
                    y0i - shadow_offset[1] - border_w,
                    x1i - shadow_offset[0] + border_w,
                    y1i - shadow_offset[1] + border_w,
                ],
                fill="#000000",
                width=border_w,
                radius=border_w,
            )
        draw.line([(bar_x, bar_y), (x0i + (x1i - x0i) / 2, y0i + (y1i - y0i) / 2)], fill=modality.colour, width=lw)

        base_img.paste(img_resized, (x_px_img, y_px_img))

        draw.rounded_rectangle(
            [x0i - border_w / 2, y0i - border_w / 2, x1i + border_w / 2, y1i + border_w / 2],
            outline=modality.colour,
            width=border_w,
            radius=border_w,
        )


def draw_scalebar(
    draw,
    scale_ticks: list[float],
    scale_labels: list[str],
    start_frac_y: float,
    font,
    x_start: float,
    x_end: float,
    log_min: float,
    log_max: float,
    draw_line: bool = True,
    ticks: Literal["end", "all"] = "end",
    line_color: str = "black",
    tick_color: str = "black",
    text_color: str = "black",
    line_width: int = 2,
    tick_height_frac: float = 0.015,
    text_offset_frac: float = 0.01,
    draw_container: bool = True,
):
    """
    Draws a scale bar with tick labels and optional line/tick marks.
    start_frac_y: vertical position (fraction of image height) for the text baseline.
    """
    y_text = int(start_frac_y * FIG_H_PX)
    y_line = y_text - int(text_offset_frac * FIG_H_PX)
    tick_height = int(tick_height_frac * FIG_H_PX)

    if draw_container:
        # Draw a container box around the scale bar and labels
        x0 = log_to_px(scale_ticks[0], x_start, x_end, log_min, log_max) - 3 * tick_height
        x1 = log_to_px(scale_ticks[-1], x_start, x_end, log_min, log_max) + 5 * tick_height
        y0 = y_line - tick_height - int(0.01 * FIG_H_PX)
        y1 = y_text + int(0.035 * FIG_H_PX)
        draw.rounded_rectangle([x0, y0, x1, y1], outline="black", fill="#fff3de", width=line_width, radius=200)

    # Draw main line
    if draw_line:
        x0 = log_to_px(scale_ticks[0], x_start, x_end, log_min, log_max)
        x1 = log_to_px(scale_ticks[-1], x_start, x_end, log_min, log_max)
        draw.line([(x0, y_line), (x1, y_line)], fill=line_color, width=line_width)
    # Draw ticks
    if ticks == "end":
        tick_positions = [scale_ticks[0], scale_ticks[-1]]
    else:
        tick_positions = scale_ticks
    for tick in tick_positions:
        x = log_to_px(tick, x_start, x_end, log_min, log_max)
        draw.line([(x, y_line - tick_height // 2), (x, y_line + tick_height // 2)], fill=tick_color, width=line_width)
    # Draw labels
    for tick, label in zip(scale_ticks, scale_labels):
        x = log_to_px(tick, x_start, x_end, log_min, log_max)
        # w, h = draw.textsize(label, font=font)
        w, h = 5, 5
        draw.text((x - w // 2, y_text), label, fill=text_color, font=font)


def main(modalities: list[Modality]) -> None:
    # Set up font
    try:
        font = ImageFont.truetype("DejaVuSans-Bold.ttf", 36)
    except Exception:
        font = ImageFont.load_default()

    # Create base image
    img = Image.new("RGBA", (FIG_W_PX, FIG_H_PX), (255, 255, 255, 255))
    draw = ImageDraw.Draw(img)

    # Bar layout
    # Horizontal offset for bars and scale bar (fractional, 0.0 = left, 1.0 = right)
    x_start = 0.12  # e.g., 0.2 for 20% from left
    x_end = 0.88  # e.g., 0.8 for 80% from left (so bars are centered)
    bar_height_frac = 0.04
    bar_height_px = int(bar_height_frac * FIG_H_PX)

    bar_gap_pct = 0.003
    bar_gap_px = int(bar_gap_pct * FIG_H_PX)

    y_start_frac = 0.3
    y_start = int(y_start_frac * FIG_H_PX)

    scale_ticks = [1e-1, 1, 10, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8]
    scale_labels = ["1 Å", "1 nm", "10 nm", "100 nm", "1 µm", "10 µm", "100 µm", "1 mm", "1 cm", "10 cm"]
    label_y = y_start_frac + ((0.95 + len(modalities)) * (bar_height_frac + bar_gap_pct))  # 0.65

    line_width_px = 18

    # Compute log range from data
    log_min = np.log10(min(scale_ticks))
    log_max = np.log10(max(scale_ticks))

    # Draw bars and insets

    for i, modality in enumerate(modalities):
        y_px = y_start + i * (bar_height_px + bar_gap_px)
        draw_inset_images(img, draw, modality, y_px, bar_height_px, x_start, x_end, log_min, log_max, line_width_px)
        # draw_bar(draw, modality, y_px, bar_height_px, font, x_start, x_end, log_min, log_max)

    for i, modality in enumerate(modalities):
        y_px = y_start + i * (bar_height_px + bar_gap_px)
        draw_bar(draw, modality, y_px, bar_height_px, font, x_start, x_end, log_min, log_max)

        # draw_inset_images(img, draw, modality, y_px, bar_height_px, x_start, x_end, log_min, log_max)

    # Draw scale tick labels
    draw_scalebar(
        draw,
        scale_ticks,
        scale_labels,
        label_y,
        font,
        x_start,
        x_end,
        log_min,
        log_max,
        draw_line=True,
        ticks="all",
        line_width=6,
    )

    img.save("figure_1_pillow.png")
    return


# Example: Load images (replace with actual paths as needed)

eds_img = Image.open("processing_scripts/assets/EDS.png")
ebsd_img = Image.open("processing_scripts/assets/EBSD.png")
xct_1_img = Image.open("processing_scripts/assets/XCT_1.png")
xct_2_img = Image.open("processing_scripts/assets/XCT_2.png")
xct_3_img = Image.open("processing_scripts/assets/XCT_3.png")
nct_img = Image.open("processing_scripts/assets/NCT.png")
xrd_img = Image.open("processing_scripts/assets/XRDCT.png")
sem_img = Image.open("processing_scripts/assets/SEM.png")
tem_img = Image.open("processing_scripts/assets/TEM.png")
apt_img = Image.open("processing_scripts/assets/APT.png")
s3xrd_img = Image.open("processing_scripts/assets/S3XRD.png")


modalities = [
    Modality(
        label="X-ray CT",
        scale_range_nm=(0.5e3, 1e8),
        colour="#bb441dff",
        text_loc=0.83,
        inset_images=(
            InsetImage(
                image=xct_1_img,
                img_loc=(0.93, 0.4, 0, 0),
                bar_loc=0.99,
                sf=0.47,
                inset_loc=(0.1, 0.1, 0.9, 0.9),
            ),
            InsetImage(
                image=xct_2_img,
                img_loc=(0.73, 0.78, 0, 0),
                bar_loc=0.7,
                sf=0.32,
                inset_loc=(0.1, 0.1, 0.9, 0.9),
            ),
            InsetImage(
                image=xct_3_img,
                img_loc=(0.47, 0.785, 0, 0),
                bar_loc=0.38,
                sf=0.32,
                inset_loc=(0.1, 0.1, 0.9, 0.9),
            ),
        ),
    ),
    Modality(
        label="Neutron CT",
        scale_range_nm=(1e4, 1e8),
        colour="#888682ff",
        text_loc=0.70,
        inset_images=(InsetImage(image=nct_img, img_loc=(0.835, 0.14, 0, 0), bar_loc=0.60, sf=0.35),),
    ),
    Modality(
        label="XRD CT",
        scale_range_nm=(750, 4e7),
        colour="#D76A03",
        text_loc=0.83,
        inset_images=(InsetImage(image=xrd_img, img_loc=(0.67, 0.25, 0, 0), bar_loc=0.71, sf=0.32),),
    ),
    Modality(
        label="SEM",
        scale_range_nm=(1, 1e6),
        colour="#387780",
        text_loc=0.915,
        inset_images=(InsetImage(image=sem_img, img_loc=(0.2, 0.80, 0, 0), bar_loc=0.66, sf=0.4),),
    ),
    Modality(
        label="S3DXRD",
        scale_range_nm=(100, 1e5),
        colour="#ac34c9",
        text_loc=0.7,
        inset_images=(InsetImage(image=s3xrd_img, img_loc=(0.005, 0.77, 0, 0), bar_loc=0.4, sf=0.75),),
    ),
    Modality(
        label="EDS",
        scale_range_nm=(1e1, 1e5),
        colour="#1fadd8ff",
        text_loc=0.88,
        inset_images=(InsetImage(image=eds_img, img_loc=(0.20, 0.03, 0, 0), bar_loc=0.65, sf=0.52),),
    ),
    Modality(
        label="EBSD",
        scale_range_nm=(1e1, 1e5),
        colour="#8EA604",
        text_loc=0.85,
        inset_images=(InsetImage(image=ebsd_img, img_loc=(0.60, 0.05, 0, 0), bar_loc=0.8, sf=0.7),),
    ),
    Modality(
        label="TEM",
        scale_range_nm=(0.1, 1e3),
        colour="#01328d",
        text_loc=0.87,
        inset_images=(InsetImage(image=tem_img, img_loc=(0.01, 0.44, 0, 0), bar_loc=0.35, sf=0.60),),
    ),
    Modality(
        label="APT",
        scale_range_nm=(0.3, 1e2),
        colour="#4a148c",
        text_loc=0.81,
        inset_images=(InsetImage(image=apt_img, img_loc=(0.04, 0.07, 0, 0), bar_loc=0.35, sf=0.5),),
    ),
][::-1]


if __name__ == "__main__":
    main(modalities)
