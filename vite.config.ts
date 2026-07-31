import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // @ts-expect-error - Known issue with TS excessive stack depth comparing plugin types
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      // In development, proxy /img-proxy/* → photo.yupoo.com/*
      // This makes the browser see Referer: http://localhost:5173, which Yupoo allows.
      "/img-proxy": {
        target: "https://photo.yupoo.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/img-proxy/, ""),
        headers: {
          // Send a Yupoo-whitelisted Referer from the proxy server
          Referer: "https://x.yupoo.com/",
        },
      },
    },
  },
});
