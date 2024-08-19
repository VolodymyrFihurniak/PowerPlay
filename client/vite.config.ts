import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0",
        proxy: {
            "/api": {
                target: "https://localhost:4000",
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@routes": path.resolve(__dirname, "./src/routes"),
            "@docs": path.resolve(__dirname, "./src/docs"),
            "@controllers": path.resolve(__dirname, "./src/controllers"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@dtos": path.resolve(__dirname, "./src/dtos"),
            "@entities": path.resolve(__dirname, "./src/entities"),
            "@middlewares": path.resolve(__dirname, "./src/middlewares"),
            "@repositories": path.resolve(__dirname, "./src/repositories"),
            "@plugins": path.resolve(__dirname, "./src/plugins"),
            "@errors": path.resolve(__dirname, "./src/errors"),
            "@interfaces": path.resolve(__dirname, "./src/interfaces"),
            "@services": path.resolve(__dirname, "./src/services"),
            "@extensions": path.resolve(__dirname, "./src/extensions"),
            "@http": path.resolve(__dirname, "./src/http"),
            "@models": path.resolve(__dirname, "./src/models"),
            "@components": path.resolve(__dirname, "./src/components"),
        },
    },
});
