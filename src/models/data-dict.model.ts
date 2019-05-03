import { Model } from '~/core/model'
import { RequestParams } from '~/core/http'
import { DataDictService } from '@/services/data-dict.service'

export class DataDict extends Model {

  private dataDictService = new DataDictService()


  public getHashCode() {
    return this.dataDictService.dataDictHashCode(new RequestParams({}))
  }

  public getDictData() {
    return this.dataDictService.getDictData(new RequestParams({}))
  }

}
