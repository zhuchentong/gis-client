import { Model } from '~/core/model'
import { RequestParams } from '~/core/http'
import { ThreeDimensionalLayerService } from '~/services/three-dimensional-layer.service'
import { PageService } from '@/extension/services/page.service'

export class ThreeDimensionalLayerInfo extends Model {
  public id: string = ""
  public name: string = ""
  public url: string = ""
  public heightOffset: string = ""
  public createDate: Date | string = ""
  public remark: string = ""


  private threeDimensionalLayerService = new ThreeDimensionalLayerService()

  public convert() {
    return {}
  }

  public translate(data) {
    // 
  }

  public save() {
    if (!this.id) {
      return this.threeDimensionalLayerService.createLayer3D(new RequestParams({
        name: this.name,
        url: this.url,
        heightOffset: this.heightOffset,
        remark: this.remark
      }))
    } else {
      return this.threeDimensionalLayerService.updateLayer3D(new RequestParams({
        id: this.id,
        name: this.name,
        url: this.url,
        heightOffset: this.heightOffset,
        remark: this.remark
      }))
    }
  }

  public getAll(page: PageService) {
    return this.threeDimensionalLayerService.getAllLayers(new RequestParams({}))
  }

  public delete() {
    return this.threeDimensionalLayerService.delete(new RequestParams({}, { append: [this.id] }))
  }

  public query(page?: PageService) {
    return this.threeDimensionalLayerService.query(new RequestParams({
      name: this.name
    }, { page }))
  }


}