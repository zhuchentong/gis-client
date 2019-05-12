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
  },
  /**
   * 根据id查询巡查结果
   */
  getPatrolResultById: {
    controller: CONTROLLER,
    action: 'getPatrolInfoById',
    type: RequestMethod.Get
  },
  /**
   * 添加巡查文件
   */
  addPatrolFile: {
    controller: CONTROLLER,
    action: 'addPatrolFile',
    type: RequestMethod.Post
  },
  /**
   * 查询巡查信息
   */
  queryPatrolInfoListByApp: {
    controller: CONTROLLER,
    action: 'queryPatrolInfoByApp',
    type: RequestMethod.Get
  }

}