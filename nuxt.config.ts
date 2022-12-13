// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    '~/assets/style/main.scss'
  ],
  // These variables are meant to be exposed on the client
  publicRuntimeConfig: {
    USE_FIREBASE_EMULATORS: process.env.VUE_APP_USE_FIREBASE_EMULATORS,

    FIREBASE_API_KEY: process.env.VUE_APP_FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.VUE_APP_FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
  }
})
