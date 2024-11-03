import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/tyranasaur/',
    plugins: [plugin()],
    server: {
        port: 55168,
    }
})
