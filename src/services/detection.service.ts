import Controller from '~/config/server/detection.controller'
import { Request, RequestParams } from '~/core/http'
import { Observable } from 'rxjs'

export class DetectionService {
  /**
   * 获取预警分析数据
   * @param requestParams
   */
  @Request({
    server: Controller.getDetectionWkt,
    force: true
  })
  public getDetectionWkt(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 获取数据分析数据
   * @param requestParams
   */
  @Request({
    server: Controller.getDateAnalysisWkt,
    force: true
  })
  public getDateAnalysisWkt(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 获取数据分析数据
   * @param requestParams
   */
  @Request({
    server: Controller.getBusinessWkt,
    force: true
  })
  public getBusinessWkt(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }
}
