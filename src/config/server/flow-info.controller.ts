import { RequestMethod } from '~/core/http'

const CONTROLLER = 'flowInfoController'

export default {
  /**
   * 根据流程查询业务数据列表
   */
  queryFlowInfo: {
    controller: CONTROLLER,
    action: 'queryFlowInfo',
    type: RequestMethod.Get
  },
  /**
   * 查询归档信息
   */
  queryFlowInfoFinish: {
    controller: CONTROLLER,
    action: 'queryFlowInfoFinish',
    type: RequestMethod.Get
  },
  /**
   * 根据流程id查询流基础信息
   */
  getBusinessInfoByFlowId: {
    controller: CONTROLLER,
    action: 'getBusinessInfoResponseByFlowId',
    type: RequestMethod.Get
  },
  /**
   * 根据流程id查询对应的业务文件信息
   */
  getBusinessFileByFlowId: {
    controller: CONTROLLER,
    action: 'getBusinessFileByFlowId',
    type: RequestMethod.Get
  },
  /**
   * 根据流程id查询审批信息
   */
  getFlowApprovesByFlowId: {
    controller: CONTROLLER,
    action: 'getFlowChart',
    type: RequestMethod.Get
  },
  /**
   * 根据流程id查询图层信息
   */
  getLayerInfoByFlowId: {
    controller: CONTROLLER,
    action: 'getLayerInfoResponse',
    type: RequestMethod.Get
  },
  /**
   * 结束流程
   */
  finishFlow: {
    controller: CONTROLLER,
    action: 'finishFlow',
    type: RequestMethod.Post
  },
  /**
   * 流程审批
   */
  flowApproval: {
    controller: CONTROLLER,
    action: 'flowApproval',
    type: RequestMethod.Post
  },
  /**
   * 指定下一个审批人
   */
  setFlowNextUser: {
    controller: CONTROLLER,
    action: 'setFlowNextUser',
    type: RequestMethod.Post
  }
}
