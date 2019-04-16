// 实现动态入口
import Vue from 'vue'
import Component from 'vue-class-component'
import DefaultLayout from '~/layouts/default.layout.vue'
@Component({
  components: {},
  beforeCreate() {
    // 动态加载布局文件
    const requireLayout = (): any[] => {
      let result
      try {
        const req = require.context('../layouts', false, /\.vue$/)
        result = (requireContext => requireContext.keys().map(requireContext))(
          req
        ).map((layout: any) => ({
          name: layout.default.options.name,
          component: layout.default
        }))
      } catch (ex) {
        console.error(ex, 'load layout has error')
      }
      return result
    }

    // 导入动态组件
    const importComponents = ({ name, component }) => {
      const components = this.$options.components
      if (components) {
        components[name] = component
      }
    }

    // 导入布局
    requireLayout().forEach(importComponents)
  }
})
export default class App extends Vue {
  public render(h, props) {
    // const loadingEl = h('nuxt-loading', { ref: 'loading' })
    // 创建布局元素
    const layoutEl = h(this.$app.store.getters.layout)
    // 创建模板元素
    const templateEl = h(
      'div',
      {
        domProps: {
          id: '__layout'
        },
        style: {
          width: '100%',
          height: '100%'
        },
        key: this.$app.state.layout
      },
      [layoutEl]
    )
    // 创建过渡元素
    const transitionEl = h(
      'transition',
      {
        props: {
          name: 'layout',
          mode: 'out-in'
        }
      },
      [templateEl]
    )

    return h(
      'div',
      {
        domProps: {
          id: 'app' // for check root #app
        }
      },
      [transitionEl]
    )
  }

  public created() {
    // // Add this.$nuxt in child instances
    // Vue.prototype.$nuxt = this
    // // add to window so we can listen when ready
    // if (typeof window !== 'undefined') {
    //   window.$nuxt = this
    // }
    // // Add $nuxt.error()
    // this.error = this.nuxt.error
  }

  public mounted() {
    return
  }

  public errorChanged() {
    // if (this.nuxt.err && this.$loading) {
    //   if (this.$loading.fail) this.$loading.fail()
    //   if (this.$loading.finish) this.$loading.finish()
    // }
  }

  // loadLayout(layout) {
  //   if (!layout || !(layouts['_' + layout] || resolvedLayouts['_' + layout])) layout = 'default'
  //   let _layout = '_' + layout
  //   if (resolvedLayouts[_layout]) {
  //     return Promise.resolve(resolvedLayouts[_layout])
  //   }
  //   return layouts[_layout]()
  //     .then((Component) => {
  //       resolvedLayouts[_layout] = Component
  //       delete layouts[_layout]
  //       return resolvedLayouts[_layout]
  //     })
  //     .catch((e) => {
  //       if (this.$nuxt) {
  //         return this.$nuxt.error({ statusCode: 500, message: e.message })
  //       }
  //     })
  // }
}
