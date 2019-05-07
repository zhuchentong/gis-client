import { RequestMethod } from '~/core/http'

const CONTROLLER = 'layerGroup'

/**
 * 图层组管理
 */
export default {
  /**
   * 获取图层组信息
   */
  getLayerGroupList: {
    controller: CONTROLLER,
    action: 'getLayerGroupList',
    type: RequestMethod.Get
  },
  /**
   * 保存图层组信息
   */
  saveLayerGroup: {
    controller: CONTROLLER,
    action: 'saveLayerGroup',
    type: RequestMethod.Post
  },
  /**
   * 删除图层组
   */
  deleteLayerGroup: {
    controller: CONTROLLER,
    action: 'deleteLayerGroup',
    type: RequestMethod.Delete
  }
}
