import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: 'static'
    // outDir: 'dist', // Replace 'dist' with the desired subfolder name
  },
  // server: {
  //   watch: {
  //     usePolling: true,
  //   },
  //   // host: '0.0.0.0', // needed for the Docker Container port mapping to work
  //   strictPort: true,
  //   port: 3000, // you can replace this port with any port
  // },
})
