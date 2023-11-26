import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.MINIO_ROOT_USER': JSON.stringify(process.env.MINIO_ROOT_USER),
    'process.env.MINIO_ROOT_PASSWORD': JSON.stringify(process.env.MINIO_ROOT_PASSWORD),
    'process.env.MINIO_ACCESS_KEY': JSON.stringify(process.env.MINIO_ACCESS_KEY),
    'process.env.MINIO_SECRET_KEY': JSON.stringify(process.env.MINIO_SECRET_KEY),
    'process.env.MINIO_BUCKET_NAME': JSON.stringify(process.env.MINIO_BUCKET_NAME),
    'process.env.MINIO_SERVER_URL': JSON.stringify(process.env.MINIO_SERVER_URL),
    'process.env.MINIO_REGION': JSON.stringify(process.env.MINIO_REGION),
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
