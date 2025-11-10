import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const isProduction = process.env.NODE_ENV === "production";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: isProduction
          ? "https://olx-scraper-api.onrender.com"
          : "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
