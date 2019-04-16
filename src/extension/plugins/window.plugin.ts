import Vue from 'vue'
import { WindowService } from '~/utils/window.service'

export default {
  install() {
    Vue.prototype.$window = WindowService
  }
}
