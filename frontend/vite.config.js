import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Romel Portfolio",
        short_name: "Romel",
        description: "My Portfolio Website",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        start_url: "/",

        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          }
        ]
      }
    })
  ],

  base: process.env.NODE_ENV === "production" ? "./" : "/",
});