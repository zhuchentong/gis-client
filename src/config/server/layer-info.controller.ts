import { RequestMethod } from '~/core/http'

const CONTROLLER = 'layerInfoController'

/**
 * 图层管理
 */
export default {
  /**
   * 保存图层
   */
  createLayerInfo: {
    controller: CONTROLLER,
    action: 'createLayerInfo',
    type: RequestMethod.Post
  },
  /**
   * 删除图层文件
   */
  deleteLayerInfoById: {
    controller: CONTROLLER,
    action: 'deleteLayerInfoById',
    type: RequestMethod.Delete
  },
  /**
   * 根据id查询对应的图层信息
   */
  getLayerInfoById: {
    controller: CONTROLLER,
    action: 'getLayerInfoById',
    type: RequestMethod.Get
  },
  /**
   * 获取图层列表
   */
  queryLayerInfoList: {
    controller: CONTROLLER,
    action: 'queryLayerInfoList',
    type: RequestMethod.Get
  },
  /**
   * 获取图层列表
   */
  getLayerInfoList: {
    controller: CONTROLLER,
    action: 'getLayerInfoList',
    type: RequestMethod.Get
  },
  /**
   * 通过属性内容查询图斑列表
   */
  queryMapSpotByAttr: {
    controller: CONTROLLER,
    action: 'queryMapSpotByAttr',
    type: RequestMethod.Get
  },
  /**
   * 发布临时图层
   */
  publishTempLayer: {
    controller: CONTROLLER,
    action: 'publishTempLayer',
    type: RequestMethod.Post
  },
  /**
   * 删除临时图层
   */
  deleteTempLayer: {
    controller: CONTROLLER,
    action: 'deleteTempLayer',
    type: RequestMethod.Delete
  },
  /**
   * 图层相交对比
   */
  intersectionLayer: {
    controller: CONTROLLER,
    action: 'intersectionLayer',
    type: RequestMethod.Get
  }

}
