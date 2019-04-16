import Vue from 'vue'
import { Electron } from 'vue-electron'
import { WindowService } from '@/utils/window.service'
// 扩展vue接口
declare module 'vue/types/vue' {
  // 3. 声明为 Vue 补充的东西
  interface Vue {
    $dict: any
    $layout: string
    $filter: any
    $app: any
    $electron: Electron
    $common: any
    $window: any
  }
}
