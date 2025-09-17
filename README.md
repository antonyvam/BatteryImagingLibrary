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

### doing:

- contributor button;link to zenodo BIL community (6 buttons)
  - contributor modal:
    - imperial, finden, manchester, ucl, southampton, DLS, ISIS neturons, ERSF, DESY, UKBIC, WMG, NREL, thermofisher?
- make dropdowns start from min val
- fix smart shuffle

- update deploy of website
- old J thumbnails
- upload SEM data
- google analytics ?
- references in doc?

- read prerpint; update website section (inc dreaft website figure)

- to add:

  - j old data:
    - wide kintsugi attempt + seg
    - high res
  - seg of slice?

- home / back button on search results page
- script:
  - save oriignal image into azure db?
- spreadsheet:

  - add cell geometry?

  - add appscript to VC?
  - app script to ping cross ref given a doi to get full citation and dunk it into json

-refactor:

- extract common styles into css, clean up css
- make everything use const fn = () => syntax

## Old:

- form to submit data:
  - DOI required
  - sends email to us?
  - allows them to add optional metadata fields determined by us
  - conribute button on hero
- 'skyscanner' panel:
  - cut tags down to instrument, scan size and voxel size
  -
- notebook rendering:

  - button on hero?
  - popup modal with series of links
  - there's one script per modality for dataloading - maybe below header?
  - opens new HTML page with notebooks inlined
  - add static html page compilation to script?

- form to submit data:
  - DOI required
  - sends email to us
  - allows them to add optional metadata fields determined by us
- make another sheet on battery ct and add in your headers
- button to show all scans @ top
- thumbnail orthoslices in scan previews
- a scan name in the csv and in the scan table
- range sliders for relevant filter criteria - show N results - maybe floating in LHS
- plot optix script for processing real volumes
- matplotlib script for plotting (paired) line scan and 2D slice rendering for XCT
- multi orthoslices need to go: instead should be a shared video component (two videos, rendered horiz on cpu. vert on mobile with one slider that controls both)
- add (relative) volume path to csv s.t in csv_to_json we can also call processing code (i.e csv_to_json gens everything you need)
- cleanup jsx: add comments, deduplicate
