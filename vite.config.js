import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,   //  Esto permite acceder desde la red (192.168.x.x)
    port: 5173,   //  Puerto del frontend
  },
});
