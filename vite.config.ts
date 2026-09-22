import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    alias: {
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@utils': path.resolve(import.meta.dirname, './src/utils'),
      '@data': path.resolve(import.meta.dirname, './src/data'),
      '@types': path.resolve(import.meta.dirname, './src/types'),
      '@services': path.resolve(import.meta.dirname, './src/services'),
      '@pages': path.resolve(import.meta.dirname, './src/pages'),
      '@hooks': path.resolve(import.meta.dirname, './src/hooks'),
    },
  },
});
