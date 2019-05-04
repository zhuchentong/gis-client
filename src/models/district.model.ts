import { Model } from '~/core/model'
import { RequestParams } from '~/core/http'
import { DistrictInfoService } from '~/services/district-info.service'

export class District extends Model {
  public districtCode: string = ""
  public districtName: string = ""
  public parentId: string = ""

  public id: string = ""

  private districtInfoService = new DistrictInfoService()

  /**
   * 获取行政区划列表
   */
  public getDistrictList() {
    return this.districtInfoService.getDistrictList(new RequestParams(null))
  }
}
