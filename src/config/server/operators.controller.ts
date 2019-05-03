import { RequestMethod } from '~/core/http'

const CONTROLLER = 'operator'

export default {
  /**
   * 账号密码登录
   */
  login: {
    controller: CONTROLLER,
    action: 'login',
    type: RequestMethod.Post
  },
  /**
   * 新增用户
   */
  createOperator: {
    controller: CONTROLLER,
    action: 'createOperator',
    type: RequestMethod.Post
  },
  /**
   * 修改/重置密码
   */
  changeOperatorPassword: {
    controller: CONTROLLER,
    action: 'changeOperatorPassword',
    type: RequestMethod.Post
  },
  /**
   * 用户登出
   */
  getOperators: {
    controller: CONTROLLER,
    action: 'getOperators',
    type: RequestMethod.Get
  },
  /**
   * 修改用户信息
   */
  updateOperator: {
    controller: CONTROLLER,
    action: 'updateOperator',
    type: RequestMethod.Post
  },
  /**
   * 更新用户角色
   */
  updateOperatorAndRole: {
    controller: CONTROLLER,
    action: 'updateOperatorAndRole',
    type: RequestMethod.Post
  },
  /**
   * 根据机构id查询所有的用户
   */
  getOperatorByDepartmentId: {
    controller: CONTROLLER,
    action: 'getOperatorByDepartmentId',
    type: RequestMethod.Get
  },
  /**
   * 重置密码
   */
  restPassword: {
    controller: CONTROLLER,
    action: 'restPassword',
    type: RequestMethod.Post
  }
}
