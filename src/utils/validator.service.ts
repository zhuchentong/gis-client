import validator from 'async-validator'

export class ValidatorService {
  // 验证正则列表
  public static regex = {
    // 手机号
    phoneNumber: /^1(3|4|5|7|8)\d{9}$/,
    // 身份证
    // tslint:disable-next-line:max-line-length
    idCard: /(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$)|(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)/,
    // 金额
    money: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/,
    // 电话号
    callNumber: /(^\d{8}|\d{4}-\{7,8}$)/
  }

  /**
   * 自定义验证器
   * @param data
   * @param descriptor
   * @param callback
   */
  public static validate(data: any, descriptor: any) {
    const schema = new validator(descriptor)
    const process = new Promise((reslove, reject) => {
      schema.validate(data, (errors, fields) => {
        // 验证失败
        if (errors) {
          reject({
            errors,
            fields
          })
        }
        // 验证成功
        reslove()
      })
    })
    return process
  }

  /**
   * 验证手机号
   */
  public static phoneNumber(rule, value, callback) {
    if (ValidatorService.regex.phoneNumber.test(value) || !value) {
      callback()
    } else {
      callback(new Error('请输入正确的手机号'))
    }
  }

  /**
   * 验证电话号
   */
  public static callNumber(rule, value, callback) {
    if (ValidatorService.regex.callNumber.test(value) || !value) {
      callback()
    } else {
      callback(new Error('请输入正确的电话号'))
    }
  }

  /**
   * 验证身份证
   */
  public static idCard(rule, value, callback) {
    if (ValidatorService.regex.idCard.test(value) || !value) {
      callback()
    } else {
      callback(new Error('请输入正确的身份证号码'))
    }
  }

  /**
   * 验证金额
   */
  public static money(rule, value, callback) {
    if (ValidatorService.regex.money.test(value) || !value) {
      callback()
    } else {
      callback(new Error('请输入正确格式的金额'))
    }
  }
}
