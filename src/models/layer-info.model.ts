import { Model } from '~/core/model'
import { RequestParams } from '~/core/http'
import { LayerInfoService } from '@/services/layer-info.service'
import { BusinessLayerService } from '@/services/business-layer.service'
import { FilterService } from '@/utils/filter.service'
import { PageService } from '~/extension/services/page.service'
import { SortService, SortType } from '@/extension/services/sort.service'

export class LayerInfo extends Model {
  /**
   * 第三方图层空间
   */
  public static readonly thirdSpace = "third-space"
  public layerName: string = ""
  public id: string = ""
  public groupId: string = ""
  public layerShow: string = "YES"
  public pellucidity: string = "FALSE"
  public layerRemark: string = ""
  public createDate: Date | any = ''
  public fileId: string = ""
  public fileType: string = "BASIC_FILE"
  public styleId: string = ""

  public readonly tempSpace = "temp-space"
  public readonly defaultSpace = "base-space"

  // service
  private layerInfoService = new LayerInfoService()




  private sort = new SortService({ sort: SortType.ascending })

  /**
   * 保存图层文件信息
   */
  public saveLayer() {
    return this.layerInfoService.createLayerInfo(new RequestParams({
      id: this.id,
      pellucidity: this.pellucidity,
      fileId: this.fileId,
      fileType: this.fileType,
      styleId: this.styleId,
      layerName: this.layerName,
      layerRemark: this.layerRemark,
      layerSpace: this.groupId === LayerInfo.thirdSpace ? LayerInfo.thirdSpace : this.defaultSpace,
      layerShow: this.layerShow,
      groupId: this.groupId
    }))
  }

  public delete() {
    const requestParams = {
      id: this.id,
      layerSpace: this.groupId === LayerInfo.thirdSpace ? LayerInfo.thirdSpace : this.defaultSpace
    }
    return this.layerInfoService.deleteLayerInfoById(new RequestParams(requestParams))
  }

  /**
   * shp图层列表,
   * @param page 
   */
  public query(page: PageService) {
    return this.layerInfoService.queryLayerInfoList(new RequestParams({
      layerName: this.layerName,
      groupId: this.groupId,
      layerSpace: this.groupId === LayerInfo.thirdSpace ? LayerInfo.thirdSpace : this.defaultSpace,
      createDate: FilterService.dateFormat(this.createDate)
    }, { page, sort: this.sort }))
  }


  /**
   * 发布临时图层
   */
  public publishTempLayer() {
    return this.layerInfoService.publishTempLayer(new RequestParams({
      fileId: this.fileId,
      layerName: this.layerName,
      pellucidity: "TRUE",
      workSpace: this.tempSpace // 暂定geoserver的cache工作区
    }))
  }
}
