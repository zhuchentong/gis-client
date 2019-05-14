import { Model } from '~/core/model'
import Cesium from "cesium/Cesium"

/**
 * 外业查询实体
 */
export class PatrolInfoModel extends Model {

  public collectData = "NO"
  public image = "NO"
  public video = "NO"
  public name: string = ""
  public planTime: Date = new Date()
  public site: string = ""
  public type: string = ""
  public userId: string = ""
  public remark: string = ""

  private cartographic: Cesium.Cartographic | null = null

  public get positionX() {
    if (!this.cartographic) return 0
    return Cesium.Math.toDegrees(this.cartographic.latitude)
  }

  public get positionY() {
    if (!this.cartographic) return 0
    return Cesium.Math.toDegrees(this.cartographic.longitude)
  }

}
