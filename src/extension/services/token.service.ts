import { ExtendService, RequestParams } from '~/core/http'
import store from '~/store'

export class TokenService extends ExtendService {
  public before = (params) => {
    if (!store.state.userToken) {
      return
    }

    params.options.header = params.options.header || {}
    params.options.header['X-OperatorToken'] = store.state.userToken
  }
}