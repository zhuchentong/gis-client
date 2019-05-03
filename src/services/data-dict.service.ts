

import dataDictController from "@/config/server/data-dict.controller"
import { Request, RequestParams } from "~/core/http"
import { Observable } from 'rxjs'

/**
 * 数据字典服务
 */
export class DataDictService {
  /**
   * 获取所有数据字典
   * @param requestParams 
   */
  @Request({
    server: dataDictController.getAll
  })
  public getDictData(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 获取数据字典HashCode
   */
  @Request({
    server: dataDictController.dataDictHashCode
  })
  public dataDictHashCode(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

}
