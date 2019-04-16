import VueRouter from 'vue-router'
import { Store } from 'vuex'

/**
 * 初始配置参数接口
 */
export interface IApplicationOption {
  // app: any
  // vue-router实例
  router: VueRouter
  // vuex实例
  store: Store<any>
  // 默认布局
  defaultLayout?: string
  bootstrap: {
    // 依赖注入全局提供器
    provides: (store) => any
    // 注册插件
    plugins: (store) => any
    // 注册过滤器
    filters: (store) => any
    // 注册指令
    directives: (store) => any
  }
  // 启动逻辑，用于实现初始化数据
  launch: ({ store, router }) => Promise<any>
}
