

import Controller from "@/config/server/layer-info.controller"
import { Request } from "~/core/http"
import { LayerInfo } from '@/models/layer-info.model'
import { Observable } from 'rxjs'

export class LayerInfoService {
  /**
   * 保存图层
   * @param requestParams 
   */
  @Request({
    server: Controller.createLayerInfo,
    model: LayerInfo
  })
  public createLayerInfo(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 删除图层
   * @param requestParams 
   */
  @Request({
    server: Controller.deleteLayerInfoById,
    model: LayerInfo
  })
  public deleteLayerInfoById(requestParams): Observable<any> {
    return requestParams.request()
  }


  /**
   * 获取图层列表
   */
  @Request({
    server: Controller.queryLayerInfoList,
    model: LayerInfo
  })
  public queryLayerInfoList(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 获取图层列表
   */
  @Request({
    server: Controller.getLayerInfoList
  })
  public getLayerInfoList(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 通过属性内容查询图斑列表
   * @param requestParams
   */
  @Request({
    server: Controller.queryMapSpotByAttr
  })
  public queryMapSpotByAttr(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 发布临时图层
   * @param requestParams 
   */
  @Request({
    server: Controller.publishTempLayer
  })
  public publishTempLayer(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 删除临时图层
   * @param requestParams 
   */
  @Request({
    server: Controller.deleteTempLayer
  })
  public deleteTempLayer(requestParams): Observable<any> {
    return requestParams.request()
  }


  @Request({
    server: Controller.intersectionLayer
  })
  public intersectionLayer(requestParams): Observable<any> {
    return requestParams.request()
  }

}
