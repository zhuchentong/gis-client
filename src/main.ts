import Vue from 'vue'
import router from './router'
import store from './store'
import Application from './core/application'

// 添加基础样式
import 'normalize-css/normalize.css'
import '~/assets/styles/default.less'
import '~/assets/styles/layout.less'
import '~/assets/styles/common.less'
import '~/assets/styles/theme.less'
import 'cesium/Widgets/widgets.css'
// import '@zct1989/vue-component/dist/index.css'

// 添加扩展模块
import libs from '~/extension/libs'
import filters from '~/extension/filters'
import directives from '~/extension/directives'
import provides from '~/extension/provides'
import plugins from '~/extension/plugins'
import { boot, launch } from '~/extension/boots'

Vue.config.productionTip = false

// 安装扩展插件
libs.install()

// 系统初始化逻辑
boot()

// 初始化应用
new Application({
  router,
  store,
  // 业务数据初始化
  launch,
  bootstrap: {
    provides,
    plugins,
    directives,
    filters
  }
})
