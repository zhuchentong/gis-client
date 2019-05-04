

import BusinessController from "@/config/server/craete-business.controller"
import { Request, RequestParams } from "~/core/http"
import { Observable } from 'rxjs'

/**
 * 创建新业务
 */
export class CraeteBusinessService {
  /**
   * 新增报地信息
   * @param requestParams 
   */
  @Request({
    server: BusinessController.addReportInfo
  })
  public addReportInfo(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 新增批地信息
   */
  @Request({
    server: BusinessController.addGrantInfo
  })
  public addGrantInfo(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 新增征地信息
   */
  @Request({
    server: BusinessController.addExpropriation
  })
  public addExpropriation(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 新增供地
   */
  @Request({
    server: BusinessController.addSupplyInfo
  })
  public addSupplyInfo(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }


  /**
   * 根据批地code 模糊查询
   */
  @Request({
    server: BusinessController.getGrantInfoByCode
  })
  public getGrantInfoByCode(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 根据名称查询报地信息
   */
  @Request({
    server: BusinessController.getReportByName
  })
  public getReportByName(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }
}
