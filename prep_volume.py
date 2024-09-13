from tifffile import imread
import numpy as np
from PIL import Image

from os import listdir, mkdir


def load_arr(fpath: str) -> np.ndarray:
    arr = imread(fpath)
    return arr.astype(np.uint8)


def get_orthoslice_arrs(vol: np.ndarray) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    z, y, x = vol.shape
    mz, my, mx = z // 2, y // 2, x // 2
    return (vol[mz, :, :], vol[:, :, mx], vol[:, my, :])


def slice_to_png(slice: np.ndarray) -> Image.Image:
    return Image.fromarray((1 - slice) * 255)


def try_make_folder(folder_name: str) -> None:
    try:
        mkdir(folder_name)
    except FileExistsError:
        pass


dirs = ("xy", "yz", "xz")
for file_name in listdir("volumes"):
    number = file_name.split(".")[0]
    volume = load_arr(f"volumes/{file_name}")
    slices = get_orthoslice_arrs(volume)
    out_dir = f"frontend/src/assets/imgs/{number}"
    try_make_folder(out_dir)
    for plane, slice in zip(dirs, slices):
        img = slice_to_png(slice)
        img.save(f"{out_dir}/{plane}.png")
