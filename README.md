<div align="center">

# 🌪️ Vortex App

Visual workflow editor for Vortex

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE.md)

</div>

## Overview

Vortex App is the web frontend for [Vortex](https://github.com/omnidotdev/vortex), Omni's workflow automation platform. It provides a drag-and-drop visual editor powered by ReactFlow, with 141 node types across 15 categories (HTTP, AI, Communication, Flow, Transform, and more). Built with TanStack Start, React 19, and Tailwind.

## Features

- **Visual Editor** - ReactFlow-based canvas with zoom, pan, snap-to-grid, and node search
- **Node Catalog** - 141 nodes across Triggers, Flow, Transform, HTTP, AI, Communication, Developer, Productivity, Marketing, Commerce, and more
- **Templates** - Pre-built workflows for common patterns (API fetching, webhook routing, Discord notifications)
- **Execution History** - Real-time run status, step-level logs, retry/replay controls
- **Monitoring** - Execution stats, success rates, top errors, and plan limits
- **Workspace Management** - Multi-org support with role-based access via Warden

## Local Development

First, `cp .env.local.template .env.local` and fill in the values.

Install dependencies:

```sh
bun install
```

Run the dev server:

```sh
bun run dev
```

The app will be available at `http://localhost:3000`.

## Testing

End-to-end tests run against production using Playwright:

```sh
bun test:e2e          # Run all e2e tests
bun test:e2e:ui       # Interactive UI mode
bun test:e2e:headed   # Watch tests run in a browser
```

## License

The code in this repository is licensed under Apache 2.0, &copy; [Omni LLC](https://omni.dev). See [LICENSE.md](LICENSE.md) for more information.
