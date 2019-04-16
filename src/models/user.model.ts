import { Model } from '~/core/model'
import { RequestParams } from '~/core/http'
import { PageService } from '@/extension/services/page.service'
import { Expose } from 'class-transformer'

export class User extends Model {
  public username: string = ''
  public userTitle: string = ''
  public password: string = ''
  public departmentId: string = ''
  public oldPassword: string = ''
  public newPassword: string = ''
  public confirmPassword: string = ''
  public roleIds: string[] = []
  public id: string = ''
  // 默认启用
  public userStatus: string = 'ENABLED'
  private user
  private token
}
