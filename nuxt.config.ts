// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  alias: {
    assets: "/<rootDir>/assets",
    '~': resolve(__dirname, './'),
  },
  css: ['@/assets/css/main.css'],
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3000/api',
    },
  },
  // pinia: {
  //   autoImports: ['defineStore'],
  // },
})
