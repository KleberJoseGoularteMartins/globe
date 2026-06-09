FROM node:20-bullseye-slim
WORKDIR /work
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npx esbuild src/init.js --bundle --outfile=dist/modular.bundle.js --format=esm --sourcemap

# Optional: serve statically (uncomment to run container as a static server)
# RUN npm install -g serve
# CMD ["serve", "-s", ".", "-l", "5000"]
