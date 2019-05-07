
import Controller from "@/config/server/business-layer.controller"
import { Request, RequestParams } from "~/core/http"
import { Observable } from 'rxjs'

/**
 * 业务图层信息管理
 */
export class BusinessLayerService {
  /**
   * 查询所有的业务图层
   * @param requestParams 
   */
  @Request({
    server: Controller.getBusinessLayerList
  })
  public getBusinessLayerList(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 查询图层信息
   */
  @Request({
    server: Controller.queryBusinessLayerByGroupId
  })
  public queryBusinessLayerByGroupId(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

}
