import { Model } from '~/core/model'
import { RequestParams } from '~/core/http'
import { LayerGroupService } from '@/services/layer-group.service'

export class LayerGroup extends Model {

  public id: string = ""
  public groupName: string = ""
  public parentId: string = ""

  private layerGroupService = new LayerGroupService()

  /**
   * 机构信息编辑
   */
  public save() {
    return this.layerGroupService.saveLayerGroup(new RequestParams({
      id: this.id,
      parentId: this.parentId,
      groupName: this.groupName
    }))
  }

  /**
   * 删除图层组
   */
  public delete() {
    return this.layerGroupService.deleteLayerGroup(new RequestParams(null, { append: [this.id] }))
  }

  /**
   * 获取图层组信息
   */
  public getGroupList() {
    return this.layerGroupService.getLayerGroupList(new RequestParams({}))
  }
}
