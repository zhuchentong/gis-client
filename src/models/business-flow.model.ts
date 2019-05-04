import { Model } from '~/core/model'
import { RequestParams } from '~/core/http'
import { PageService } from '@/extension/services/page.service'
import { FlowInfoService } from '~/services/flow-info.service'
import { Observable } from 'rxjs'

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

  private flowInfoService = new FlowInfoService()

  /**
   * 根据业务类型，业务状态查询数据分页数据
   */
  public queryFollowDataByPage(page: PageService) {
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
          page
        }
      )
    )
  }

  /**
   * 根据业务类型，业务状态查询数据分页数据
   */
  public getBaseInfo(flowId: string) {
    return this.flowInfoService.getBusinessInfoByFlowId(
      new RequestParams({ flowId })
    )
  }

  /**
   * 根据流程id查询对应的业务文件信息
   */
  public getBusinessFileByFlowId(flowId: string) {
    return this.flowInfoService.getBusinessFileByFlowId(
      new RequestParams({ flowId })
    )
  }

  /**
   * 根据流程id查询审批信息
   */
  public getFlowApprovesByFlowId(flowId: string) {
    return this.flowInfoService.getFlowApprovesByFlowId(
      new RequestParams({ flowId })
    )
  }

  /**
   * 根据流程id查询图层信息
   */
  public getLayerInfoByFlowId(flowId: string) {
    return this.flowInfoService.getLayerInfoByFlowId(
      new RequestParams({ flowId })
    )
  }

  /**
   * 结束流程
   */
  public finishFlow(flowId: string) {
    return this.flowInfoService.finishFlow(
      new RequestParams({ flowId })
    )
  }

  /**
   * 指定一下个审批人
   * @param flowId 
   * @param nextUserId 
   */
  public setFlowNextUser(flowId: string, nextUserId: string) {
    return this.flowInfoService.setFlowNextUser(
      new RequestParams({ flowId, nextUserId })
    )
  }

  /**
   * 当前流程节点审批
   * @param flowId 
   * @param status 
   * @param comment 
   */
  public flowApprove(flowId: string, status: string, comment: string) {
    return this.flowInfoService.flowApproval(new RequestParams({
      flowId,
      opinion: comment,
      status
    }))
  }
}
