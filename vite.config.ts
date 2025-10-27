import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
  server: {
    port: 4173, // 🔹 укажи здесь свой порт
    open: true, // опционально — автоматически открывать браузер
  },
})
