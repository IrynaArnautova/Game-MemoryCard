
// @ts-ignore
export default defineNuxtConfig({
  // Заголовок додатку
  head: {
    title: 'Memory Game',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Підключення компонентів
  components: true,

  // Папка зі статичними ресурсами
  static: {
    prefix: '/static/'
  },

  // Папка зі стилізацією
  css: [
    '~/assets/css/main.css'
  ],

  // Плагіни
  plugins: [],

  // Завантаження
  loading: '~/components/Loading.vue',

  // Конфігурація роутера
  router: {},

  // Режим розробки
  devtools: { enabled: true }
})
