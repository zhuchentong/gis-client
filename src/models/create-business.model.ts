import { Model } from '~/core/model'
import { RequestParams } from '~/core/http'
import { CraeteBusinessService } from '~/services/craete-business.service'
import { Observable } from 'rxjs'
import { BusinessLayerStyle } from "~/config/business-config"

// @AutoWired
export class CreateBusinessModel extends Model {

  public name: string = ""
  public type: string = ""
  public remark: string = ""
  public region: string = ""
  public acreage: string = ""
  public whether: string = "NO"
  public nextUserId: string = ""
  public unit: string = "SQUARE_METRE" // 平方米

  private serivce = new CraeteBusinessService()

  /**
   * 新建业务数据
   * @param otherBaseInfo 
   * @param fileList 
   * @param shpFile 
   */
  public createBusiness(otherBaseInfo: any, fileList: any[], layerInfo: any): Observable<any> {
    let func: any = this.serivce.addReportInfo
    switch (this.type) {
      case "REPORT":
        func = this.serivce.addReportInfo
        break
      case "GRANT":
        func = this.serivce.addGrantInfo
        break
      case "EXPROPRIA":
        func = this.serivce.addExpropriation
        break
      case "SUPPLY":
        func = this.serivce.addSupplyInfo
        break
    }
    // 设置图层样式
    if (layerInfo) {
      layerInfo.styleName = BusinessLayerStyle[this.type]
    }

    const requestData = {
      unit: this.unit,
      name: this.name,
      type: this.type,
      remark: this.remark,
      region: this.region,
      acreage: Number.parseFloat(this.acreage),
      whether: this.whether,
      nextUserId: this.nextUserId,
      ...otherBaseInfo,
      fileIds: fileList.map(v => v.id),
      layerBaseRequest: layerInfo
    }
    return func(new RequestParams(requestData))
  }

  /**
   * 模糊查询批地文号
   * @param code
   */
  public getGrantInfoByCode(code) {
    return this.serivce.getGrantInfoByCode(new RequestParams({ code }))
  }


  /**
   * 根据名称查询报地信息
   */
  public getReportByName(name) {
    return this.serivce.getReportByName(new RequestParams({ name }))
  }

}
