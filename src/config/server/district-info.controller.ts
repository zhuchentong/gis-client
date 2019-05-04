import { RequestMethod } from '~/core/http'

const CONTROLLER = 'districtInfoController'

/**
 * 行政区划
 */
export default {
  /**
   * 获取行政区划列表
   */
  getDistrictList: {
    controller: CONTROLLER,
    action: 'getDistrictList',
    type: RequestMethod.Get
  }
}
