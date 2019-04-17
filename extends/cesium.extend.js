const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function(config) {
  const cesiumSource = 'node_modules/cesium/Source'
  const cesiumWorkers = '../Build/Cesium/Workers'

  config.plugin('copy_workers').use(CopyWebpackPlugin, [
    [
      {
        from: path.join(cesiumSource, cesiumWorkers),
        to: 'Workers'
      }
    ]
  ])

  config.plugin('copy_assets').use(CopyWebpackPlugin, [
    [
      {
        from: path.join(cesiumSource, 'Assets'),
        to: 'Assets'
      }
    ]
  ])

  config.plugin('copy_widgets').use(CopyWebpackPlugin, [
    [
      {
        from: path.join(cesiumSource, 'Widgets'),
        to: 'Widgets'
      }
    ]
  ])

  config.resolve.alias.set(
    'cesium',
    path.resolve(__dirname, '..', cesiumSource)
  )

  // 添加CESIUM根目录
  config.plugin('define').tap(define => {
    let defineConfig = define[0]
    defineConfig['CESIUM_BASE_URL'] = JSON.stringify('/')
    return define
  })
}
