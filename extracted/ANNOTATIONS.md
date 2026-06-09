ANNOTATIONS

- atmosphereColor("rgba(100, 200, 255, 0.3)")
  - Problem: THREE.Color ignores alpha; converted to `rgb(100,200,255)` by loader.
  - Fix points: `extracted/main.js` performs the replacement at load time.

- polygon colors (cap/side/stroke)
  - Many polygon color callbacks returned `rgba(...)` strings. Those are converted to `rgb(...)` at load time.
  - If you need alpha for polygon visibility, change the globe/three-globe options to use opacity values on materials instead of rgba alpha.

- path color arrays (voyages)
  - Arrays like `["rgba(...,0)", "rgba(...,0.85)", "rgba(...,0)"]` were converted to `rgb(...)` equivalents.
  - If path rendering needs alpha for gradient effects, consider post-processing or custom shaders.

- GeoJSON (Brazil states)
  - The original remote URL returned 404 during testing. A local placeholder `extracted/br_states.geojson` was added.
  - To restore full state polygons, replace `extracted/br_states.geojson` with a real GeoJSON file and keep the filename.

Notes about editing
- The project loads the compiled bundle (`main.bundle.js`) and applies text patches at runtime via `extracted/main.js`.
- For more invasive edits (splitting into modules), work from `globo-interativo-beautified.js` or `extracted/main.bundle.js` as the source, then replace the bundle used by `main.js`.

If you want, I can:
- fetch and install a real BR states GeoJSON into `extracted/br_states.geojson` (please confirm source),
- or proceed to split the beautified bundle into smaller logical files for easier editing.
