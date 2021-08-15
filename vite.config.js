import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import path from 'path'

svgLoader({
  svgoConfig: {
    multipass: true
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  server: {
    fs: {
      allow: ['..'],
      strict: false
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  }
})
