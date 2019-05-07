import PatrolServer from '~/config/server/patrol-info.controller'
import { Request, RequestParams } from '~/core/http'
import { Observable } from 'rxjs'
import { PatrolInfoModel } from "~/models/patrol-info.model"

/**
 * 外业相关接口
 */
export class PatrolInfoService {

  /**
   * 查询巡查信息
   */
  @Request({
    server: PatrolServer.queryPatrolInfoAll
  })
  public queryPatrolInfoAll(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 根据id查询基本信息
   */
  @Request({
    server: PatrolServer.getPatrolInfoBase
  })
  public getPatrolInfoBase(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }


  /**
   * 创建巡查任务
   */
  @Request({
    server: PatrolServer.createPatrolInfo,
    model: PatrolInfoModel
  })
  public createPatrolInfo(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }


  /**
   * 根据id查询巡查结果
   */
  @Request({
    server: PatrolServer.getPatrolResultById
  })
  public getPatrolResultById(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 添加巡查文件
   */
  @Request({
    server: PatrolServer.addPatrolFile
  })
  public addPatrolFile(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }
}
