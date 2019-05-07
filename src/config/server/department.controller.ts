import { RequestMethod } from '~/core/http'

const CONTROLLER = 'department'

export default {
  /**
   * 更新组织机构信息
   */
  saveDepartment: {
    controller: CONTROLLER,
    action: 'saveDepartment',
    type: RequestMethod.Post
  },
  /**
   * 根据单位id删除单位信息
   */
  deleteDepartmentById: {
    controller: CONTROLLER,
    action: 'deleteDepartmentById',
    type: RequestMethod.Delete
  },
  /**
   * 获取所有组织机构
   */
  queryDepartmentList: {
    controller: CONTROLLER,
    action: 'queryDepartmentList',
    type: RequestMethod.Get
  },
  /**
   * 查询机构信息
   */
  getDepartmentList: {
    controller: CONTROLLER,
    action: 'getDepartmentList',
    type: RequestMethod.Get
  },
  /**
   * 根据机构和对应机构下的用户
   */
  getDepartAndUser: {
    controller: CONTROLLER,
    action: 'getDepartAndUser',
    type: RequestMethod.Get
  }
}
