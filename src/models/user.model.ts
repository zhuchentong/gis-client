import { Model } from '~/core/model'
import { RequestParams } from '~/core/http'
import { OperatorsService } from '~/services/operators.service'
import { PageService } from '@/extension/services/page.service'

export class User extends Model {
  public username: string = ""
  public userTitle: string = ""
  public password: string = ""
  public departmentId: string = ""
  public oldPassword: string = ""
  public newPassword: string = ""
  public confirmPassword: string = ""
  public roleIds: string[] = []
  public id: string = ""
  // 默认启用
  public userStatus: string = "ENABLED"

  private user

  private token

  private operatorsService = new OperatorsService()


  /**
   * 登录
   */
  public login() {
    return this.operatorsService.login(new RequestParams({
      username: this.username,
      password: this.password
    }))
  }

  /**
   * 添加用户
   */
  public create() {
    return this.operatorsService.createOperator(new RequestParams({
      username: this.username,
      departmentId: this.departmentId,
      userTitle: this.userTitle,
      userStatus: this.userStatus
    }))
  }

  public update() {
    return this.operatorsService.updateOperator(new RequestParams({
      id: this.id,
      username: this.username,
      departmentId: this.departmentId,
      userTitle: this.userTitle,
      userStatus: this.userStatus
    }))
  }

  /**
   * 修改用户密码
   */
  public changePassword() {
    return this.operatorsService.changeOperatorPassword(new RequestParams({
      newPassword: this.newPassword,
      oldPassword: this.oldPassword
    }))
  }

  /**
   * 重置密码
   */
  public resetPassword() {
    return this.operatorsService.resetPassword(new RequestParams({
      ids: [this.id]
    }))
  }


  public getUserList(page: PageService) {
    return this.operatorsService.getOperators(new RequestParams({
      departmentId: this.departmentId,
      username: this.username
    }, { page }))
  }

  /**
   * 更新角色
   */
  public updateRoles() {
    return this.operatorsService.updateOperatorAndRole(new RequestParams({
      id: this.id,
      roleIds: this.roleIds
    }))
  }

  /**
   * 获取机构下的所有用户
   */
  public getChildrenByDeptId() {
    return this.operatorsService.getOperatorByDepartmentId(new RequestParams({
      departmentId: this.departmentId
    }))
  }
}
