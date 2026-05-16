import type { KnipConfig } from "knip";

/**
 * Knip configuration.
 * @see https://knip.dev/overview/configuration
 */
const knipConfig: KnipConfig = {
  entry: [
    "src/routes/**/*.{ts,tsx}",
    "src/router.tsx",
    "src/lib/graphql/graphqlFetch.ts",
    "src/server/functions/*.ts",
    "src/lib/providers/billing/index.ts",
    "src/lib/workflow/types.ts",
    "src/**/*.test.{ts,tsx}",
  ],
  // NB: files are reported as unused if they are in the set of project files, but not in the set of files resolved from the entry files. See: https://knip.dev/guides/configuring-project-files
  project: ["src/**/*.{ts,tsx}"],
  // NB: Modified from the default GraphQL Codegen configuration, see: https://knip.dev/reference/plugins/graphql-codegen
  "graphql-codegen": {
    config: ["package.json", "src/lib/graphql/codegen.config.ts"],
  },
  // used for proper management of Thornberry components, see https://knip.dev/reference/configuration#ignoreexportsusedinfile
  ignoreExportsUsedInFile: true,
  ignore: ["src/generated/**"],
  ignoreDependencies: [
    // Changeset tooling (invoked via npx/bunx, not imported)
    "@changesets/cli",
    // used by GraphQL Code Generator scripts
    "dotenv",
    // Tailwind v4 CSS imports (resolved by @tailwindcss/vite, not JS)
    "tailwindcss",
    "tw-animate-css",
    // Future use dependencies
    "react-hotkeys-hook",
    "ts-pattern",
  ],
  tags: ["-knipignore"],
};

export default knipConfig;
