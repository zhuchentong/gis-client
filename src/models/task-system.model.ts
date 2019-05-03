import { Model } from '~/core/model'
import { RequestParams } from '~/core/http'
import { PageService } from '@/extension/services/page.service'
import { FlowInfoService } from '~/services/flow-info.service'
import { Observable } from 'rxjs'

// @AutoWired
export class TaskSystemModel extends Model {
  /**
   * 业务类型
   */
  public type: string = ''
  /**
   * 业务状态
   */
  public status: string = ''

  private flowInfoService = new FlowInfoService()

  /**
   * 根据业务类型，业务状态查询数据分页数据
   */
  public queryFollowDataByPage(page: PageService) {
    const request: (param: RequestParams) => Observable<any> =
      this.status === 'SAVED'
        ? this.flowInfoService.queryFlowInfoFinish
        : this.flowInfoService.queryFlowInfo

    return request(
      new RequestParams(
        {
          type: this.type,
          status: this.status
        },
        {
          page
        }
      )
    )
  }

}
