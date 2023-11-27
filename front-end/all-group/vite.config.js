import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{ host: 'localhost', port: 3000 },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        person: resolve(__dirname, 'person.html'),
        group: resolve(__dirname, 'group.html'),
      },
    },
  },
})
