import { Model } from '~/core/model'

// @AutoWired
export class DangerSiteModel extends Model {

  public id: string = ""
  public grade: string = ''
  public name: string = ''
  public positionX: number = 0
  public positionY: number = 0
  // 行政区域
  public prefecture: string = ""
  public status: string = ""
}
