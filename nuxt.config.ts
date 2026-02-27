// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    discogsBaseUrl: process.env.DISCOGS_BASE_URL,
    discogsUserAgent: process.env.DISCOGS_USER_AGENT,
    discogsConsumerKey: process.env.CONSUMER_KEY,
    discogsConsumerSecret: process.env.CONSUMER_SECRET
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  nitro: {
    experimental: {
      tasks: true
    },
    scheduledTasks: {
      '* * * * *': ['scan']
    }
  },

  modules: ['@nuxt/fonts']
})