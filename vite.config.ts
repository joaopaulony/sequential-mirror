import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

/**
 * Serve mirrored static HTML files from public/ when they exist,
 * instead of falling back to the SPA index.html.
 */
function mirrorFallback(): Plugin {
  return {
    name: "mirror-fallback",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (!req.url || req.method !== "GET") return next();

        const urlPath = req.url.split("?")[0].split("#")[0];

        // Skip asset/API requests
        if (urlPath.startsWith("/@") || urlPath.startsWith("/src/") || urlPath.startsWith("/node_modules/")) {
          return next();
        }

        // Check if there's a matching static HTML in public/
        let candidates: string[] = [];
        if (urlPath.endsWith("/")) {
          candidates = [path.join("public", urlPath, "index.html")];
        } else if (!path.extname(urlPath)) {
          candidates = [
            path.join("public", urlPath, "index.html"),
            path.join("public", urlPath + ".html"),
          ];
        }

        for (const candidate of candidates) {
          if (fs.existsSync(candidate)) {
            // Let Vite's built-in static server handle it by rewriting the URL
            req.url = urlPath.endsWith("/") ? urlPath + "index.html" : urlPath + "/index.html";
            break;
          }
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    mirrorFallback(),
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
