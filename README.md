<div align="center">

# Vortex App

Visual workflow editor for Vortex

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE.md)

</div>

Web frontend for [Vortex](https://github.com/omnidotdev/vortex), providing a drag-and-drop visual workflow editor powered by ReactFlow, execution monitoring, and template management. Built with React 19, TanStack Start, and Tailwind CSS.

## Setup

```sh
cp .env.local.template .env.local   # fill in values
bun i
bun dev
```

Or run `tilt up` from the [metarepo](https://github.com/omnidotdev/vortex) to bring up the app alongside its dependencies.

`.env.local.template` documents every variable. Only `VITE_BASE_URL`, `VITE_API_BASE_URL`, `VITE_AUTH_BASE_URL`, and the OAuth client credentials are required; auth, billing, and feature flags degrade gracefully when their vars are unset. Public production URLs are baked from `.env.production` at build time (see [Deployment](#deployment)).

## Run

| Command | Description |
|---------|-------------|
| `bun dev` | Start the dev server (runs GraphQL codegen in watch mode alongside Vite) |
| `bun build` | Build for production |
| `bun start` | Serve the production build from `.output` |
| `bun graphql:generate` | Regenerate typed hooks/SDK from the API schema (requires the Vortex API reachable at `VITE_API_BASE_URL`) |

## Diagnostics

Run these before pushing; CI enforces the same set.

| Command | Description |
|---------|-------------|
| `bun run check` | Biome lint + format check (`--diagnostic-level=error`) |
| `bunx tsc --noEmit` | Type-check |
| `bun knip` | Detect unused files, dependencies, and exports |
| `bun test` | Unit tests |
| `bun run build` | Verify a clean production build |

## Dev commands

| Command | Description |
|---------|-------------|
| `bun format` | Format with Biome (writes changes) |
| `bun lint` | Lint with Biome |
| `bun test:watch` | Unit tests in watch mode |
| `bun test:coverage` | Unit tests with coverage |
| `bun test:e2e` | Playwright E2E tests (`bunx playwright install` first) |
| `bun test:e2e:ui` | E2E tests with the Playwright UI |

## Deployment

The app deploys on Fractal and auto-redeploys on merge to `master`. The `Dockerfile` builds with Bun and serves the Nitro output under Node. Client-side `VITE_` variables are baked from `.env.production` at build time (Vite reads `import.meta.env` in production mode); Docker build ARGs are not used. Keep public production URLs in `.env.production` and never bake secrets.

```sh
docker build -t vortex-app .
docker run -p 3000:3000 vortex-app
```

## Documentation

For detailed documentation, visit [omni.dev/products/vortex](https://omni.dev/products/vortex).

## License

The code in this repository is licensed under Apache 2.0, &copy; [Omni LLC](https://omni.dev). See [LICENSE.md](LICENSE.md) for more information.
