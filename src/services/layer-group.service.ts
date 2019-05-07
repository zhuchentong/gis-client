

import Controller from "@/config/server/layer-group.controller"
import { Request } from "~/core/http"
import { LayerGroup } from '@/models/layer-group.model'
import { Observable } from 'rxjs'

export class LayerGroupService {
  /**
   * 保存图层组
   * @param requestParams 
   */
  @Request({
    server: Controller.saveLayerGroup,
    model: LayerGroup
  })
  public saveLayerGroup(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 删除图层组
   * @param requestParams 
   */
  @Request({
    server: Controller.deleteLayerGroup,
    model: LayerGroup
  })
  public deleteLayerGroup(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 获取图层组信息
   */
  @Request({
    server: Controller.getLayerGroupList,
    model: LayerGroup
  })
  public getLayerGroupList(requestParams): Observable<any> {
    return requestParams.request()
  }

}
