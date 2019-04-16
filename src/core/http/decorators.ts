import { RequestObject } from './request-object'
import { RequestParams } from './request-params'
import { IRequestServerConfig } from './interfaces'
import { Model } from '../model'
/**
 * 网络请求行为装饰器
 */
export function Request({
  server,
  model
}: {
  server: IRequestServerConfig
  model?: { prototype: Model }
}) {
  return (target, name, descriptor) => {
    // 请求对象
    const requestObject = new RequestObject(server)

    // 设置响应数据模型
    if (model) {
      requestObject.setResponseModel(model)
    }

    // 存储历史方法
    const _value = descriptor.value

    // 传入请求方法
    descriptor.value = (requestParams: RequestParams) => {
      // 设置请求对象
      requestParams.setRequestObject(requestObject)
      // 传入更新后的请求对象
      return _value.call(target, requestParams)
    }

    return descriptor
  }
}
