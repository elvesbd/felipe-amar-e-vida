import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar bibliotecas principais
          'react-vendor': ['react', 'react-dom'],
          'date-utils': ['date-fns'],
          'validation': ['zod'],
          'date-picker': ['react-datepicker'],
          'icons': ['lucide-react']
        }
      }
    }
  }
});