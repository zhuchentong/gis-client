import { Model } from '~/core/model'
import { RequestParams } from '~/core/http'
import { PageService } from '@/extension/services/page.service'
import { PatrolInfoService } from '~/services/patrol-info.service'
import { Inject } from 'typescript-ioc'

/**
 * 外业查询实体
 */
export class PatrolInfoModel extends Model {

  public collectData = "NO"
  public image = "NO"
  public video = "NO"
  public name: string = ""
  public planTime: Date = new Date()
  public site: string = ""
  public type: string = ""
  public userId: string = ""
  public remark: string = ""
}
