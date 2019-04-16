import { ExtendService, RequestParams } from '~/core/http'

export class PageService extends ExtendService {
  public default = {
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    pageSizeOpts: [10, 50, 100, 200]
  }
  public pageSize: number
  public pageIndex: number
  public total: number
  public pageSizeOpts: number[]

  constructor(data?: any) {
    super()

    if (data) this.default = data

    this.pageSize = this.default.pageSize
    this.pageIndex = this.default.pageIndex || 1
    this.total = this.default.total
    this.pageSizeOpts = this.default.pageSizeOpts
  }

  public before = params => {
    params.data = {
      ...params.data,
      size: this.pageSize,
      page: this.pageIndex - 1
    }
  }

  public after = (data: any, params) => {
    this.total = data.totalElements
  }

  public reset() {
    this.pageIndex = this.default.pageIndex
    this.pageSize = this.default.pageSize
  }
}
