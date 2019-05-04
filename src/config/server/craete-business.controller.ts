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
  },
  /**
   * 根据批地code 模糊查询
   */
  getGrantInfoByCode: {
    controller: "grantInfoController",
    action: 'getGrantInfoByCode',
    type: RequestMethod.Get
  },
  /**
   * 根据名称查询报地信息
   */
  getReportByName: {
    controller: "reportInfoController",
    action: 'getReportByName',
    type: RequestMethod.Get
  }
}
