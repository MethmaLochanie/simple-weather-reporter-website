import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss()

  ],
  server: {
    host: true,       // 👈 Accept external connections (needed for Docker)
    port: 3000        // 👈 Make it consistent for browser access
  }
});
