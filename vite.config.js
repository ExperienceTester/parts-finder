import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "http://api.favorit-parts.ru",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/hs/hsprice"),
        },
      },
    },
  };
});
