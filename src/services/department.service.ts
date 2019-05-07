

import Controller from "~/config/server/department.controller"
import { Request } from "~/core/http"
import { Observable } from 'rxjs'

export class DepartmentService {
  /**
   * 机构信息维护
   * @param requestParams 
   */
  @Request({
    server: Controller.saveDepartment
  })
  public saveDepartment(requestParams) {
    return requestParams.request()
  }

  /**
   * 根据id删除机构信息
   */
  @Request({
    server: Controller.deleteDepartmentById
  })
  public deleteDepartmentById(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 查询机构信息
   * @param requestParams 
   */
  @Request({
    server: Controller.queryDepartmentList
  })
  public queryDepartmentList(requestParams) {
    return requestParams.request()
  }

  /**
   * 查询机构信息
   * @param requestParams 
   */
  @Request({
    server: Controller.getDepartmentList
  })
  public getDepartmentList(requestParams) {
    return requestParams.request()
  }

  /**
   * 根据机构和对应机构下的用户
   * @param requestParams 
   */
  @Request({
    server: Controller.getDepartAndUser
  })
  public getDepartAndUser(requestParams) {
    return requestParams.request()
  }
}
