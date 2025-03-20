import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist' // 確保 build 後的靜態檔案放在 dist/
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3030' // 本機開發時，讓 API 請求轉發到後端
    }
  }
});
