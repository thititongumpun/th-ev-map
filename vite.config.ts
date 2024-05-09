import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc'
import million from "million/compiler";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    million.vite({
      auto: {
        threshold: 0.05,
        skip: ["useBadHook", /badVariable/g],
      },
    }),
    react(),
    VitePWA({
      registerType: 'prompt',
      devOptions: {
        enabled: true
      }
    })],
})
