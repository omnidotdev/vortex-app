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
    port: Number(process.env.PORT) || 3000,
    strictPort: true,
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
      // Security and cache response headers applied to every production response
      routeRules: {
        "/**": {
          headers: {
            "Permissions-Policy": "geolocation=(), camera=(), microphone=()",
            // Revalidate rather than serve stale; hashed assets 304 cheaply
            "Cache-Control": "public, max-age=0, must-revalidate",
          },
        },
      },
    }),
  ],
}));

export default viteConfig;
