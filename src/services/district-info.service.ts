import districtInfoController from "@/config/server/district-info.controller"
import { Request } from "~/core/http"
import { District } from '@/models/district.model'
import { Observable } from 'rxjs'

export class DistrictInfoService {
  /**
   * 获取所有行政区信息
   * @param requestParams 
   */
  @Request({
    server: districtInfoController.getDistrictList,
    model: District
  })
  public getDistrictList(requestParams): Observable<any> {
    return requestParams.request()
  }
}
