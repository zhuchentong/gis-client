import Controller from '~/config/server/detection.controller'
import {Request, RequestParams} from '~/core/http'
import {Observable} from 'rxjs'

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

  /**
   * 预警检测（图层对比）
   */
  @Request({
    server: Controller.getDetectionLayerCode,
    force: true
  })
  public getDetectionLayerCode(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 数据分析（图层对比）
   */
  @Request({
    server: Controller.getDateAnalysisLayerCode,
    force: true
  })
  public getDateAnalysisLayerCode(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 业务分析（图层对比）
   */
  @Request({
    server: Controller.getBusinessLayerCode,
    force: true
  })
  public getBusinessLayerCode(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }
}
