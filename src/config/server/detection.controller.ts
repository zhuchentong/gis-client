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
  },
  /**
   * 获取数据分析
   */
  getDateAnalysisWkt: {
    controller: CONTROLLER,
    action: 'getDateAnalysisWkt',
    type: RequestMethod.Get
  },
  getBusinessWkt: {
    controller: CONTROLLER,
    action: 'getBusinessWkt',
    type: RequestMethod.Get
  }
}
