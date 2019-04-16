import { IFileType } from '~/interface/file-type.interface'

/**
 * 请求类型
 */
export const requestType = {
  Delete: 'DELETE',
  Get: 'GET',
  Post: 'POST',
  Put: 'PUT'
}

export const dashboardRankType = {
  amount: 0,
  count: 1,
  radio: 2
}

export const dashboardTimeType = {
  year: 0,
  month: 1,
  week: 2
}

export const dashboardQueryType = {
  inner: 1,
  outer: 2
}

export const monthList = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月'
]

export const weekList = [
  '星期天',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六'
]

/**
 * 文件类型
 */
export const FileType = {
  /**
   * 图片类型支持的格式
   */
  PICTURE: {
    title: '图片',
    value: ['png', 'jpeg', 'jpe', 'jfif', 'jpg', 'gif', 'bmp']
  } as IFileType,
  /**
   * 压缩文件支持的格式
   */
  compressed: {
    title: '压缩文件',
    value: ['zip']
  } as IFileType,
  /**
   * MP3文件类型
   */
  MP3: {
    title: '音频',
    value: ['mp3']
  } as IFileType,
  /**
   * MP4文件类型
   */
  MP4: {
    title: '视频',
    value: ['mp4']
  } as IFileType
}

/**
 * 窗口尺寸
 */
export const WindowSize = {
  mini: {
    width: 480,
    height: 320
  },
  small: {
    width: 540,
    height: 360
  },
  normal: {
    width: 800,
    height: 600
  },
  large: {
    width: 1024,
    height: 800
  },
  huge: {
    width: 1200,
    height: 960
  }
}
