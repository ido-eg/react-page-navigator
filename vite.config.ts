import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        dts({ include: ["src"] })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "ReactPageNavigator",
            fileName: (format) => `index.${format}.js`,
            formats: ["es", "umd"],
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM"
                }
            }
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./tests/setup.ts",
    }
});
