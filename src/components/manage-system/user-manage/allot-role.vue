<template>
  <section class="component allot-role">

    <data-box ref="table" :data="dataSet" :selectionList.sync="selectionList">
      <template slot="columns">
        <!--数据列区域-->
        <el-table-column label="角色名称">
          <template slot-scope="scope">{{ scope.row.roleName }}</template>
        </el-table-column>
        <el-table-column prop="roleStatus" label="角色状态">
          <template slot-scope="scope">
            <span>{{scope.row.roleStatus === "ENABLED" ? "启用" : "停用"}}</span>
          </template>
        </el-table-column>
      </template>
    </data-box>

    <div class="operate-buttons">
      <el-button @click="emitClose">取消</el-button>
      <el-button @click="commit">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from "vue-property-decorator"
import DataBox from "~/components/common/data-box.vue"
import { User } from '@/models/user.model'
import { Role } from '@/models/role.model'

@Component({
  components: {
    DataBox
  }
})
export default class AllotRole extends Vue {

  @Prop({
    required: true,
    type: User,
    default: () => new User()
  })
  private user!: User
  private selectionList: any[] = []
  private role = new Role()
  private dataSet: any[] = []

  @Watch('user', { immediate: true, deep: true })
  private onUserDataChange() {
    if (!this.user.id) return
    this.setSelectedRoles()
  }

  @Emit("close")
  private emitClose() {
    // 关闭窗口
    this.selectionList = []
  }


  @Emit("success")
  private success() {
    this.$message.success("操作成功")
    this.emitClose()
  }


  /**
   * 设置选中角色ID
   */
  private setSelectedRoles() {
    this.selectionList = this.dataSet.filter(data => {
      return this.user.roleIds.includes(data.id)
    })
  }

  /**
   * 钩子函数
   */
  private mounted() {
    this.role.getAll().subscribe(
      data => {
        this.dataSet = data.map(v => ({ ...v }))
        this.setSelectedRoles()
      })
  }

  private commit() {
    this.user.roleIds = this.selectionList.map(v => v.id)
    this.user.updateRoles().subscribe(this.success)
  }
}
</script>
