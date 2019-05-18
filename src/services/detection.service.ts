import Controller from '~/config/server/detection.controller'
import { Request } from '~/core/http'
import { Observable } from 'rxjs'

export class DetectionService {
  /**
   * 获取预警分析数据
   * @param requestParams
   */
  @Request({
    server: Controller.getDetectionWkt
  })
  public getDetectionWkt(requestParams): Observable<any> {
    return requestParams.request()
  }
}
