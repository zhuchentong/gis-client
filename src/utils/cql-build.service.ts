export class CqlBuilder {

  private predicateList: any = []

  /**
   * @param key 查询的字段
   * @param type 查询方式
   * @param value1 查询字段值
   * @param value2 查询字段值，当type 不是 number 的时候必填
   */
  public addPredicater(key, type, value: string | any[]) {
    let str: string = ""
    switch (type) {
      case "equal":
        str = `"${key}" = '${value}'`
        break
      case "between":
        str = `"${key}" between ${value[0]} and ${value[1]}`
        break
      case "like":
        str = `"${key}" like '%${value}%'`
        break
      case "in":
        const qeuryValue = typeof value === "string" ? [value] : value
        str = `"${key}" in (${qeuryValue.join()})`
        break
    }
    this.predicateList.push(str)
  }

  /**
   * 编译成cql where 语句
   */
  public build() {
    return this.predicateList.length ? `${this.predicateList.join(' and ')}` : ""
  }
}