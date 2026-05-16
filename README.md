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

Or run `tilt up` from the [metarepo](https://github.com/omnidotdev/vortex).

## Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server |
| `bun build` | Build for production |
| `bun test` | Run unit tests |
| `bun test:watch` | Run tests in watch mode |
| `bun test:coverage` | Run tests with coverage |
| `bun test:e2e` | Run Playwright E2E tests |
| `bun test:e2e:ui` | Run E2E tests with UI |
| `bun lint` | Lint with Biome |
| `bun format` | Format with Biome |

## Documentation

For detailed documentation, visit [omni.dev/grid/vortex](https://omni.dev/grid/vortex).

## License

The code in this repository is licensed under Apache 2.0, &copy; [Omni LLC](https://omni.dev). See [LICENSE.md](LICENSE.md) for more information.
