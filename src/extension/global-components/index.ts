import SvgIcon from "~/components/common/svg-icon.vue"
import LabelItem from "~/components/common/label-item.vue"
import CommonTitle from "~/components/common/common-title.vue"

/**
 * 注册全局自定义组件
 */
export const registerComponent = (Vue) => {
  Vue.component('svg-icon', SvgIcon)
  Vue.component('label-item', LabelItem)
  Vue.component('common-title', CommonTitle)
}