import { remote } from 'electron'
export class WindowService {
  public static open(url, { size, width, height }, autoClose = true) {
    const { BrowserWindow, getCurrentWindow } = remote
    const currentWindow = getCurrentWindow()
    let win: Electron.BrowserWindow | null = new BrowserWindow({
      width: size ? size.width : width,
      height: size ? size.height : height,
      show: false,
      frame: false,
      resizable: false,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
      alwaysOnTop: false
    })

    // 加载页面内容
    if (process.env.NODE_ENV !== 'production') {
      const [root] = window.location.href.split('#')
      win.loadURL(`${root}#${url}`)
      win.webContents.openDevTools()
    } else {
      win.loadURL(`app://./index.html#${url}`)
    }

    win.once('ready-to-show', () => {
      win && win.show()
      autoClose && currentWindow.close()
    })

    // 页面关闭时销毁页面
    win.on('closed', () => {
      win = null
    })
  }
}
