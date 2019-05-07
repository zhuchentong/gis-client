import { RequestMethod } from '~/core/http'

const CONTROLLER = 'roleInfo'

export default {
  /**
   * 创建角色
   */
  createRoleInfo: {
    controller: CONTROLLER,
    action: 'createRoleInfo',
    type: RequestMethod.Post
  },
  /**
   * 根据角色Id删除角色
   */
  deleteRoleInfoById: {
    controller: CONTROLLER,
    action: 'deleteRoleInfoById',
    type: RequestMethod.Delete
  },
  /**
   * 角色赋权限
   */
  roleAttachResource: {
    controller: CONTROLLER,
    action: 'roleAttachResource',
    type: RequestMethod.Post
  },
  /**
   * 角色修改
   */
  updateRoleInfo: {
    controller: CONTROLLER,
    action: 'updateRoleInfo',
    type: RequestMethod.Post
  },
  /**
   * 根据角色信息查询角色信息
   */
  queryRoleInfoById: {
    controller: CONTROLLER,
    action: 'queryRoleInfoById',
    type: RequestMethod.Get
  },
  /**
   * 查询角色列表信息
   */
  queryRoleInfoList: {
    controller: CONTROLLER,
    action: 'queryRoleInfoList',
    type: RequestMethod.Get
  },
  /**
   * 查询角色列表信息
   */
  getRoleInfoList: {
    controller: CONTROLLER,
    action: 'getRoleInfoList',
    type: RequestMethod.Get
  },
  /**
   * 获取所有资源信息
   */
  getResourceList: {
    controller: CONTROLLER,
    action: 'getResourceList',
    type: RequestMethod.Get
  }
}
