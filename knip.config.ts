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
  ],
  // NB: files are reported as unused if they are in the set of project files, but not in the set of files resolved from the entry files. See: https://knip.dev/guides/configuring-project-files
  project: ["src/**/*.{ts,tsx,css}"],
  // NB: Modified from the default GraphQL Codegen configuration, see: https://knip.dev/reference/plugins/graphql-codegen
  "graphql-codegen": {
    config: ["package.json", "src/lib/graphql/codegen.config.ts"],
  },
  // used for proper management of Thornberry components, see https://knip.dev/reference/configuration#ignoreexportsusedinfile
  ignoreExportsUsedInFile: true,
  ignore: [
    "src/generated/**",
    "src/routeTree.gen.ts",
    // UI component library (may not all be used yet)
    "src/components/ui/**",
    // Standalone components not yet integrated
    "src/components/AppWrapper.tsx",
    "src/components/LandingPage.tsx",
    "src/components/UserProfile.tsx",
    "src/components/WorkflowApp.tsx",
    "src/components/WorkflowList.tsx",
    "src/contexts/AuthContext.tsx",
    "src/hooks/use-toast.ts",
    // Auth utilities
    "src/lib/auth/**",
    // Sample data and workflow utilities
    "src/lib/sample-workflows.ts",
    "src/lib/workflow/**",
    "src/lib/db/workflow-store.ts",
    // Temporal workers (run separately)
    "src/temporal/**",
    // Unused entry point
    "src/app.tsx",
    // Index files
    "src/components/nodes/index.ts",
    "src/components/workflow/index.ts",
    "src/providers/index.ts",
    // Utility files
    "src/lib/config/app.config.ts",
    "src/lib/config/env.config.ts",
    "src/lib/hooks/store/useDialogStore.ts",
    "src/lib/graphql/getSdk.ts",
    "src/lib/hooks/store/useWorkflowEditorStore.ts",
    "src/lib/options/integrations.options.ts",
    "src/lib/options/plugins.options.ts",
    "src/lib/options/workspace.options.ts",
    "src/lib/query-client.ts",
  ],
  ignoreDependencies: [
    // used by GraphQL Code Generator scripts
    "dotenv",
    // Future use dependencies
    "@tanstack/zod-adapter",
    "date-fns",
    "ms",
    "react-hotkeys-hook",
    "resend",
    "stripe",
    "ts-pattern",
    "usehooks-ts",
    // Radix UI components (used by UI components)
    "@radix-ui/react-dropdown-menu",
  ],
  tags: ["-knipignore"],
};

export default knipConfig;
