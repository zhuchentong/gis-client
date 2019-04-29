import SvgIcon from "~/components/common/svg-icon.vue"
import LabelItem from "~/components/common/label-item.vue"

/**
 * 注册全局自定义组件
 */
export const registerComponent = (Vue) => {
  Vue.component('svg-icon', SvgIcon)
  Vue.component('label-item', LabelItem)
}