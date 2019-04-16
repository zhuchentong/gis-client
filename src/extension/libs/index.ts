import ElementUI from './element-ui'
import VCharts from './v-charts'
import VueElectron from './vue-electron'
import ImageView from './image-view'
export default {
  install() {
    ElementUI.install()
    VCharts.install()
    VueElectron.install()
    ImageView.install()
  }
}
