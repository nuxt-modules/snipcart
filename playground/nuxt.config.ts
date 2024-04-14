export default defineNuxtConfig({
  modules: ['../src/module'],
  snipcart: {
    templatesUrl: '/snipcart-custom.html',
    publicApiKey: 'MTA3ODg5YmMtZTA3ZS00M2QxLWE1N2QtOGI3ZDM5OGNmMGRjNjM3Mjg0MTM0MzA2MjQ2OTg2',
    language: 'en',
    modalStyle: 'side',
    subscription: true,
    // loadStrategy: "manual",
    translations: {
      en: {
        actions: {
          continue_shopping: 'Go back to your awesome store',
        },
      },
      fr: {
        actions: {
          continue_shopping: 'Revenir a votre magnifique magasin',
        },
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: { config: './playground/tailwind.config.js' },
      autoprefixer: {},
    },
  },
  app: {
    head: {
      script: [
        { src: 'https://cdn.tailwindcss.com' },
      ],
    },
  },
  css: [
    '~/assets/index.css',
  ],
})
