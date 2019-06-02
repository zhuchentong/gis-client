import { remote } from 'electron'
import { WindowSize } from '@/config/enum.config'
import Vue, { VueConstructor } from 'vue'
import qs from 'qs'
export class WindowService {
  public static get params() {
    const params = window.location.href.split('?')
    return params.length > 1 ? qs.parse(params[1]) : {}
  }

  public static open(
    url,
    {
      size = WindowSize.large,
      width,
      height,
      maximizable = true
    },
    { replace, parent, params },
    component: Vue
  ) {
    const { BrowserWindow, getCurrentWindow } = remote
    const currentWindow = getCurrentWindow()

    const option: any = {
      show: false,
      minWidth: size.width,
      minHeight: size.height,
      maximizable,
      parent: parent && currentWindow
    }

    if (!maximizable) {
      option.width = width ? width : size.width
      option.height = height ? height : size.height
    }

    let win: Electron.BrowserWindow | null = new BrowserWindow(option)

    win.setMenu(null)

    const loading = component.$loading({
      lock: true,
      text: '加载中,请稍候...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })

    // if (parent) {
    //   console.log(win)
    //   win.setParentWindow(currentWindow)
    // }

    if (params) {
      url = `${url}?${qs.stringify(params)}`
    }

    // 加载页面内容
    if (process.env.NODE_ENV !== 'production') {
      const [root] = window.location.href.split('#')
      win.loadURL(`${root}#${url}`)
      win.webContents.openDevTools()
    } else {
      win.loadURL(`app://./index.html#${url}`)
      // win.webContents.openDevTools()
    }

    win.once('ready-to-show', () => {
      loading.close()
      if (win) {
        if (maximizable) win.maximize()
        win.show()
      }
      if (replace) currentWindow.close()
    })

    // 页面关闭时销毁页面
    win.on('closed', () => {
      win = null
    })
  }
}
