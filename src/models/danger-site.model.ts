import { Model } from '~/core/model'

// @AutoWired
export class DangerSiteModel extends Model {

  public id: string = ""
  public grade: string = ''
  public name: string = ''
  public positionX: number | string = ""
  public positionY: number | string = ""
  // 行政区域
  public prefecture: string = ""
  public status: string = ""
}
