// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  // Add SSR configuration
  ssr: true,
  
  // Add nitro configuration for Netlify
  nitro: {
    preset: 'netlify',
    output: {
      dir: '.output',
      serverDir: '.output/server',
      publicDir: '.output/public'
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  fonts: {
    families: [
      {
        name: 'Roboto',
        provider: 'google',
      }
    ],
    defaults: {
      fallbacks: {
        serif: ['Times New Roman'],
        'sans-serif': ['Arial'],
        monospace: ['Courier New']
      },
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
    }
  },

  icon: {
    //defaultCollection: 'material-symbols', // Si quieres que sea el prefijo por defecto
    // size: '24px', // Tamaño por defecto para los iconos
    class: 'nuxt-icon', // Clase por defecto para los iconos
  },

  runtimeConfig: {
    // Variables privadas disponibles solo en el servidor
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3000',
    },
  },

  css: [
    '~/assets/css/main.css'
  ],

})