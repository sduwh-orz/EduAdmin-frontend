const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    open: true,
    port: 8080,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws'
    },
    proxy: {
      // '/user': {
      //   target: 'http://localhost:1145',
      //   changeOrigin: true,
      //   pathReWrite: {
      //     '^/user': ''
      //   },
      //   ws: false
      // },
      // '/picture': {
      //   target: 'http://localhost:1145',
      //   changeOrigin: true,
      //   pathReWrite: {
      //     '^/picture': ''
      //   },
      //   ws: false
      // },
      // '/upload': {
      //   target: 'http://localhost:1145',
      //   changeOrigin: true,
      //   pathReWrite: {
      //     '^/upload': ''
      //   },
      //   ws: false
      // }
      '/api': {
        target: 'http://localhost:1145',
        changeOrigin: true,
        pathReWrite: {
          '^/api': ''
        }
      },
    }
  }
})
