import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.BUCKET_ACCESS_KEY_ID': JSON.stringify(process.env.BUCKET_ACCESS_KEY_ID),
    'process.env.BUCKET_SECRET_ACCESS_KEY': JSON.stringify(process.env.BUCKET_SECRET_ACCESS_KEY),
    'process.env.BUCKET_NAME': JSON.stringify(process.env.BUCKET_NAME),
    'process.env.BUCKET_ENDPOINT_URL': JSON.stringify(process.env.BUCKET_ENDPOINT_URL),
    'process.env.BUCKET_REGION': JSON.stringify(process.env.BUCKET_REGION),
    'process.env.RUNPOD_API_TOKEN': JSON.stringify(process.env.RUNPOD_API_TOKEN),
    'process.env.RUNPOD_API_ENDPOINT': JSON.stringify(process.env.RUNPOD_API_ENDPOINT),
  },
  server: { hmr: true },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
});
