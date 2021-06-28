import { transports } from 'winston'
import routes from './services/get-routes-to-generate'

const config = {
  generate: { routes },
  target: process.env.SSR_ENABLED === 'true' ? 'server' : 'static',
  publicRuntimeConfig: {
    languageSwitchEnabled: process.env.LANGUAGE_SWITCH_ENABLED || false,
    orgDomain: process.env.DOMAIN_ORG || 'pix.org',
  },
  server: {
    port: process.env.PORT || 5000,
  },
  env: {
    isPixSite: process.env.SITE === 'pix-site',
    isPixPro: process.env.SITE === 'pix-pro',
  },
  dir: {
    pages: `pages/${process.env.SITE}`,
  },
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'fr',
    },
    title: 'Pix - Cultivez vos compétences numériques',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Pix est le service public en ligne pour évaluer, développer et certifier ses compétences numériques tout au long de la vie.',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Roboto:wght@400;500;600&display=swap',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Shared CSS
   */
  css: ['assets/scss/shared.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/components.js',
    '~/plugins/meta.js',
    { src: '~plugins/slide-menu', ssr: false },
    '~plugins/vue-js-modal',
    { src: '~/plugins/prismicLinks', ssr: false },
  ],
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    ['@nuxtjs/eslint-module', { fix: true }],
    [
      '~/modules/assets-extractor',
      {
        hostnames: [
          'images.prismic.io',
          'prismic-io.s3.amazonaws.com',
          'storage.gra.cloud.ovh.net',
          'pix-site.cdn.prismic.io',
        ],
        extensions: ['jpg', 'jpeg', 'gif', 'png', 'webp', 'svg', 'mp4', 'pdf'],
      },
    ],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    ['nuxt-i18n', { detectBrowserLanguage: false }],
    '@nuxtjs/moment',
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: [
              'faAngleDown',
              'faAngleUp',
              'faArrowRight',
              'faCalendar',
              'faCheck',
              'faCircle',
              'faCog',
              'faExclamationTriangle',
              'faHome',
              'faPlayCircle',
            ],
          },
        ],
      },
    ],
    [
      'nuxt-winston-log',
      {
        loggerOptions: {
          level: 'debug',
          transports: [new transports.Console()],
        },
      },
    ],
    '@nuxtjs/prismic',
  ],
  moment: {
    locales: ['fr'],
  },
  styleResources: {
    scss: ['assets/scss/globals.scss'],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  i18n: {
    defaultLocale: 'fr-fr',
    locales:
      process.env.SITE === 'pix-pro'
        ? [
            {
              code: 'fr-fr',
              file: 'fr-fr.js',
            },
          ]
        : [
            {
              code: 'fr-fr',
              file: 'fr-fr.js',
            },
            {
              code: 'fr',
              file: 'fr.js',
            },
            {
              code: 'en-gb',
              file: 'en-gb.js',
            },
          ],
    lazy: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'fr-fr',
    },
  },
  prismic: {
    endpoint: process.env.PRISMIC_API_ENDPOINT,
    linkResolver: '@/plugins/link-resolver',
    htmlSerializer: '@/plugins/html-serializer',
    preview: process.env.SSR_ENABLED === 'true',
  },
  router: {
    middleware: 'current-page-path',
    linkExactActiveClass: 'current-active-link',
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
    },
    postcss: {
      plugins: {
        'postcss-url': false,
      },
      preset: {
        autoprefixer: {
          grid: 'autoplace',
        },
        browsers: ['last 2 versions', 'ie 11'],
      },
    },
  },
}

if (process.env.MATOMO_URL) {
  config.modules.push([
    'nuxt-matomo',
    { matomoUrl: process.env.MATOMO_URL, siteId: 1 },
  ])
}

export default config
