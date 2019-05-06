import { RequestMethod } from '~/core/http'

const CONTROLLER = 'patrolInfoController'

export default {
  /**
   * 查询巡查信息
   */
  queryPatrolInfoAll: {
    controller: CONTROLLER,
    action: 'queryPatrolInfoAll',
    type: RequestMethod.Get
  },
  /**
   * 根据id查询基本信息
   */
  getPatrolInfoBase: {
    controller: CONTROLLER,
    action: 'getPatrolBusinessResponse',
    type: RequestMethod.Get
  },
  /**
   * 创建巡查任务
   */
  createPatrolInfo: {
    controller: CONTROLLER,
    action: 'createPatrolInfo',
    type: RequestMethod.Post
  }

}