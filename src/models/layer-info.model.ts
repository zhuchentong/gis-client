import { Model } from '~/core/model'
import { RequestParams } from '~/core/http'
import { LayerInfoService } from '@/services/layer-info.service'
import { BusinessLayerService } from '@/services/business-layer.service'
import { FilterService } from '@/utils/filter.service'
import { PageService } from '~/extension/services/page.service'

export class LayerInfo extends Model {
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
  private readonly tempSpace = "cache"

  // service
  private layerInfoService = new LayerInfoService()
  private businessLayerService = new BusinessLayerService()

  private defaultSpace = "space01"


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
      layerShow: this.layerShow,
      groupId: this.groupId
    }))
  }

  public delete() {
    return this.layerInfoService.deleteLayerInfoById(new RequestParams(null, { append: [this.id] }))
  }

  /**
   * shp图层列表,
   * @param page 
   */
  public query(page: PageService) {
    return this.layerInfoService.queryLayerInfoList(new RequestParams({
      layerName: this.layerName,
      groupId: this.groupId,
      layerSpace: this.defaultSpace,
      createDate: FilterService.dateFormat(this.createDate)
    }, { page }))
  }

  public getLayerInfoList() {
    return this.layerInfoService.getLayerInfoList(new RequestParams({
      layerSpace: this.defaultSpace
    }))
  }

  public getBusinessLayerList() {
    return this.businessLayerService.getBusinessLayerList(new RequestParams({
      layerSpace: this.defaultSpace
    }))
  }

  public getImageLayerInfoList() {
    return this.layerInfoService.getLayerInfoList(new RequestParams({
      layerSpace: "space02"
    }))
  }

  /**
   * 查询图层的属性
   * @param layerId 
   */
  public queryLayerAttr(layerCode: string) {
    return this.layerInfoService.queryMapSpotByAttr(new RequestParams({
      layerCode
    }))
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

  /**
   * 删除临时图层
   * @param layerCode 
   */
  public deleteTempLayer(layerCode: string) {
    return this.layerInfoService.deleteTempLayer(new RequestParams({
      layerCode,
      workSpace: this.tempSpace
    }))
  }

  /**
   * 图层相交对比
   * @param firstLayerCode 要比较的图层
   * @param secondLayerCode 参与比较的基础图层
   */
  public intersectionLayer(firstLayerCode, secondLayerCode) {
    return this.layerInfoService.intersectionLayer(new RequestParams({
      layerCode1: firstLayerCode,
      layerCode2: secondLayerCode,
      styles: "intersection_polygon", // 默认相交对比图层样式
      workspace: this.tempSpace
    }))
  }

}
