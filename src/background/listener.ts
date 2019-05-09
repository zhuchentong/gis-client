import { ipcMain, DownloadItem, BrowserWindow } from 'electron'
import { download } from 'electron-dl'
import { exec } from 'child_process'
import path from 'path'
import { IBackgroundEventListener } from '@/interface'
import { createNamespacedHelpers } from 'vuex'

/**
 * 下载时间监听
 */
export const downloadListener: IBackgroundEventListener = {
  event: 'main-download-file',
  handle: async (e, args) => {
    const win = BrowserWindow.getFocusedWindow() as BrowserWindow

    await download(win, args.url, {
      filename: args.filename,
      openFolderWhenDone: true,
      onProgress: percentage =>
        e.sender.send('render-download-process', {
          id: args.id,
          percentage
        })
    }).catch(ex => {
      console.log(ex)
    })
  }
}
