import appConfig from '~/config/app.config'
import { MessageBox, Dialog } from 'element-ui'
import { ipcRenderer, remote } from 'electron'
import store from '~/store'
import UUID from 'uuidjs'

/**
 * 公共函数
 */
export class CommonService {
  /**
   * 获取组件名称
   * @param path
   */
  public static getComponentName(path): string {
    const pathArray = path.split('.')[0].split('/')
    return `-${pathArray[pathArray.length - 1]}`.replace(/\-(\w)/g, ($0, $1) =>
      $1.toUpperCase()
    )
  }

  /**
   * 返回此时系统的年月日数组
   */
  public static getDate() {
    const myDate = new Date()
    return [myDate.getFullYear(), myDate.getMonth() + 1, myDate.getDate()]
  }

  // /**
  //  * 获取以某时间偏移之后的日期数组
  //  * @param offset 偏移量 (天)
  //  * @param currentDate 基准日期,不传则为当前日期
  //  */
  // public static getDateArrayOnOffset(offset: number = 0, currentDate?: Date): Date[] {
  //   currentDate = currentDate || new Date()
  //   const beforeDate = moment(currentDate).add('days', offset).toDate()
  //   return [beforeDate, currentDate]
  // }

  public static base64ConvertBlob(dataURI, mimeString?): Blob {
    const byteString = atob(dataURI.split(',')[1])

    if (!mimeString) {
      mimeString = dataURI
        .split(',')[0]
        .split(':')[1]
        .split(';')[0]
    } else {
      mimeString =
        mimeString +
        '/' +
        dataURI
          .split(',')[0]
          .split(':')[1]
          .split(';')[0]
          .split('/')[1]
    }

    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ab], { type: mimeString })
  }

  /**
   * 获取本地服务器文件路径
   * @param fileUrl 附件文件路径
   */
  public static getLocalServerFilePath(fileUrl: string) {
    return `${appConfig.attch}/${fileUrl}`
  }

  /**
   * 下载文件
   */
  public static downloadFile(fileInfo: { url: string; filename: string }) {
    // 获取当前窗口
    const win = remote.getCurrentWindow()
    if (!fileInfo.filename) {
      console.error('下载文件缺少文件名')
      return
    }
    const downloadInfo = { ...fileInfo, id: UUID.generate(), window: win }
    ipcRenderer.send('main-download-file', downloadInfo)
    // 添加下载任务
    store.commit('downloadProcessModule/addDownLoadInfo', {
      percentage: 0,
      ...downloadInfo
    })

    ipcRenderer.on('render-download-process', (e, args) => {
      // 更新下载进度
      store.commit('downloadProcessModule/updateDownLoadPercentage', args)
    })
  }

  /**
   * 下载文件
   */
  public static downloadImage(url, filename: string = '') {
    return new Promise((reslove, reject) => {
      const img = new Image()
      img.onload = () => {
        // 创建接受image的canvas
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        // 获取canvas
        const ctx: any = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        // 得到图片的base64编码数据
        const base64 = canvas.toDataURL('application/png')
        const blob = CommonService.base64ConvertBlob(base64, 'application')
        const aTag = document.createElement('a')

        const objectURL = URL.createObjectURL(blob)
        aTag.href = objectURL
        aTag.click()
        URL.revokeObjectURL(objectURL)
      }

      const appUrl: any = appConfig.server

      if (appUrl.image) {
        img.setAttribute('crossOrigin', appUrl.image)
      }

      img.src = url
    })
  }

  /**
   * 浏览器类型判断
   */
  public static _mime(option, value) {
    const mimeTypes = navigator.mimeTypes
    for (const mt in mimeTypes) {
      if (mimeTypes[mt][option] === value) {
        return true
      }
    }
    return false
  }

  public static getBrowserType() {
    const ua = navigator.userAgent.toLowerCase()
    const is360 = CommonService._mime(
      'type',
      'application/vnd.chromium.remoting-viewer'
    )
    const isOpera = ua.indexOf('Opera') > -1

    if (isOpera) {
      return 'opera'
    } else if (
      ua.indexOf('compatible') > -1 &&
      ua.indexOf('MSIE') > -1 &&
      !isOpera
    ) {
      return 'ie'
    } else if (ua.indexOf('firefox') !== -1) {
      return 'firefox'
    } else if (ua.indexOf('safari') !== -1 && ua.indexOf('Version') !== -1) {
      return 'safari'
    } else if (ua.indexOf('chrome') > 1 && is360) {
      return '360'
    } else if (ua.indexOf('chrome') > 1) {
      return 'chrome'
    }
  }

  /**
   * 对象赋值
   * @param target
   * @param resource
   */
  public static revertData(target: any, resource: any) {
    if (!target || !resource) return
    Object.keys(target).forEach(key => {
      const value = resource[key]
      if (!value) return
      if (target[key] instanceof Array) {
        target[key] = value.map(v => ({ ...v }))
      } else {
        target[key] = value
      }
    })
  }

  /**
   * 生成树型结构数据
   * @param sourceList 包含id 和 pid 的线性数据
   * @param options 数据项配置 配置 keyName: 主键名称,parentKeyName: 父级键名称
   */
  // tslint:disable-next-line:max-line-length
  public static generateTreeData(
    sourceList,
    options?: { keyName: string; parentKeyName: string; sortKey?: string }
  ): any[] {
    if (!sourceList) {
      return []
    }

    // key
    const keyName = options ? options.keyName : 'id'
    // parentKey
    const parentKeyName = options ? options.parentKeyName : 'pid'
    // sort
    const sortKeyName = options ? options.sortKey : undefined
    /**
     * 用当前节点去生成他的children节点
     * @param any node
     */
    const fun = (node: any) => {
      // 用找到的孩子节点去递归查找孙子节点
      let children = sourceList.filter(x => x[parentKeyName] === node[keyName])
      if (sortKeyName) {
        children = children.sort((e1, e2) => e1[sortKeyName] - e2[sortKeyName])
      }

      if (children.length) {
        node.children = children
        children.map(fun)
      }
      return node
    }

    // 如果有排序则根据排序键进行排序
    let rootList = CommonService.findRoot(sourceList, keyName, parentKeyName)
    if (sortKeyName) {
      rootList = rootList.sort((e1, e2) => e1[sortKeyName] - e2[sortKeyName])
    }
    const treeData = rootList.map(fun)
    return treeData
  }

  /**
   * 查找数据源的所有根节点
   * @param dataList 要查找的数据
   * @param keyName 节点ID 标识
   * @param parentKey 节点父ID 标识
   */
  private static findRoot(
    dataList: any[],
    keyName: string,
    parentKey: string
  ): any[] {
    const resultList = dataList.filter(x => !x[parentKey])

    dataList.filter(x => !!x[parentKey]).forEach(findParent)

    /**
     * 递归找最终的root节点
     * @param 要去查找的节点
     */
    function findParent(currentNode: any) {
      /**
       * 用父ID去找自己的父亲节点
       * 如果找到说明这个节点不是最终的祖先节点
       * 否则这个节点就是祖先节点
       */
      const parent = dataList.find(k => k[keyName] === currentNode[parentKey])
      if (!parent) {
        if (resultList.indexOf(currentNode) < 0) {
          resultList.push(currentNode)
        }
      } else {
        findParent(parent)
      }
    }

    return resultList
  }
}
