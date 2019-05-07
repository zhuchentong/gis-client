<template>
  <section class="component module-permission">
    <data-box ref="table" :data="dataSet" :selectionList.sync="selectionList">
      <template slot="columns">
        <el-table-column prop="resourceName" label="功能页面"></el-table-column>
        <el-table-column prop="menuName" label="所属目录"></el-table-column>
        <el-table-column prop="remark" label="描述"></el-table-column>
      </template>
    </data-box>

    <div class="operate-buttons">
      <el-button @click="emitClose ">取消</el-button>
      <el-button @click="saveModule">保存</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import { Tree } from "element-ui"
import { Component, Vue, Emit, Prop, Watch } from "vue-property-decorator"
import { DepartmentService } from "~/services/department.service"
import { Role } from "~/models/role.model"
import DataBox from "~/components/common/data-box.vue"
import { CommonService } from '@/utils/common.service'

@Component({
  components: {
    DataBox
  }
})
export default class ModulePermission extends Vue {

  @Prop({
    type: Role,
    default: () => new Role()
  })
  private role!: Role
  private dataSet: any = []

  private selectionList: any = []

  @Emit("close")
  private emitClose() { return }

  @Emit("success")
  private success() {
    this.$message.success("操作成功")
    this.selectionList = []

    this.emitClose()
  }


  @Watch('role', { deep: true })
  private onRoleChange(val) {
    this.selectionList = this.dataSet.filter(x => this.role.resourceIds.includes(x.id))
  }

  /**
   * 保存点击
   */
  private saveModule() {
    const ids: string[] = []
    this.selectionList.forEach(v => {
      ids.push(v.id)
      if (v.parentId) ids.push(v.parentId)
    })
    this.role.resourceIds = Array.from(new Set<string>(ids))
    this.role.attachResource().subscribe(this.success)
  }

  private mounted() {
    this.role.getResourcesList().subscribe(data => {
      const pageList = data.filter(x => x.resourceType === 18).sort((a, b) => a.sort - b.sort)
      pageList.forEach(v => {
        const menu = data.find(x => x.id === v.parentId)
        v.menuName = (menu || v).resourceName
        v.parentId = menu ? menu.id : null
      })
      this.dataSet = pageList
      this.onRoleChange(this.role)
    })
  }
}
</script>
