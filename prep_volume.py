from tifffile import imread
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
from matplotlib.colors import Normalize
import matplotlib.cm as cm

from os import listdir, mkdir


def load_arr(fpath: str) -> np.ndarray:
    arr = imread(fpath)
    return arr.astype(np.uint8)


def get_orthoslice_arrs(vol: np.ndarray) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    z, y, x = vol.shape
    mz, my, mx = z // 2, y // 2, x // 2
    return (vol[mz, :, :], vol[:, :, mx], vol[:, my, :])


def slice_to_png(slice: np.ndarray, scale: bool = True) -> Image.Image:
    if scale:
        slice = (1 - slice) * 255
        slice = slice.astype(np.uint8)
    return Image.fromarray(slice)


def try_make_folder(folder_name: str) -> None:
    try:
        mkdir(folder_name)
    except FileExistsError:
        pass


cmap = plt.get_cmap("plasma")
m = cm.ScalarMappable(Normalize(0, 1), cmap)


def gen_wavelength_arrs(slice: np.ndarray) -> list[np.ndarray]:
    remapped = slice.astype(np.float32) / 255.0
    out: list[np.ndarray] = []
    for centre in (0.0, 0.5, 1.0):
        dist_arr = np.abs(remapped - centre)
        rgba = m.to_rgba(dist_arr)
        rgba = (rgba * 255).astype(np.uint8)
        out.append(rgba)
    return out


dirs = ("xy", "yz", "xz")
wavelengths = ("210nm", "448nm", "746nm")
for file_name in listdir("volumes"):
    number = file_name.split(".")[0]
    volume = load_arr(f"volumes/{file_name}")
    slices = get_orthoslice_arrs(volume)
    out_dir = f"frontend/src/assets/imgs/{number}"
    try_make_folder(out_dir)
    for plane, slice in zip(dirs, slices):
        img = slice_to_png(slice)
        img.save(f"{out_dir}/{plane}.png")

        if number == "6":
            wavelength_arrs = gen_wavelength_arrs(slice)
            for wavelength, arr in zip(wavelengths, wavelength_arrs):
                img = slice_to_png(arr, False)
                img.save(f"{out_dir}/{plane}_{wavelength}.png")
