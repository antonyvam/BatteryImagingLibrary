from typing import Optional

import os
import numpy as np
from PIL import Image
import tifffile


def list_sorted_images(folder: str) -> list[str]:
    files = [f for f in os.listdir(folder) if f.lower().endswith((".tif", ".tiff", ".png", ".jpg", ".jpeg"))]
    files.sort()
    return files


def get_plane_suffix(filename: str) -> Optional[str]:
    """Return 'xy', 'xz', or 'yz' if present in filename (case-insensitive), else None."""
    lower = filename.lower()
    for plane in ("xy", "xz", "yz"):
        if plane in lower:
            return plane
    return None


def load_image(path: str) -> Image.Image:
    ext = os.path.splitext(path)[1].lower()
    if ext in [".tif", ".tiff"]:
        img = tifffile.imread(path)
        if img.ndim == 2:
            return Image.fromarray(img)
        elif img.ndim == 3:
            return Image.fromarray(img)
        else:
            raise ValueError(f"Unsupported tiff shape: {img.shape}")
    else:
        return Image.open(path)


def is_greyscale(img: Image.Image) -> bool:
    arr = np.array(img)
    if arr.ndim == 2:
        return True
    if arr.ndim == 3 and arr.shape[2] == 1:
        return True
    if arr.ndim == 3 and arr.shape[2] >= 3:
        return bool(np.all(arr[..., 0] == arr[..., 1]) and np.all(arr[..., 1] == arr[..., 2]))
    return False


def remove_whitespace_padding(img: Image.Image) -> Image.Image:
    arr = np.array(img)
    if arr.ndim == 3:
        mask = np.any(arr != 255, axis=2)
    else:
        mask = arr != 255
    coords = np.argwhere(mask)
    if coords.size == 0:
        return img
    y0, x0 = coords.min(axis=0)
    y1, x1 = coords.max(axis=0) + 1
    cropped = arr[y0:y1, x0:x1]
    return Image.fromarray(cropped)


def crop_if_square(img: Image.Image) -> Image.Image:
    w, h = img.size
    if abs(w - h) < 0.1 * min(w, h):
        # Crop in half along the longer axis
        if w > h:
            left = (w - h) // 2
            right = left + h
            return img.crop((left, 0, right, h))
        else:
            top = (h - w) // 2
            bottom = top + w
            return img.crop((0, top, w, bottom))
    return img


def resize_image(img: Image.Image, min_side: int) -> Image.Image:
    w, h = img.size
    scale = min_side / min(w, h)
    new_w, new_h = int(round(w * scale)), int(round(h * scale))
    return img.resize((new_w, new_h), Image.LANCZOS)


def process_and_save_images() -> None:
    src_root = "imgs_to_process"
    dst_thumb_root = "frontend/src/assets/imgs/thumbnail"
    dst_modal_root = "frontend/src/assets/imgs/modal"
    os.makedirs(dst_thumb_root, exist_ok=True)
    os.makedirs(dst_modal_root, exist_ok=True)
    for subfolder in os.listdir(src_root):
        subfolder_path = os.path.join(src_root, subfolder)
        if not os.path.isdir(subfolder_path):
            continue
        try:
            i = int(subfolder)
        except ValueError:
            continue
        files = list_sorted_images(subfolder_path)
        thumb_dir = os.path.join(dst_thumb_root, str(i))
        modal_dir = os.path.join(dst_modal_root, str(i))
        os.makedirs(thumb_dir, exist_ok=True)
        os.makedirs(modal_dir, exist_ok=True)
        for j, fname in enumerate(files, 1):
            fpath = os.path.join(subfolder_path, fname)
            img = load_image(fpath)
            img = remove_whitespace_padding(img)
            img = crop_if_square(img)
            # Greyscale conversion
            if is_greyscale(img):
                img = img.convert("L")
            else:
                img = img.convert("RGB")
            # Determine suffix if present
            plane = get_plane_suffix(fname)
            if plane:
                thumb_name = f"{i}_{plane}.png"
                modal_name = f"{i}_{plane}.png"
            else:
                thumb_name = f"{i}_{j}H.png"
                modal_name = f"{i}_{j}H.png"
            # Thumbnail
            thumb = resize_image(img, 250)
            thumb.save(os.path.join(thumb_dir, thumb_name))
            # Modal
            modal = resize_image(img, 500)
            modal.save(os.path.join(modal_dir, modal_name))
            print(f"Processed {fpath} -> {thumb_name}, {modal_name}")


if __name__ == "__main__":
    process_and_save_images()
