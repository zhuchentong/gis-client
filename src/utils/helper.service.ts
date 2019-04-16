import store from '~/store'

const unit = 25

export class HelperService {
  public static getColumnWidth(count) {
    return count * unit
  }

  /**
   * 获取操作列宽度
   * @param buttonCount
   */
  public static getOperateWidth(buttonCount) {
    const baseSize = 4
    return buttonCount <= 2 ? baseSize * unit : (8 + buttonCount) * unit
  }
}
