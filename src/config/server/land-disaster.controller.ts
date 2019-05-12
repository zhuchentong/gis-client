import { RequestMethod } from '~/core/http'

const CONTROLLER = 'landDisasterController'
export default {
  /**
   * 隐患点信息的创建
   */
  createLandDisaster: {
    controller: CONTROLLER,
    action: 'createLandDisaster',
    type: RequestMethod.Post
  },
  /**
   * 隐患点信息的修改
   */
  editLandDisaster: {
    controller: CONTROLLER,
    action: 'editLandDisaster',
    type: RequestMethod.Post
  },
  /**
   * 查询所有的隐患点信息
   */
  queryLandDisasterAll: {
    controller: CONTROLLER,
    action: 'queryLandDisasterAll',
    type: RequestMethod.Get
  }
}