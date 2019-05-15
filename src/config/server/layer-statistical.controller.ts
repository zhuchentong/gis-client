import { RequestMethod } from '~/core/http'

const CONTROLLER = 'layerStatistical'

export default {
  /**
   * 数据统计
   */
  getLayerStatisticalReport: {
    controller: CONTROLLER,
    action: 'getLayerStatisticalReport',
    type: RequestMethod.Get
  },
  
  /**
   * 土地利用现状一级分类统计
   */
  getClassificationOne: {
    controller: CONTROLLER,
    action: 'getClassificationOne',
    type: RequestMethod.Get
  }
}
