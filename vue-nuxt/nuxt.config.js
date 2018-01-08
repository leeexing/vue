module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'vue-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'learn ssr in order to reset project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['vue-beauty']
  },
  vender:[
    'vue-beauty'
  ],
  babel: {
    "plugins": [["component", [
      {
        "libraryName": "vue-beauty",
        "styleLibraryName": "theme-default"
      },
      'transform-async-to-generator',
      'transform-runtime'
    ]]],
    comments: true
  },
  plugins: [
    { src: '~plugins/beauty-ui', ssr: true}
  ],
  css: [
    'vue-beauty/package/style/vue-beauty.min.css'
  ]
}
