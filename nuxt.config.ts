export default defineNuxtConfig({
  compatibilityDate: '2026-07-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      articlesApiUrl: 'https://mocki.io/v1/38c57ea8-5688-4a36-9629-8c9616754eb8',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
    },
  },
})
