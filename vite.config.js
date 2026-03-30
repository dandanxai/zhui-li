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
  }
})