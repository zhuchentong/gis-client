import VueRouter from 'vue-router'

export class ApplicationRouter {
  /**
   * 注册路由守卫
   * @param guards
   */
  public static registerGuard(guards) {
    ApplicationRouter.guards = [...ApplicationRouter.guards, ...guards]
  }

  private static guards: any[] = []
  private store
  private router: VueRouter
  private launch
  private applicationStore

  /**
   * 构造函数
   * @param router
   * @param store
   * @param launch
   */
  constructor({ router, store, launch }, applicationStore) {
    // 系统存储
    this.applicationStore = applicationStore
    // 应用存储
    this.store = store
    this.router = router
    this.launch = launch

    // 注册路由守卫
    this.router.beforeEach(this.routerBeforeEach.bind(this))
    this.router.beforeResolve(this.routerBeforeResolve.bind(this))
    this.router.afterEach(this.routerAfterEach.bind(this))

    // 添加自动路由
    this.importAutoRoutes()
  }

  /**
   * 前置路由守卫
   * 负责系统初始化检测
   * 负责登陆认证检测
   */
  private async routerBeforeEach(to, from, next) {
    if (this.applicationStore.state.ready !== true && this.launch) {
      await this.launch({
        store: this.store,
        router: this.router
      })
    }

    next()
  }

  /**
   * 前置路由解析守卫
   */
  private async routerBeforeResolve(to, from, next) {
    const guards = ApplicationRouter.guards as Array<
      (option, state) => Promise<boolean>
    >
    // 无路由守卫直接通过
    if (!guards && ApplicationRouter.guards.length === 0) {
      return next()
    }

    // 执行所有守卫
    for (const guard of guards) {
      // 执行守卫
      const result: any = await guard(
        {
          store: this.store,
          router: this.router
        },
        {
          to,
          from,
          next
        }
      )

      if (result !== undefined || result !== true) {
        next(result)
        break
      }
    }

    return next()
  }

  /**
   * 后置路由守卫
   */
  private routerAfterEach(to, from) {
    if (to.matched) {
      const component = this.getComponent(to.matched)
      //  布局检测
      this.layoutCheck(component)
    }
  }

  /**
   * 获取组件
   * @param matched
   */
  private getComponent(matched) {
    if (matched && matched.length > 0) {
      const [{ components }] = matched
      return components.default
    }
  }

  /**
   * 布局监测
   * @param component
   */
  private layoutCheck(component) {
    if (component) {
      const targetLayout = component['$layout'] || 'loading'
      if (this.applicationStore.state.layout !== targetLayout) {
        this.applicationStore.commit('updateLayout', targetLayout)
      }
    }
  }

  /**
   * 布局监测
   * @param component
   */
  private authCheck(component) {
    return true
  }

  private importAutoRoutes() {
    if (process.env.ROUTERS) {
      const routes = process.env.ROUTERS as any
      routes.map(route => {
        this.router.addRoutes([
          {
            path: route.routePath,
            component: () => import('~/pages/' + route.componentPath)
          }
        ])
      })
    }
  }
}
