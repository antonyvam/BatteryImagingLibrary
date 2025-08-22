# batteryct

## TODO:

- hero banner:
  - collapse (remove copy text and buttons) if searching
  - get resolution slider + unit text working properly
    - correct scale factors applied
    - even when switching
  - modality card:
    - little tags that sit under card when added
- examples cards:
  - card per modality
  - on click, do search with that modality applied
- search results:
  - zod schema for scan data; parse from JSON
  - thumbnail previews:
    - carousel img
      - scale down to fit aspect ratio
    - sample name
    - modality (as tag?)
- modal:
  - same carousel
  - display full info
  - display link data
- spreadsheet:
  - add chemistry?
  - add cell geometry?

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
