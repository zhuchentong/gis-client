import { RequestMethod } from '~/core/http'

const CONTROLLER = 'detection'

export default {
  /**
   * 获取预警分析
   */
  getDetectionWkt: {
    controller: CONTROLLER,
    action: 'getDetectionWkt',
    type: RequestMethod.Get
  }
}
