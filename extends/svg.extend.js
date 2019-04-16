const path = require('path')

module.exports = function(config) {
  config.module.rules.delete('svg')

  config.module
    .rule('svg')
    .test(/\.svg$/)
    .include.add(path.join(__dirname, '..', 'src/assets/icons'))
    .end()
    .use('svg-sprite')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]'
    })
}
