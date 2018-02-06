// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'), // 指定 index 打包之后的存放路径
    assetsRoot: path.resolve(__dirname, '../dist'), // 指定webpack的入口文件打包之后的存放地址
    assetsSubDirectory: 'static', // 指定webpack的入口文件打包之后存放地址的子路径
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8090,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/admin': {
      //   target: 'http://localhost:8081',
      //   changeOrigin: true
      // },
      '/user': {
        target: 'http://localhost:8081',
        changeOrigin: true
      },
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
      },
      '/one': {
        target: 'http://211.152.49.184:7001',
        changeOrigin: true
      },
      '/fcgi-bin': {
        target: 'http://s.music.qq.com',
        changeOrigin: true,
        pathRewrite: {
          '^/fcgi-bin': '/fcgi-bin'
        }
      },
      '/music': {
        target: 'http://ws.stream.qqmusic.qq.com',
        changeOrigin: true,
        pathRewrite: {
          '^/music': '/music'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
