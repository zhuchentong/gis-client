import { RequestMethod } from './enums'
import { ExtendService } from './extend-service'
// import { PageService } from '../common'

/**
 * 服务配置接口
 */
export interface IRequestServerConfig {
  service?: string
  controller: string
  action: string
  type: RequestMethod
}

/**
 * 请求选项接口
 */
export interface IRequestParamsOption {
  append?: any[]
  header?: any
  [propName: string]: any
}
