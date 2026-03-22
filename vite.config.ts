import tailwindcss from "@tailwindcss/vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import tsConfigPaths from "vite-tsconfig-paths";

/**
 * Vite configuration.
 * @see https://vite.dev/config
 */
const viteConfig = defineConfig(({ command }) => ({
  server: {
    port: 3222,
    host: "0.0.0.0",
    allowedHosts: ["vortex.omni.dev"],
  },
  plugins: [
    // devtools(),
    // NB: command is `serve` in development, `build` in production
    command === "serve" && mkcert(),
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart(),
    nitroV2Plugin({
      preset: "node-server",
      externals: {
        inline: ["srvx", "react-dom", "better-auth", "@better-auth"],
      },
    }),
  ],
}));

export default viteConfig;
