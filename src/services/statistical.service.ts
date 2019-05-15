

import Controller from "@/config/server/statistical.controller"
import { Request, RequestParams } from "~/core/http"
import { Observable } from 'rxjs'

/**
 * 统计相关
 */
export class StatisticalService {
    /**
     * 业务统计(报地统计)
     * @param requestParams 
     */
    @Request({
        server: Controller.getLandStatisticalReport
    })
    public getLandStatisticalReport(requestParams: RequestParams): Observable<any> {
        return requestParams.request()
    }

   /**
    * 业务统计(批地统计)
    * @param requestParams 
    */
    @Request({
        server: Controller.getLandStatisticalGrant
    })
    public getLandStatisticalGrant(requestParams: RequestParams): Observable<any> {
        return requestParams.request()
    }

   /**
    * 业务统计(征地统计)
    * @param requestParams 
    */
    @Request({
        server: Controller.getLandStatisticalExpropriation
    })
    public getLandStatisticalExpropriation(requestParams: RequestParams): Observable<any> {
        return requestParams.request()
    }

   /**
    * 业务统计(供地统计)
    * @param requestParams 
    */
    @Request({
        server: Controller.getLandStatistical
    })
    public getLandStatistical(requestParams: RequestParams): Observable<any> {
        return requestParams.request()
    }

    /**
     * 外业统计（外业任务数统计）
     * @param requestParams 
     */
    @Request({
        server: Controller.getStatisticalPatrolByUser
    })
    public getStatisticalPatrolByUser(requestParams: RequestParams): Observable<any> {
        return requestParams.request()
    }

    /**
     * 外业统计（外业任务类型统计）
     * @param requestParams 
     */
    @Request({
        server: Controller.getStatisticalPatrolByType
    })
    public getStatisticalPatrolByType(requestParams: RequestParams): Observable<any> {
        return requestParams.request()
    }

    /**
     * 外业统计（地灾分布统计）
     * @param requestParams 
     */
    @Request({
        server: Controller.getStatisticalDisaster
    })
    public getStatisticalDisaster(requestParams: RequestParams): Observable<any> {
        return requestParams.request()
    }



}
