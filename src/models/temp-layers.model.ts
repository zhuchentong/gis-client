import { StorageService } from "~/utils/storage.service"

export class TempLayers {
  private readonly storeageItemKey = "tempLayers"
  private _layerList: any[]

  constructor() {
    const dataStr = StorageService.getItem(this.storeageItemKey)
    this._layerList = (dataStr || []).map(v => {
      delete v.checked
      return v
    })
  }

  /**
   * 获取layer列表
   */
  public get layerList() {
    return this._layerList
  }

  /**
   * 添加一个临时图层
   * @param layerInfo 
   */
  public push(layerCode: string, layerName: string) {
    const layerInfo = { layerCode, layerName }
    this._layerList.push(layerInfo)
    this.syncStorage()
  }

  /**
   * 删除一个临时图层
   * @param id 
   */
  public delete(layerCode: string) {
    const index = this._layerList.findIndex(x => x.layerCode === layerCode)
    if (index > -1) {
      this._layerList.splice(index, 1)
      this.syncStorage()
    }
  }

  /**
   * 删除所有的临时图层
   */
  public deleteAll() {
    this._layerList = []
    StorageService.removeItem(this.storeageItemKey)
  }


  /**
   * 同步本地数据到localstorage
   */
  private syncStorage() {
    StorageService.setItem(this.storeageItemKey, JSON.stringify(this.layerList))
  }

}