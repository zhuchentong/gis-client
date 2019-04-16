import 'reflect-metadata'
import { createDecorator } from 'vue-class-component'
import { EMPTY } from 'rxjs'
// import * as UUID from "uuidjs";

/**
 * 实体规则验证
 * @param target
 */
export function Validations(rules: any) {
  return createDecorator((componentOptions, key) => {
    if (componentOptions['_validations_'] === undefined) {
      componentOptions['_validations_'] = {}
    }

    componentOptions['_validations_'][key] = rules

    if (componentOptions['validations'] === undefined) {
      componentOptions['validations'] = () => {
        return componentOptions['_validations_']
      }
    }
  })
}

/**
 * 函数去抖动
 * @param time
 */
export function Debounce(time: number = 500) {
  return (target, name, descriptor) => {
    const oldValue = descriptor.value
    let flag: any = null
    descriptor.value = () => {
      if (flag) {
        return EMPTY
      } else {
        flag = setTimeout(() => {
          flag = null
        }, time)
      }
      return oldValue.apply(target, arguments)
    }

    return descriptor
  }
}

/**
 * 设置布局
 * @param target
 */
export function Layout(layout: string) {
  return target => {
    target.$layout = layout
    return target
  }
}

/**
 * 路由守卫
 * @param option
 */
export function RouterGuard(option: { path?: RegExp | ((path) => any) }) {
  return (target, name, descriptor) => {
    const oldValue = descriptor.value
    // let flag = null
    descriptor.value = ({ store, router }, { to, from, next }) => {
      if (!option || !option.path) {
        return () => true
      }

      if (option.path instanceof RegExp && option.path.test(to.path)) {
        return oldValue.apply(target, arguments)
      }

      if (option.path instanceof Function && option.path(to.path)) {
        return oldValue.apply(target, arguments)
      }

      return () => true
    }

    return descriptor
  }
}
