

import roleController from "~/config/server/role-info.controller"
import { Request } from "~/core/http"
import { Role } from '~/models/role.model'
import { Observable } from 'rxjs'

export class RoleService {
  /**
   * 新增角色
   */
  @Request({
    server: roleController.createRoleInfo,
    model: Role
  })
  public createRoleInfo(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 修改角色
   * @param requestParams 
   */
  @Request({
    server: roleController.updateRoleInfo
  })
  public updateRoleInfo(requestParams) {
    return requestParams.request()
  }

  /**
   * 根据角色ID删除特定的角色
   * @param requestParams 
   */
  @Request({
    server: roleController.deleteRoleInfoById
  })
  public deleteRoleInfoById(requestParams) {
    return requestParams.request()
  }

  /**
   * 角色赋权
   * @param requestParams 
   */
  @Request({
    server: roleController.roleAttachResource
  })
  public roleAttachResource(requestParams) {
    return requestParams.request()
  }

  /**
   * 获取角色列表
   * @param requestParams 
   */
  @Request({
    server: roleController.queryRoleInfoList
  })
  public queryRoleInfoList(requestParams) {
    return requestParams.request()
  }

  /**
   * 获取角色列表
   * @param requestParams 
   */
  @Request({
    server: roleController.getRoleInfoList
  })
  public getRoleInfoList(requestParams) {
    return requestParams.request()
  }

  /**
   * 获取资源信息
   * @param requestParams 
   */
  @Request({
    server: roleController.getResourceList
  })
  public getResourceList(requestParams) {
    return requestParams.request()
  }
}
