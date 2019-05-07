import { Model } from '~/core/model'

export class DepartmentModel extends Model {
  public departmentCode: string = ""
  public departmentName: string = ""
  public parentId: string = ""
  public id: string = ""
}
