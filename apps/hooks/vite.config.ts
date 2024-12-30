import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'dotoli-hooks',
      formats: ['cjs', 'es'],
      fileName: (format) => `dotoli-hooks.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
});
