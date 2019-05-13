import { Model } from '~/core/model'

// @AutoWired
export class DangerSiteModel extends Model {

  public id: string = ""
  public grade: string = ''
  public name: string = ''
  public positionX: number = 109.68900513835253
  public positionY: number = 36.65856622832344
  // 行政区域
  public prefecture: string = ""
  public status: string = ""
}
