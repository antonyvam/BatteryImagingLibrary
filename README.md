# batteryct

## TODO:

### done:

- provision CDN and link to url; upload coming soon
- add 'labels' colum to spreadsheet, reflect in zenodo dropdown
- edit spreadsheet to account for updated JW data strucutre
- fix preview imgs (?)
- modal to submit data (appears when 'contribute pressed')

### doing:

- read prerpint; update website section (inc dreaft website figure)
- refine figure 1

- react routing:
  - point default to /home
  - point search to /search
  - point each sample to /search/{id}
  - s.t users can share links to specific samples
- home / back button on search results page
- smart shuffle of search results:

  - maximise modality diversity
  - maximise sample diversity

- Image size -> Cross Section Area (UNIT^2)

  - mkae the sliders actually work

- modal:
  - related scans dropdown which links to same samples
  - make DOIs buttons work better:
  - display citation information + button to copy + little toast that says 'copied to clipboard'
  - show instrument as well?
  - fix modality badge size
- script:
  - save oriignal image into azure db?
- spreadsheet:
  - add cell geometry?
  - add author field?
  - add appscript to VC?
  - app script to ping cross ref given a doi to get full citation and dunk it into json

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
