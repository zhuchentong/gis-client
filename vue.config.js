// vue.config.js
const path = require('path')
const webpack = require('webpack')

const aliasExtned = require('./extends/alias.extend')
const routeExtend = require('./extends/route.extend')
const cesiumExtend = require('./extends/cesium.extend')
const svgExtend = require('./extends/svg.extend')

module.exports = {
  // 修改webpack配置
  chainWebpack: config => {
    // 别名扩展
    aliasExtned(config)
    // 路由扩展
    routeExtend(config)
    // svg扩展
    svgExtend(config)
    // cesium扩展
    cesiumExtend(config)
  },
  configureWebpack: {
    module: {
      unknownContextCritical: false
    },
    optimization: {
      minimize: false
    }
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        // appId: "com.fintecher.gismap",
        productName: '多规合一综合信息平台',
        win: {
          icon: 'build/icon.ico'
        },
        mac: {
          icon: 'build/icon.icns'
        }
      }
    }
  }
  // devServer: {
  //   proxy: {
  //     // proxy all requests starting with /api to jsonplaceholder
  //     '/geoserver': {
  //       target: 'http://192.168.3.5:8080', //设置你调用的接口域名和端口号 别忘了加http
  //       changeOrigin: true,
  //       pathRewrite: {
  //         // '^/geoserver': ''    //代理的路径
  //       }
  //     }
  //   }
  // }
}
