

import Controller from "@/config/server/land-disaster.controller"
import { Request } from "~/core/http"
import { Observable } from 'rxjs'

export class LandDisasterService {
  /**
   * 隐患点信息的创建
   * @param requestParams 
   */
  @Request({
    server: Controller.createLandDisaster,
  })
  public createLandDisaster(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 隐患点信息的修改
   * @param requestParams 
   */
  @Request({
    server: Controller.editLandDisaster,
  })
  public editLandDisaster(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 查询所有的隐患点信息
   * @param requestParams 
   */
  @Request({
    server: Controller.queryLandDisasterAll,
  })
  public queryLandDisasterAll(requestParams): Observable<any> {
    return requestParams.request()
  }


}
