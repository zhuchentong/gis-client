import { RequestMethod } from '~/core/http'

const CONTROLLER = 'statistical'

export default {
  /**
   * 业务统计(报地统计)
   */
  getLandStatisticalReport: {
    controller: CONTROLLER,
    action: 'getLandStatisticalReport',
    type: RequestMethod.Get
  },
  /**
   * 业务统计(批地统计)
   */
  getLandStatisticalGrant: {
    controller: CONTROLLER,
    action: 'getLandStatisticalGrant',
    type: RequestMethod.Get
  },
  /**
   * 业务统计(征地统计)
   */
  getLandStatisticalExpropriation: {
    controller: CONTROLLER,
    action: 'getLandStatisticalExpropriation',
    type: RequestMethod.Get
  },
  /**
   * 业务统计(供地统计)
   */
  getLandStatistical: {
    controller: CONTROLLER,
    action: 'getLandStatistical',
    type: RequestMethod.Get
  },

  /**
   * 外业统计(外业任务数统计)
   */
  getStatisticalPatrolByUser: {
    controller: CONTROLLER,
    action: 'getStatisticalPatrolByUser',
    type: RequestMethod.Get
  },
  /**
   * 外业统计 按类型统计
   */
  getStatisticalPatrolByType: {
    controller: CONTROLLER,
    action: 'getStatisticalPatrolByType',
    type: RequestMethod.Get
  },
  /**
   * 地灾分布 按地名统计
   */
  getStatisticalDisasterByName: {
    controller: CONTROLLER,
    action: 'getStatisticalDisasterByName',
    type: RequestMethod.Get
  },
  /**
   * 地灾分布 按地灾等级分布
   */
  getStatisticalDisasterByGrade: {
    controller: CONTROLLER,
    action: 'getStatisticalDisasterByGrade',
    type: RequestMethod.Get
  }

}
