

import Controller from "@/config/server/grant-info.controller"
import { Request, RequestParams } from "~/core/http"
import { Observable } from 'rxjs'

/**
 * 报地相关业务
 */
export class GrantInfoService {
  /**
   * 根据批地ID查询批地详情
   * @param requestParams 
   */
  @Request({
    server: Controller.getGrantInfoById
  })
  public getGrantInfoById(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

}
