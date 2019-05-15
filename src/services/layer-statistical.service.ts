

import Controller from "@/config/server/layer-statistical.controller"
import { Request, RequestParams } from "~/core/http"
import { Observable } from 'rxjs'

/**
 * 统计相关
 */
export class LayerStatisticalService {
  /**
   * 数据管理
   * @param requestParams 
   */
  @Request({
    server: Controller.getLayerStatisticalReport
  })
  public getLayerStatisticalReport(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }
  /**
   * 土地利用现状一级分类
   * @param requestParams 
   */
  @Request({
    server: Controller.getClassificationOne
  })
  public getClassificationOne(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }
  

}
