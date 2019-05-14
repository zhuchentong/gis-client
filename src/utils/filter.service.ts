import store from '~/store'
import * as enumData from '~/config/enum.config'
import shpDict from '~/assets/json/shp-dict.json'

export class FilterService {
  /**
   * 转换枚举数据
   * @param value
   * @param key
   */
  public static enumConvert(value: number | string, key) {
    // 排除空字典或者空key
    if (!enumData || !key || !enumData[key]) {
      return ''
    }

    const data =
      enumData[key] instanceof Array
        ? enumData[key]
        : Object.values(enumData[key])

    const target = data.find(x => x.value === value)

    return target ? target.name : ''
  }
  /**
   * 转换字典数据
   * @param 字典code
   */
  public static dictConvert(code: string, key: string) {
    if (!code || !key) {
      return ''
    }
    const values = store.state.dictData[key]
    const find = values.find(x => x.code === code) || {}
    return find.name
  }
  /**
   * 日期范围转换
   * @param dateRange
   * @param fmt
   */
  public static dateRanageFormat(dateRange, fmt = 'yyyy-MM-dd hh:mm:ss') {
    const target = {
      start: '',
      end: ''
    }
    // 检测非法输入
    if (!dateRange || dateRange.length === 0 || !(dateRange instanceof Array)) {
      return target
    }

    target.start = FilterService.dateFormat(dateRange[0], fmt)
    target.end = FilterService.dateFormat(dateRange[1], fmt)
    return target
  }

  /**
   * 日期时间格式化
   * @param date
   * @param fmt 默认值为长日期格式
   */
  public static dateTimeFormat(date, fmt = 'yyyy-MM-dd hh:mm:ss'): string {
    return FilterService.dateFormat(date, fmt)
  }

  /**
   * 日期格式化
   * @param date
   * @param fmt 默认值为短日期格式
   */
  public static dateFormat(date, fmt = 'yyyy-MM-dd'): string {
    // 空数据处理
    if (date === null || date === undefined || date === '') {
      return ''
    }

    // 如果是时间戳则转化为时间
    if (typeof date === 'number') {
      date = new Date(date)
    }

    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    }

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }

    for (const k in o) {
      // tslint:disable-next-line:max-line-length
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  }
  /**
   * 千分位转换
   * @param number
   */
  public static toThousands(param, fixed: number = 2): string {
    let num: any = ''
    if (param) {
      num = param
    } else {
      num = Number(param).toFixed(fixed)
      if (isNaN(num) || num === '' || num === undefined || num === null) {
        return ''
      }
      num = num + ''
      if (/^.*\..*$/.test(num)) {
        const pointIndex = num.lastIndexOf('.')
        let intPart = num.substring(0, pointIndex)
        const pointPart = num.substring(pointIndex + 1, num.length)
        intPart = intPart + ''
        const re = /(-?\d+)(\d{3})/
        while (re.test(intPart)) {
          intPart = intPart.replace(re, '$1,$2')
        }
        num = intPart + '.' + pointPart
      } else {
        num = num + ''
        const re = /(-?\d+)(\d{3})/
        while (re.test(num)) {
          num = num.replace(re, '$1,$2')
        }
      }
    }

    return num
  }

  /**
   * 手机号脱敏显示转换器
   */
  public static encryptPhone(value) {
    if (!value || value === '') {
      return ''
    }
    return value.substr(0, 3) + '****' + value.substr(7)
  }

  /**
   * 身份证脱敏显示转换器
   */
  public static encryptIDCardFour(value) {
    if (!value || value === '') {
      return ''
    }
    // return value.substr(0, 3).padEnd(value.length - 4, '*') + value.substr(-4)
    return value.substr(0, 3) + '****' + value.substr(-4)
  }

  /**
   * 银行卡号脱敏显示转换器
   */
  public static encryptBankCardNumber(value) {
    if (!value || value === '') {
      return ''
    }
    return value.substr(0, 5) + '****' + value.substr(-4)
  }

  /**
   * 长度过长省略显示
   */
  public static ellipsis(value, length) {
    if (!value) {
      return ''
    }
    const data = String(value).trim()
    if (data.length <= length) {
      return data
    } else {
      return data.substr(0, length) + '...'
    }
  }

  /**
   * 小数转换为百分比
   * @param point 要转换的小数
   */
  public static toPercent(point?: number) {
    let str = '--'
    if (point !== undefined) {
      point *= 100
      str = (point > 0 ? point.toFixed(2) : 0) + '%'
    }

    return str
  }

  /**
   * FileTypeConvert
   */
  public static fileTypeConvert(typeStr: string) {
    let result = '未知'
    Object.entries(enumData.FileType).forEach(([key, value]) => {
      if (key === typeStr) {
        result = value.title
      }
    })
    return result
  }

  public static convertShpCode(code: string) {
    if (!shpDict) return code
    const item = shpDict.find(x => x.code === code)
    return item ? item.name : code
  }

  /**
   * 获取行政区名称
   * @param id
   */
  public static districtName(id: string) {
    if (!id) return ''
    const getDistrictName = store.getters['districtModule/getDistrictName']
    return getDistrictName ? getDistrictName(id) : ''
  }

  /**
   * 金额除以一万
   * @param value
   * @param d 要格式化的小数位数
   */
  public static toTenThousand(value: number | string, d: number = 4) {
    if (!value) return ''
    let data: number
    if (typeof value === 'string') {
      data = Number.parseFloat(value)
    } else {
      data = value
    }
    return (data / 10000).toFixed(d)
  }

  /**
   * 平方米转亩制
   * @param value
   * @param d
   */
  public static squareMeterToMu(value: number | string, d: number = 2) {
    if (!value) return ''
    let data: number
    if (typeof value === 'string') {
      data = Number.parseFloat(value)
    } else {
      data = value
    }
    return (data * 0.0015).toFixed(d)
  }

  /**
   * 平方米转公顷
   * @param value
   * @param d
   */
  public static squareMeterToHectare(value: number | string, d: number = 4) {
    if (!value) return ''
    let data: number
    if (typeof value === 'string') {
      data = Number.parseFloat(value)
    } else {
      data = value
    }
    return (data / 10000).toFixed(d)
  }
}
