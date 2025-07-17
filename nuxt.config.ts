// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/',
  },
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  
  // Optimize for production
  nitro: {
    preset: 'netlify'
  },
  
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
  ],

  fonts: {
    families: [
      {
        name: "Roboto",
        provider: "google",
      },
    ],
    defaults: {
      fallbacks: {
        serif: ["Times New Roman"],
        "sans-serif": ["Arial"],
        monospace: ["Courier New"],
      },
      weights: [400, 500, 600, 700],
      styles: ["normal", "italic"],
      subsets: ["latin", "latin-ext"],
    },
  },

  icon: {
    class: "nuxt-icon",
  },

  runtimeConfig: {
    // Variables privadas disponibles solo en el servidor
    MONGODB_URI: process.env.MONGODB_URI,
    public: {
      apiBase: process.env.API_BASE || "http://localhost:3000",
    },
  },

  css: ["~/assets/css/main.css"],
});