import { Model } from '~/core/model'
import { RequestParams } from '~/core/http'
import { RoleService } from '~/services/role.service'
import { PageService } from '@/extension/services/page.service'

export class Role extends Model {
  public roleName: string = ""
  public roleStatus: string = ""
  public id: string = ""
  public resourceIds: any[] = []



  private roleService = new RoleService()


  /**
   * 创建角色
   */
  public create() {
    return this.roleService.createRoleInfo(new RequestParams({
      roleName: this.roleName,
      roleStatus: this.roleStatus
    }))
  }

  /**
   * 编辑角色信息
   */
  public update() {
    return this.roleService.updateRoleInfo(new RequestParams({
      id: this.id,
      roleName: this.roleName,
      roleStatus: this.roleStatus
    }))
  }

  public delete() {
    return this.roleService.deleteRoleInfoById(new RequestParams(null, { append: [this.id] }))
  }

  /**
   * 获取所有角色
   */
  public getAll() {
    return this.roleService.getRoleInfoList(new RequestParams({}))
  }

  public query(page: PageService) {
    return this.roleService.queryRoleInfoList(new RequestParams({
      roleName: this.roleName,
      roleStatus: this.roleStatus
    }, { page }))
  }

  /**
   * 查询所有的资源
   */
  public getResourcesList() {
    return this.roleService.getResourceList(new RequestParams({}))
  }

  public attachResource() {
    return this.roleService.roleAttachResource(new RequestParams({
      roleId: this.id,
      resourceIds: this.resourceIds
    }))
  }

}