export default defineNuxtConfig({
  modules: ['../src/module'],
  snipcart: {
    templatesUrl: "/snipcart-custom.html",
    publicApiKey: "MTA3ODg5YmMtZTA3ZS00M2QxLWE1N2QtOGI3ZDM5OGNmMGRjNjM3Mjg0MTM0MzA2MjQ2OTg2",
    // loadStrategy: "manual",
    language: "fr"
  },
  css: [
    "~/assets/index.css"
  ]
})
