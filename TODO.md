# batteryct

## TODO:

### done:

- provision CDN and link to url; upload coming soon
- add 'labels' colum to spreadsheet, reflect in zenodo dropdown
- edit spreadsheet to account for updated JW data strucutre
- fix preview imgs (?)
- modal to submit data (appears when 'contribute pressed')
- react routing:
  - point default to /home
  - point search to /search
  - point each sample to /search/{id}
  - s.t users can share links to specific samples
- refine figure 1
- replace DOIs w citation in spreadsheet
  - kintsugi data:
    - zoom in on secondary particles + particle sep (of zoom)
    - electrode & sep + seg
    - zoom in from paper + seg
- add author field?
- slider:
  For BIL, could the pixel size scale be the following:
  Log scale - done
  Log tick marks - done
  Three fixed tick labels: 1 nm, 1 um, 1 mm - done
  Scale is actually from 0.1 nm to 1 mm - done
  Boxes either end showing exact slider values - done
  Histogram above showing number of entries at each pixel size?
  If a slider is at the end of the range, set the search to includ anything below/above
- modal:
  - display citation information + button to copy + little toast that says 'copied to clipboard'
- Modality dropdown has 'Any' option
- any change of sliders triggers search
- Change Area -> longest side:

  - double slider, px units

- update text:
  ' includes raw, processed and reconstructed data', 500+ billion voxels

- synchotron micro-CT operando GIF and example card

  - order: SEM; EDS; EBSD: Lab-micro CT; neutron-CT; S3XRD; s-mini; s-nano; XRD-CT
  - s3XRD modality as option

- cards all same height
- contributor button;link to zenodo BIL community (6 buttons)
  - contributor modal:
    - imperial, finden, manchester, ucl, southampton,
      DLS, ISIS neturons, ERSF, DESY, UKBIC, WMG, NREL, thermofisher?
- fix smart shuffle
- upload SEM processed data

### doing:

- make dropdowns start from min val
- fix mobile view
- button to jump to top; button to go home

- merge GH
- references in doc
- update deploy of website

- google analytics ?
- bibtex citation copy?

- script:
  - save oriignal image into azure db?
- spreadsheet:
  - add cell geometry?
  - add appscript to VC?

-refactor:

- extract common styles into css, clean up css
- make everything use const fn = () => syntax
