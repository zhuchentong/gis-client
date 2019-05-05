import { RequestMethod } from '~/core/http'

const CONTROLLER = 'reportInfoController'

export default {
  /**
   * 根据报地id查询报地信息
   */
  getReportById: {
    controller: CONTROLLER,
    action: 'getReportById',
    type: RequestMethod.Get
  }
}
