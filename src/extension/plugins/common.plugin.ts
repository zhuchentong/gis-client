import Vue from 'vue'
import { CommonService } from '~/utils/common.service'

export default {
  install() {
    Vue.prototype.$common = CommonService
  }
}
