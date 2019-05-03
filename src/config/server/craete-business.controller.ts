import { RequestMethod } from '~/core/http'


export default {
  /**
   * 新增报地信息
   */
  addReportInfo: {
    controller: "reportInfoController",
    action: 'addReportInfo',
    type: RequestMethod.Post
  },
  /**
   * 新增征地信息
   */
  addExpropriation: {
    controller: "expropriationController",
    action: 'addExpropriation',
    type: RequestMethod.Post
  },
  /**
   * 新增批地信息
   */
  addGrantInfo: {
    controller: "grantInfoController",
    action: 'addGrantInfo',
    type: RequestMethod.Post
  },
  /**
   * 新增供地
   */
  addSupplyInfo: {
    controller: "supplyInfoController",
    action: 'addSupplyInfo',
    type: RequestMethod.Post
  }
}
