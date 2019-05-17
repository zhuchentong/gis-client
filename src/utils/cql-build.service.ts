export class CqlBuilder {

  private predicateList: any = []

  /**
   * @param key 查询的字段
   * @param type 查询方式
   * @param value1 查询字段值
   * @param value2 查询字段值，当type 不是 number 的时候必填
   */
  public addPredicater(key, type, value1, value2?: string) {
    let str: string = ""
    switch (type) {
      case "equal":
        str = `${key} = '${value1}'`
        break
      case "between":
        str = `${key} between ${value1} and ${value2}`
        break
      case "like":
        str = `${key} like '%${value1}%'`
        break
    }
    this.predicateList.push(str)
  }

  /**
   * 编译成cql where 语句
   */
  public build() {
    return this.predicateList.length ? `[${this.predicateList.join(' and ')}]` : ""
  }
}