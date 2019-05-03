<template>
  <el-select v-model="selectedUser" filterable :filter-method="localFind" :disabled="disabled">
    <el-option-group v-for="{deptId,deptName} of deparentList" :key="deptId" :label="deptName">
      <el-option v-for="{id,label} of getUserList(deptId)" :key="id" :label="label" :value="id">
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script lang="ts">
import { Component, Vue, Emit, Model, Prop } from "vue-property-decorator"
import { User } from '@/models/user.model'
import { FilterService } from '@/utils/filter.service'

@Component({
  components: {}
})
export default class UserSelect extends Vue {

  @Prop({
    type: Boolean,
    default: false
  })
  private disabled!: boolean

  private userDataSet: any[] = []
  private filterDataSet: any[] = []
  private queryModel = new User()

  @Model("select-change") private userId!: string
  @Emit('select-change')
  private emitSelectChange(val) { return }

  private get selectedUser() {
    return this.userId
  }

  private set selectedUser(val) {
    this.emitSelectChange(val)
  }


  private mounted() {
    this.queryModel.getChildrenByDeptId().subscribe(data => {
      this.userDataSet = data
      this.filterDataSet = this.userDataSet
    })
  }

  private get deparentList() {
    const list: any[] = []
    this.filterDataSet.forEach(v => {
      if (!list.find(x => x.deptId === v.departmentId)) {
        list.push({
          deptId: v.departmentId,
          deptName: v.departmentName
        })
      }
    })
    return list
  }


  private getUserList(deptId: string) {
    return this.filterDataSet.filter(x => x.departmentId === deptId).map(v => {
      return {
        id: v.id,
        label: v.userTitle ? `${v.username} / ${FilterService.dictConvert(v.userTitle, 'UserTitle')}` : v.username
      }
    })
  }

  private localFind(query: string) {
    if (!query) {
      this.filterDataSet = this.userDataSet
    } else {
      this.filterDataSet = this.userDataSet.filter(x => x.username.indexOf(query) > -1)
    }
  }

}
</script>

<style lang="less" scoped>
</style>
