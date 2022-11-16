import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    // viteCompression({
    //   //到达什么样的大小才压缩:100k
    //   // threshold: 102400,
    //   // deleteOriginFile: true,
    // }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 88,
    host: true,
    proxy: {
      "/api": {
        target: "http://1.12.235.76:4080",
        // target: 'http://localhost:4080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ["vue", "vue-router", "pinia", "@vueuse/core"],
          elementPlus: ["element-plus", "@element-plus/icons-vue"],
          other: ["axios"],
        },
      },
    },
  },
  // 静态资源基础路径 base: './' || '',
  // base: process.env.NODE_ENV === 'production' ? './' : '/',
});
