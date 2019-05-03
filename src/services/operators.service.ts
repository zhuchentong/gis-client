

import operatorsController from "~/config/server/operators.controller"
import { Request } from "~/core/http"
import { Observable } from 'rxjs'

export class OperatorsService {
  /**
   * 登录
   */
  @Request({
    server: operatorsController.login
  })
  public login(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 用户创建
   * @param requestParams 
   */
  @Request({
    server: operatorsController.createOperator
  })
  public createOperator(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 修改/重置用户密码
   * @param requestParams 
   */
  @Request({
    server: operatorsController.changeOperatorPassword
  })
  public changeOperatorPassword(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 修改用户信息
   * @param requestParams 
   */
  @Request({
    server: operatorsController.updateOperator
  })
  public updateOperator(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 获取用户列表
   * @param requestParams 
   */
  @Request({
    server: operatorsController.getOperators
  })
  public getOperators(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 更新用户角色
   * @param requestParams 
   */
  @Request({
    server: operatorsController.updateOperatorAndRole
  })
  public updateOperatorAndRole(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 根据机构id查询所有的用户
   */
  @Request({
    server: operatorsController.getOperatorByDepartmentId
  })
  public getOperatorByDepartmentId(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 重置用户密码
   */
  @Request({
    server: operatorsController.restPassword
  })
  public resetPassword(requestParams): Observable<any> {
    return requestParams.request()
  }
}
