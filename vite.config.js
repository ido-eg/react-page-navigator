import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        lib: {
            entry: resolve(__dirname, "lib/index.js"),
            fileName: "index",
            formats: ["es"],
        },
        rollupOptions: {
            external: ["react"],
        },
    },
});
