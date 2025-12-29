// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  alias: {
    assets: "/<rootDir>/assets",
    '~': resolve(__dirname, './'),
  },
  css: ['@/assets/css/main.css'],
  modules: ['@pinia/nuxt', '@primevue/nuxt-module'],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3000/api',
    },
  },
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  // pinia: {
  //   autoImports: ['defineStore'],
  // },
})
