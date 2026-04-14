import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Constants
const BACKEND_PROD = "https://forsthaus-monitor-backend.kuehlchristian.workers.dev";
const BACKEND_LOCAL = 'http://localhost:3000';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Determine proxy target based on mode
  const proxyTarget = mode === 'remote' ? BACKEND_PROD : BACKEND_LOCAL;

  return {
    plugins: [react()],
    base: "/forsthaus-monitor-frontend/",
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              // Remove problematic headers that might leak the real origin
              proxyReq.removeHeader('origin');
              proxyReq.removeHeader('referer');
            });
          }
        }
      }
    }
  }
})
