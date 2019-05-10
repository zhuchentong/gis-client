import { Model } from '~/core/model'
import { RequestParams } from '~/core/http'
import { ThreeDimensionalLayerService } from '~/services/three-dimensional-layer.service'
import { PageService } from '@/extension/services/page.service'

export class ThreeDimensionalLayerInfo extends Model {
  public id: string = ""
  public name: string = ""
  public url: string = ""
  public heightOffset: string = ""
  public remark: string = ""
}