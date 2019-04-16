import { RequestParams } from './request-params'
import { RequestService } from './request-service'
export abstract class ExtendService {
  public before!: (params: RequestParams) => any

  public after!: (option, params: RequestParams) => any
}
