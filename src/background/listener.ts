import { ipcMain, DownloadItem } from 'electron'
import { download } from 'electron-dl'
import { exec } from 'child_process'
import path from 'path'
import { IBackgroundEventListener } from '@/interface'

/**
 * 下载时间监听
 */
export const downloadListener: IBackgroundEventListener = {
  event: 'main-download-file',
  handle: (e, args) => {
    function dounloadFileProccess(percentage) {
      e.sender.send('render-download-process', { id: args.id, percentage })
    }

    download(args.win, args.url, {
      filename: args.filename,
      onProgress: dounloadFileProccess
    })
      .then((downloadItem: DownloadItem) => {
        switch (process.platform) {
          case 'darwin':
            exec(`open ${path.resolve(downloadItem.getSavePath())}`)
            break
          case 'win32':
            exec(
              `explorer /e, /select,"${path.resolve(
                downloadItem.getSavePath()
              )}"`
            )
            break
        }
      })
      .catch()
  }
}
