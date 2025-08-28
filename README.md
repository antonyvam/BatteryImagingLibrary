![BIL](https://raw.githubusercontent.com/antonyvam/BatteryImagingLibrary/tree/main/assets/fig1.png)

# Battery Imaging Library

**BIL** is the first multi-modal multi-length scale battery imaging database.

It currently includes the following type of data:

- Synchrotron 3D S3DXRD along with raw 2D diffraction patterns for one 2D cross section
- 2D EBSD data along with raw Kikuchi diffraction pattern and corresponding 2D FIB SEM/EDX data
- 3D FIB SEM with corresponding EDX data
- Synchrotron X-ray nano-CT
- Synchrotron X-ray micro-CT including two dynamic 4D experiments
- Synchrotron XRD-CT including datasets at different states of charge of the same battery
- Neutron-CT
- Laboratory X-ray micro-ct

📘 Official website: https://www.batteryimaginglibrary.com

The laboratory X-ray micro-ct cover the most widely used battery chemistries as shown in the following figure, specifically primary alkaline and LiFeS2 as well as rechargable NiMH and Li-ion. The sample cover a wide range of battery sizes, from the the world's smallest cylindrical Li-ion battery (Panasonic pintype) to a large 4680 Li-ion battery.

![XRD-CT](https://github.com/antonyvam/BatteryImagingLibrary/blob/main/assets/fig2.png?raw=true)

Importantly, BIL contains raw data for all techniques, including raw radiographs / sinograms, X-ray and electron diffraction patterns as illustrated in the following figure.

![XRD-CT](https://raw.githubusercontent.com/antonyvam/BatteryImagingLibrary/tree/main/assets/fig3.png)

BIL contains data also from dynamic X-ray micro-ct with primary batteries (see gifs below) as well as XRD-CT data from dynamic experiments with Li-ion batteries [1, 2].

![alkaline](https://raw.githubusercontent.com/antonyvam/BatteryImagingLibrary/tree/main/assets/alkaline_operando.gif)

![LiFeS2](https://raw.githubusercontent.com/antonyvam/BatteryImagingLibrary/tree/main/assets/lifes2_operando.gif)

## Included Tutorials

The repository includes several **example notebooks** to help users learn the API and workflows:


| Notebook Filename | Topic |
|------------------|--------|
| [`neutron_ct.ipynb`](https://github.com/antonyvam/BatteryImagingLibrary/blob/master/notebooks/neutron_ct.ipynb) | Reconstructing neutron-ct data from raw radiographs |


Each notebook is designed to be **standalone and executable**, with detailed inline comments and example outputs.

## Installation Instructions

The `BIL` notebooks depend on three main libraries: `ImageD11`, `CIL` and `nDTomo`. `ImageD11` is used to handle the S3DXRD data, `CIL` is used for the reconstruction of the laboratory cone beam CT data and `nDTomo` is used for the data handling of the XRD-CT, neutron-CT and parallel-beam CT and SEM/EDX/EBSD data.


To make your life easier, please install [Anaconda](https://www.anaconda.com/products/distribution). The `ImageD11`, `CIL` and `nDTomo` libraries and all associated code can be installed by following the next steps:

### 1. Install CIL with TIGRE and astra-toolbox

Create a new environment and first install astra-toolbox:

```bash
conda create --name bil python=3.11
conda activate bil
conda install -c astra-toolbox -c nvidia -c conda-forge -c https://software.repos.intel.com/python/conda -c ccpi astra-toolbox cil ti
```

### 2. Install nDTomo from GitHub

You can choose one of the following options to install the nDTomo library:

#### a. To install using pip:

```bash
pip install nDTomo
```

#### b. To install using Git:

```bash
pip install git+https://github.com/antonyvam/nDTomo.git
```
For development work (editable install):

```bash
git clone https://github.com/antonyvam/nDTomo.git && cd nDTomo
pip install -e .
```

#### c. For local installation after downloading the repo:

Navigate to where the `setup.py` file is located and run:

```bash
pip install --user .
```

or:

```bash
python3 setup.py install --user
```

### 3. Install PyTorch

The neural networks, as well as any GPU-based code, used in `nDTomo` require Pytorch which can be installed through pip.

For example, for Windows/Linux with CUDA 11.8:

```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

## 4. Install ImageD11

`ImageD11` can be installed through pip:

```bash
pip install ImageD11
```

Please visit ImageD11's github repo for alternative installation instructions  https://github.com/FABLE-3DXRD/ImageD11/tree/master

## Citation

If you use parts of the code, please cite the work using the following:

*Battery Imaging Library: Democratising multi-length scale and
multi-modal synchrotron and laboratory battery imaging data*, R. Docherty et al., 2025

## References

[1] "Cycling Rate-Induced Spatially-Resolved Heterogeneities in Commercial Cylindrical Li-Ion Batteries", A. Vamvakeros, D. Matras, T.E. Ashton, A.A. Coelho, H. Dong, D. Bauer, Y. Odarchenko, S.W.T. Price, K.T. Butler, O. Gutowski, A.-C. Dippel, M. von Zimmerman, J.A. Darr, S.D.M. Jacques, A.M. Beale, Small Methods, 2100512, 2021. https://doi.org/10.1002/smtd.202100512

[2] "Emerging chemical heterogeneities in a commercial 18650 NCA Li-ion battery during early cycling revealed by synchrotron X-ray diffraction tomography", D. Matras, T.E. Ashton, H. Dong, M. Mirolo, I. Martens, J. Drnec, J.A. Darr, P.D. Quinn, S.D.M. Jacques, A.M. Beale, A. Vamvakeros, Journal of Power Sources 539, 231589, 2022, https://doi.org/10.1016/j.jpowsour.2022.231589

## Previous technical work (reverse chronological order)

[1] "nDTomo: A Modular Python Toolkit for X-ray Chemical Imaging and Tomography", A. Vamvakeros, E. Papoutsellis, H. Dong, R. Docherty, A.M. Beale, S.J. Cooper, S.D.M. Jacques, Digital Discovery, 2025, https://doi.org/10.1039/D5DD00252D

[2] "Obtaining parallax-free X-ray powder diffraction computed tomography data with a self-supervised neural network", H. Dong, S.D.M. Jacques, K.T. Butler, O. Gutowski, A.-C. Dippel, M. von Zimmerman, A.M. Beale, A. Vamvakeros, npj Computational Materials 10 (1), 201, 2024, https://doi.org/10.1038/s41524-024-01389-1

[3] "SAMBA: A Trainable Segmentation Web-App with Smart Labelling", R. Docherty, I. Squires, A. Vamvakeros, S.J. Cooper, Journal of Open Source Software 9 (98), 6159, 2024, https://doi.org/10.21105/joss.06159

[4] "A scalable neural network architecture for self-supervised tomographic image reconstruction", H. Dong, S.D.M. Jacques, W. Kockelmann, S.W.T. Price, R. Emberson, D. Matras, Y. Odarchenko, V. Middelkoop, A. Giokaris, O. Gutowski, A.-C. Dippel, M. von Zimmermann, A.M. Beale, K.T. Butler, A. Vamvakeros, Digital Discovery, 2 (4), 967-980, 2023, https://doi.org/10.1039/D2DD00105E

[5] "A deep convolutional neural network for real-time full profile analysis of big powder diffraction data", H. Dong, K.T. Butler, D. Matras, S.W.T. Price, Y. Odarchenko, R. Khatry, A. Thompson, V. Middelkoop, S.D.M. Jacques, A.M. Beale, A. Vamvakeros, npj Computational Materials 7 (1), 74, 2021, https://doi.org/10.1038/s41524-021-00542-4

[6] "DLSR: a solution to the parallax artefact in X-ray diffraction computed tomography data", A. Vamvakeros, A.A. Coelho, D. Matras, H. Dong, Y. Odarchenko, S.W.T. Price, K.T. Butler, O. Gutowski, A.-C. Dippel, M. von Zimmermann, I. Martens, J. Drnec, A.M. Beale, S.D.M. Jacques, Journal of Applied Crystallography 53 (6), 1531-1541, https://doi.org/10.1107/S1600576720013576

[7] "5D operando tomographic diffraction imaging of a catalyst bed", A. Vamvakeros, S.D.M. Jacques, M. Di Michiel, D. Matras, V. Middelkoop, I.Z. Ismagilov, E.V. Matus, V.V. Kuznetsov, J. Drnec, P. Senecal, A.M. Beale, Nature communications 9 (1), 4751, 2018, https://doi.org/10.1038/s41467-018-07046-8

[8] "Interlaced X-ray diffraction computed tomography", A. Vamvakeros, S.D.M. Jacques, M. Di Michiel, P. Senecal, V. Middelkoop, R.J. Cernik and A.M. Beale, Journal of Applied Crystallography 49 (2), 485-496, 2016, https://doi.org/10.1107/S160057671600131X

[9] "Removing multiple outliers and single-crystal artefacts from X-ray diffraction computed tomography data", A. Vamvakeros, S.D.M. Jacques, M. Di Michiel, V. Middelkoop, C.K. Egan, R. J. Cernik, A. M Beale, Journal of Applied Crystallography 48 (6), 1943-1955, 2015, 
Jacques, Journal of Applied Crystallography 48 (6), 1943-1955, 2015, https://doi.org/10.1107/S1600576715020701
