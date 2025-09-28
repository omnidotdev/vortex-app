import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";
// import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    // tailwindcss(),
    // Enables Vite to resolve imports using path aliases.
    tsconfigPaths(),
    tanstackStart({
      srcDirectory: "src", // This is the default
      router: {
        // Specifies the directory TanStack Router uses for your routes.
        routesDirectory: "app", // Defaults to "routes", relative to srcDirectory
      },
    }),
    viteReact(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.ico", "logo.png"],
      workbox: {
        skipWaiting: false,
        clientsClaim: false,
      },
      manifest: {
        name: "Vortex",
        short_name: "Vortex",
        description: "A powerful workflow automation and integration platform",
        theme_color: "#6366f1",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "icon-96.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
