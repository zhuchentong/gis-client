import { remote } from 'electron'
import { WindowSize } from '@/config/enum.config'
import Vue, { VueConstructor} from 'vue';

export class WindowService {
  public static open(
    url,
    { size = WindowSize.normal, width, height },
    { replace, parent },
    component:Vue
  ) {
    const { BrowserWindow, getCurrentWindow } = remote
    const currentWindow = getCurrentWindow()
    let win: Electron.BrowserWindow | null = new BrowserWindow({
      width: width ? width : size.width,
      height: height ? height : size.height,
      show: false,
      frame: false,
      resizable: false,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
      alwaysOnTop: false
    })

    const loading = component.$loading({
      lock: true,
      text: '加载中,请稍候...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });

    if (parent) {
      win.setParentWindow(currentWindow)
    }

    // 加载页面内容
    if (process.env.NODE_ENV !== 'production') {
      const [root] = window.location.href.split('#')
      win.loadURL(`${root}#${url}`)
      win.webContents.openDevTools()
    } else {
      win.loadURL(`app://./index.html#${url}`)
    }

    win.once('ready-to-show', () => {
      loading.close();
      win && win.show()
      replace && currentWindow.close()
    })

    // 页面关闭时销毁页面
    win.on('closed', () => {
      win = null
    })
  }
}
