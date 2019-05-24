import { RequestMethod } from '~/core/http'

const CONTROLLER = 'detection'

export default {
  /**
   * 获取预警分析
   */
  getDetectionWkt: {
    controller: CONTROLLER,
    action: 'getDetectionWkt',
    type: RequestMethod.Post
  },
  /**
   * 获取数据分析
   */
  getDateAnalysisWkt: {
    controller: CONTROLLER,
    action: 'getDateAnalysisWkt',
    type: RequestMethod.Post
  },
  /**
   * 业务分析（区域对比）
   */
  getBusinessWkt: {
    controller: CONTROLLER,
    action: 'getBusinessWkt',
    type: RequestMethod.Post
  },
  /**
   * 预警检测（图层对比）
   */
  getDetectionLayerCode: {
    controller: CONTROLLER,
    action: 'getDetectionLayerCode',
    type: RequestMethod.Get
  },
  /**
   * 数据分析（图层对比）
   */
  getDateAnalysisLayerCode: {
    controller: CONTROLLER,
    action: 'getDateAnalysisLayerCode',
    type: RequestMethod.Get
  },
  /**
   * 业务分析（图层对比）
   */
  getBusinessLayerCode: {
    controller: CONTROLLER,
    action: 'getBusinessLayerCode',
    type: RequestMethod.Get
  }
}
