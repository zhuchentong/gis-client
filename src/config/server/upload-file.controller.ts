import { RequestMethod } from '~/core/http'

const CONTROLLER = 'uploadFile'

export default {
  /**
   * 文件上传
   */
  upload: {
    controller: CONTROLLER,
    action: 'upload',
    type: RequestMethod.Post
  },
  /**
   * 按id查询上传文件
   */
  getUploadFile: {
    controller: CONTROLLER,
    action: 'getUploadFile',
    type: RequestMethod.Get
  },
  /**
   * 根据文件名称获取文件
   */
  getFile: {
    controller: CONTROLLER,
    action: 'getFile',
    type: RequestMethod.Get
  },
  /**
   * 根绝文件ID 字符串 （数组合并）获取文件列表
   */
  getUploadFileList: {
    controller: CONTROLLER,
    action: 'getUploadFileList',
    type: RequestMethod.Get
  }
}
