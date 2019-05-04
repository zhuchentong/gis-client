import FlowInfoController from '~/config/server/flow-info.controller'
import { Request, RequestParams } from '~/core/http'
import { Observable } from 'rxjs'
import { AutoWired } from 'typescript-ioc'

/**
 * 流程相关服务
 */
// @AutoWired
export class FlowInfoService {
  /**
   * 根据流程查询业务数据列表
   * @param requestParams
   */
  @Request({
    server: FlowInfoController.queryFlowInfo
  })
  public queryFlowInfo(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 查询归档信息
   * @param requestParams
   */
  @Request({
    server: FlowInfoController.queryFlowInfoFinish
  })
  public queryFlowInfoFinish(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 根据流程id查询流基础信息
   */
  @Request({
    server: FlowInfoController.getBusinessInfoByFlowId
  })
  public getBusinessInfoByFlowId(
    requestParams: RequestParams
  ): Observable<any> {
    return requestParams.request()
  }

  /**
   * 根据流程id查询对应的业务文件信息
   */
  @Request({
    server: FlowInfoController.getBusinessFileByFlowId
  })
  public getBusinessFileByFlowId(
    requestParams: RequestParams
  ): Observable<any> {
    return requestParams.request()
  }

  /**
   * 根据流程id查询审批信息
   */
  @Request({
    server: FlowInfoController.getFlowApprovesByFlowId
  })
  public getFlowApprovesByFlowId(
    requestParams: RequestParams
  ): Observable<any> {
    return requestParams.request()
  }

  /**
   * 根据流程id查询图层信息
   */
  @Request({
    server: FlowInfoController.getLayerInfoByFlowId
  })
  public getLayerInfoByFlowId(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 结束流程
   */
  @Request({
    server: FlowInfoController.finishFlow
  })
  public finishFlow(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 流程审批
   */
  @Request({
    server: FlowInfoController.flowApproval
  })
  public flowApproval(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 指定下一个审批人
   */
  @Request({
    server: FlowInfoController.setFlowNextUser
  })
  public setFlowNextUser(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }
}
