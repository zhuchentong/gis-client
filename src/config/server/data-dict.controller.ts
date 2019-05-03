import { RequestMethod } from '~/core/http'

const CONTROLLER = 'dataDictController'

export default {
  /**
   * 获取所有数据字典
   */
  getAll: {
    controller: CONTROLLER,
    action: 'getAll',
    type: RequestMethod.Get
  },
  /**
   * 获取数据字典HashCode
   */
  dataDictHashCode: {
    controller: CONTROLLER,
    action: 'DataDictHashCode',
    type: RequestMethod.Get
  }
}
