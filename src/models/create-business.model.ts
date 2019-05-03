import { Model } from '~/core/model'
import { RequestParams } from '~/core/http'
import { PageService } from '@/extension/services/page.service'
import { CraeteBusinessService } from '~/services/craete-business.service'
import { Observable } from 'rxjs'

// @AutoWired
export class CreateBusiness extends Model {

  public name: string = ""
  public type: string = ""

  private serivce = new CraeteBusinessService()

  /**
   * 新建业务数据
   * @param otherBaseInfo 
   * @param fileList 
   * @param shpFile 
   */
  public create(otherBaseInfo: any, fileList: any[], shpFile: any) {
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
    return func()
  }

}
