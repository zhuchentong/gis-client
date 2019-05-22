import { Model } from '~/core/model'
import { RequestParams } from '~/core/http'
import { PageService } from '@/extension/services/page.service'
import { FlowInfoService } from '~/services/flow-info.service'
import { Observable } from 'rxjs'
import { Inject } from 'typescript-ioc'
import { SortService } from '@/extension/services/sort.service'

// @AutoWired
export class BusinessFlowModel extends Model {
  /**
   * 业务类型
   */
  public type: string = ''
  /**
   * 业务状态
   */
  public status: string = ''

  @Inject
  public flowInfoService!: FlowInfoService

  /**
   * 根据业务类型，业务状态查询数据分页数据
   */
  public queryFollowDataByPage(page: PageService, sort?: SortService) {
    // 是否已归档
    const request: (param: RequestParams) => Observable<any> =
      this.status === 'FINSH'
        ? this.flowInfoService.queryFlowInfoFinish
        : this.flowInfoService.queryFlowInfo

    return request(
      new RequestParams(
        {
          type: this.type,
          status: this.status
        },
        {
          page, sort
        }
      )
    )
  }
}