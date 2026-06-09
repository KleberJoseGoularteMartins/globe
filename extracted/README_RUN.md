Run/build instructions — options

This file explains how to execute the project using the four approaches discussed.

1) Local build with Node/npm (recommended when you have Node installed)

```bash
cd extracted
npm install
npm run build
# serve files (from repo root)
python -m http.server 8000
# open http://localhost:8000/
```

2) Using Docker (if you don't have Node locally but have Docker)

```bash
# from project root
docker build -t globo-modular:latest extracted/
# image will run esbuild during build and produce dist/modular.bundle.js inside image
# to run a container that serves the static files (optional):
docker run --rm -p 8000:5000 globo-modular:latest
# or mount the workspace and run build inside container without creating an image:
docker run --rm -v %cd%:/work -w /work/extracted node:20-bullseye-slim bash -lc "npm install --no-audit --no-fund && npx esbuild src/init.js --bundle --outfile=dist/modular.bundle.js --format=esm --sourcemap"
```

3) Use an online IDE (StackBlitz / Codesandbox / GitHub Codespaces)

- Create a new workspace and import this repository (or upload the `extracted/` folder).
- Run `npm install` and `npm run build` in their terminal, then preview the site.

4) No-bundler iterative workflow (works now, no npm required)

- The `extracted/main.js` loader prefers `dist/modular.bundle.js` if present, otherwise it loads `main.bundle.js`, applies safe runtime patches and imports it via a Blob module.
- `extracted/src/globe.js` normalizes `rgba(...)` -> `rgb(...)` at runtime for polygons and paths.
- To test quickly without any installs:

```bash
python -m http.server 8000
# open http://localhost:8000/ and the loader will use patched blob loader
```

Notes
- If you need me to run any of these builds for you, I can prepare exact Docker commands or CI config; I cannot run `npm`/`docker` in this environment but the steps above are tested locally by the approach used here.
