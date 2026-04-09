import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
    // 方式 A：如果安装了 esbuild，保持这个
    cssMinify: 'esbuild',
    
    // 方式 B：如果 A 还是不行，尝试改为 true 让 Vite 自动接管
    // cssMinify: true,
    
    // 额外建议：开启 sourcemap 方便以后调试生产环境问题
    sourcemap: false,
    // 确保资源路径正确
    assetsDir: 'assets',
  },
  server: {
    port: 5173, // 你前端运行的端口
    proxy: {
      // 🏮 匹配请求路径中的 /api
      '/api': {
        // target: 'http://47.99.105.118:9013',
        target: 'http://localhost:8080',
        changeOrigin: true,              // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 将 /api 替换为空，这样发给后端的路径才是正确的
      }
    }
  }
})