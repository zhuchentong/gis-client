import { RequestMethod } from '~/core/http'

const CONTROLLER = 'grantInfoController'

export default {
  /**
   * 根据批地ID查询批地详情
   */
  getGrantInfoById: {
    controller: CONTROLLER,
    action: 'getGrantInfoById',
    type: RequestMethod.Get
  }
}
