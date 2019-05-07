import { RequestMethod } from '~/core/http'

const CONTROLLER = 'businessLayerController'

export default {
  /**
   * 查询所有的业务图层
   */
  getBusinessLayerList: {
    controller: CONTROLLER,
    action: 'getBusinessLayerList',
    type: RequestMethod.Get
  },
  /**
   * 查询图层信息
   */
  queryBusinessLayerByGroupId: {
    controller: CONTROLLER,
    action: 'queryBusinessLayerByGroupId',
    type: RequestMethod.Get
  }
}
