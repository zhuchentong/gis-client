const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

/**
 * 获取文件列表
 */
const getPageList = function () {
  let pageList = []
  let walk = function (directory) {
    fs.readdirSync(directory)
      .forEach(function (file) {
        var fullpath = path.join(directory, file);
        var stat = fs.statSync(fullpath);
        var extname = path.extname(fullpath);
        // 修正windows路径符号问题
        fullpath = fullpath.replace(/\\/g, '/')
        if (stat.isFile() && extname === '.vue') {
          let match = fullpath.match(/pages[\/|\\](.*)/)
          if (match && match.length > 1) {
            pageList.push(match[1])
          }
        } else if (stat.isDirectory()) {
          var subdir = path.join(directory, file);
          walk(subdir);
        }
      });
  }

  walk(path.join(__dirname, "..", "src", "pages"))
  return pageList
}

module.exports = function (config) {
  let pages = getPageList()

  // 生成路由数据
  // 暂不考虑嵌套路由
  let routes = pages.map(path => {
    let [target] = path.split('.')
    let target_route = target.split('/')

    // 处理index结尾的文件
    if (target_route[target_route.length - 1] === 'index') {
      target_route.length = target_route.length - 1
    }

    return {
      routePath: `/${target_route.join('/')}`,
      componentPath: path
    }
  })

  // 添加自定义常量插件
  config.plugin('define').tap((define) => {
    let defineConfig = define[0]['process.env']
    defineConfig['ROUTERS'] = JSON.stringify(routes)
    return define
  })
} 