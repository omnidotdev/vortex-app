import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import mkcert from "vite-plugin-mkcert";
// import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  server: {
    port: 3000,
    allowedHosts: ["vortex.omni.dev"],
  },
  plugins: [
    // NB: command is `serve` in development, `build` in production
    command === "serve" && mkcert(),
    // tailwindcss(),
    // Enables Vite to resolve imports using path aliases.
    tsconfigPaths(),
    tanstackStart(),
    viteReact(),
  ],
}));
