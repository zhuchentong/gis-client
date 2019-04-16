import store from '~/store'
const { state } = store

// tslint:disable-next-line:interface-name
interface DictType {
  name: string
  code: string
}

export class DictService {
  /**
   * 获取字典数据
   * @param codes
   */
  public static getDictData(...keys): DictType[] {
    const results: DictType[] = []
    // 获取字典项
    keys.forEach(key => {
      const items = state.dictData[key]
      if (items && items.length) {
        results.push(...items)
      }
    })
    return results
  }
}
