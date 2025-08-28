# batteryct

## TODO:

- Image size -> Cross Section Area (UNIT^2)
- make DOIs buttons work better:
  - app script to ping cross ref given a doi to get full citation and dunk it into json
- modal to submit data (appears when 'contribute pressed')
- home button on search results page

- GIFS:
- EDS: gif of kintsugi (R)
- XRD-CT: gif of channels (R)
- EBSD: gif of N kichucki patterns followed by (post-processed NB jack's is not integer normalised) IPF grain map (LR or HR) (R)
- SEM: gif going through fib sem of volume (A)
- lab XCT: pintype_lowres (A)
  - for now just gif on the website
  - movie: moving down through, rotating camera then volume rendering
- nano, synchotron (A)

- What next:

  - every scan filled in spreadsheet and on zenodo and thumbnails
  - cdn + website upload
  - look over preprint; crack at figure 1; website section

- hero banner:
  - get resolution slider + unit text working properly
    - correct scale factors applied
    - even when switching
- examples cards:
  - card per modality
  - on click, do search with that modality applied
- search results:
  - thumbnail previews:
    - carousel img
      - scale down to fit aspect ratio
    - smallest pixel size in um as well
  - make 'Image size' 'Side length'?
- modal:
  - same carousel
    - display full-res image
  - display full info
  - display link data
  - display citation information + button to copy + little toast that says 'copied to clipboard'
- script:
  - take directory of images:
    - resize down by a quarter, save into assets
    - save oriignal image into azure db; loaded on modal click
- spreadsheet:
  - add cell geometry?
  - add appscript to VC?
- notebook rendering

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
