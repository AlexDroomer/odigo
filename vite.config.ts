import { defineConfig } from 'vite';

export default defineConfig({
  base: '/odigo/',
  build: {
    cssMinify: "esbuild",
  },
  css: {
    transformer: 'postcss',
  },
});
