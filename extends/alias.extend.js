const path = require('path')

module.exports = function (config) {
  config.resolve.alias
    .set('~', path.join(__dirname, '..', "src"))
    .set('@', path.join(__dirname, '..', "src"))
} 