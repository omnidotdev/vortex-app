/**
 * Application configuration.
 */
const app = {
  name: "Vortex",
  // Product symbol, mirrors the omni-api catalog SSOT (`catalog/products.ts`
  // vortex `icon`). Used in the "Made with <symbol> by Omni" footer credit.
  icon: "🌪️",
  description:
    "A workflow automation platform combining a visual editor, JSON DSL, and TypeScript SDK with pluggable execution backends and 500+ integrations.",
  organization: {
    name: "Omni",
    url: "https://omni.dev",
    website: "https://omni.dev",
    discord: "https://discord.gg/omnidotdev",
    x: "https://x.com/omnidotdev",
    linkedin: "https://www.linkedin.com/company/omnidotdev",
    threads: "https://www.threads.com/@omnidotdev",
  },
  links: {
    docs: "https://docs.omni.dev/grid/vortex",
    github: "https://github.com/omnidotdev/vortex",
    feedback: "https://backfeed.omni.dev/workspaces/omni/projects/vortex",
  },
};

export default app;
