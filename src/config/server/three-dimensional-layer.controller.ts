import { RequestMethod } from '~/core/http'

const CONTROLLER = 'layer3D'

export default {
  /**
   * 创建3D图层信息
   */
  createLayer3D: {
    controller: CONTROLLER,
    action: 'createLayer3D',
    type: RequestMethod.Post
  },
  /**
   * 修改3D图层
   */
  updateLayer3D: {
    controller: CONTROLLER,
    action: 'updateLayer3D',
    type: RequestMethod.Put
  },
  /**
   * 查询图层
   */
  query: {
    controller: CONTROLLER,
    action: 'query',
    type: RequestMethod.Get
  },
  /**
   * 删除图层信息
   */
  deleteLayer3D: {
    controller: CONTROLLER,
    action: 'deleteLayer3D',
    type: RequestMethod.Delete
  },
  /**
   * 查询所有3D图层
   */
  getAllLayer3Ds: {
    controller: CONTROLLER,
    action: 'getAllLayer3Ds',
    type: RequestMethod.Get
  }

}
