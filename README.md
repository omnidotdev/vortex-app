<div align="center">

# Vortex App

Visual workflow editor for Vortex

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE.md)

</div>

## Overview

Vortex App is the web frontend for [Vortex](https://github.com/omnidotdev/vortex), Omni's workflow automation platform. It provides a drag-and-drop visual editor powered by ReactFlow for building and monitoring workflows. Built with TanStack Start, React 19, and Tailwind.

## Features

- **Visual Editor** - ReactFlow-based canvas with zoom, pan, snap-to-grid, and node search
- **Node Catalog** - Nodes across Triggers, Flow, Transform, HTTP, AI, Communication, Developer, Productivity, Marketing, Commerce, and more
- **Templates** - Pre-built workflows for common patterns
- **Execution History** - Real-time run status, step-level logs, retry/replay controls
- **Monitoring** - Execution stats, success rates, top errors, and plan limits
- **Workspace Management** - Multi-org support with role-based access via Warden

## Local Development

First, `cp .env.local.template .env.local` and fill in the values.

### Building and Running

Run `tilt up`, or:

```sh
bun i
bun dev
```

## Testing

### Unit Tests

```sh
bun test

# or in watch mode
bun test:watch

# or test with coverage reporting
bun test:coverage
```

### E2E Tests

```sh
# first, ensure Playwright browsers are installed
bunx playwright install

# run E2E tests
bun test:e2e

# or run with UI
bun test:e2e:ui
```

## Documentation

- [Vortex Docs](https://docs.omni.dev/core/vortex)

## License

The code in this repository is licensed under Apache 2.0, &copy; [Omni LLC](https://omni.dev). See [LICENSE.md](LICENSE.md) for more information.
