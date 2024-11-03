import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/tyranasaur/', // Set the base path for GitHub Pages
    plugins: [plugin()],
    server: {
        port: 55168,
    }
})
