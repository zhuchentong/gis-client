

import Controller from "~/config/server/three-dimensional-layer.controller"
import { Request } from "~/core/http"
import { Observable } from 'rxjs'

export class ThreeDimensionalLayerService {
  /**
   * 新增3D图层
   */
  @Request({
    server: Controller.createLayer3D
  })
  public createLayer3D(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 修改3D图层
   */
  @Request({
    server: Controller.updateLayer3D
  })
  public updateLayer3D(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 查询图层
   */
  @Request({
    server: Controller.query
  })
  public query(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 删除图层信息
   */
  @Request({
    server: Controller.deleteLayer3D
  })
  public delete(requestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 查询所有3D图层
   */
  @Request({
    server: Controller.getAllLayer3Ds
  })
  public getAllLayers(requestParams): Observable<any> {
    return requestParams.request()
  }
}
