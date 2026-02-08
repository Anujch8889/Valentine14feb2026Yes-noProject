import { defineConfig } from 'vite';

export default defineConfig({
    base: './', // Ensures assets are linked relatively
    build: {
        outDir: 'docs', // Build to docs folder for GitHub Pages
    }
});
