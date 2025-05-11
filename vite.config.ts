import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { splitVendorChunkPlugin } from 'vite'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    compression({
      include: [/\.(js|css|html|svg|json)$/],
      threshold: 1024, // 只有大于1kb的文件才会被压缩
    }),
  ],
  build: {
    // 生产环境下移除console和debugger
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 分割代码块
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
          antd: ['ant-design-vue'],
        },
        // 限制chunk大小
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // 预加载直接引入的模块
    modulePreload: {
      polyfill: true,
    },
    // 生成sourcemap，帮助调试
    sourcemap: false,
    // 优化CSS
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // 4kb以下的资源内联为base64
  },
  server: {
    open: true,
    host: true,
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'ant-design-vue'],
  },
})
