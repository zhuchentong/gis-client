<template>
  <section class="component data-box">
    <div class="row between-span" v-if="showTopSlot">
      <div class="text-left">
        <slot name="buttons"></slot>
      </div>
      <div class="text-right">
        <slot name="append"></slot>
      </div>
    </div>
    <div class="table">
      <el-table :emptyText="emptyText" :row-class-name="rowClassName" :height="tableHeight()" :max-height="maxHeight" tooltip-effect="dark" ref="table" :data="data" border :stripe="stripe" :highlight-current-row="selectionRow!=undefined" @current-change="updateSelectionRow" @select="updateSelectionList" @select-all="updateSelectionList" @row-click.self="onRowClick" @row-dblclick="emitRowdbClick" @sort-change="onSortChange" @header-click="onHeaderClick">
        <el-table-column v-if="selectionList" type="selection" width="40"></el-table-column>
        <el-table-column v-if="!hiddenIndex" type="index" :label="indexLabel" width="50"></el-table-column>
        <slot name="columns"></slot>
      </el-table>
    </div>
    <div class="row between-span">
      <div class="databox-title">
        <slot name="footer"></slot>
      </div>
      <el-pagination v-if="showPage&&page&&data&&data.length>0" size="small" :layout="page.layout" :total="page.total" :current-page.sync="page.pageIndex" :page-size.sync="page.pageSize" :page-sizes="page.pageSizeOpts" @size-change="pageSizeChange" @current-change="pageIndexChange"></el-pagination>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Watch, Prop, Emit } from "vue-property-decorator"
import { PageService } from "~/extension/services/page.service"
import { SortService } from "~/extension/services/sort.service"
import { Table } from "element-ui"

@Component({
  components: {}
})
export default class DataBox extends Vue {
  public table: any
  // 数据列表
  @Prop()
  private data!: any[]
  // 分页数据
  @Prop()
  private page!: PageService
  // 隐藏分页
  @Prop({ default: true })
  private showPage!: boolean
  // 分页数据
  @Prop()
  private sort!: SortService
  // 选择列表
  @Prop()
  private selectionList!: any[]
  // 选择项
  @Prop()
  private selectionRow!: any
  // 最大高度
  @Prop({ default: 480 })
  private maxHeight!: number
  // 默认高度
  @Prop()
  private height!: number
  // 隐藏索引列
  @Prop({ type: Boolean })
  private hiddenIndex!: boolean
  // 索引列 列头名称
  @Prop({
    type: String,
    default: "序号"
  })
  private indexLabel!: any
  // 列样式
  @Prop({
    type: Function,
    default: () => ""
  })
  private rowClassName!: () => void
  // 斑马线
  @Prop({
    default: true
  })
  private stripe!: boolean
  // 自动滚动到顶部
  @Prop({ default: false })
  private autoScrollTop!: boolean

  private sortProperty: string = ""


  /**
   *  清除选择项
   */
  public clearSelection() {
    this.table.clearSelection()
    this.table.setCurrentRow()
  }

  // 分页信息改变消息
  @Emit("onPageChange")
  private pageConfigChange(page) {
    return
  }
  // 更新选择项列表
  @Emit("update:selectionList")
  private updateSelectionList(list) {
    return
  }
  // 更新当前选择项
  @Emit("update:selectionRow")
  private updateSelectionRow(row) {
    return
  }

  // 监听当前选中行变化
  @Watch("selectionRow")
  private onSelectionRowChange(val: string, oldVal: string) {
    this.$nextTick(() => {
      this.table.setCurrentRow(val)
      if (!this.autoScrollTop) return
      this.$nextTick(() => {
        const currentRowHtml = this.table.bodyWrapper.getElementsByClassName("current-row")[0]
        if (currentRowHtml) {
          this.table.bodyWrapper.scrollTop = currentRowHtml.offsetTop
        }
      })
    })
  }

  // 监听当前选中列表变化
  @Watch("selectionList", { immediate: true })
  private onSelectionListChanged(val: any[], oldVal: any[]) {
    if (!val) {
      return
    }
    //  等待data 渲染完毕之后再进行选中行赋值
    this.$nextTick(() => {
      this.data.forEach(row => {
        const checkFlag = this.selectionList.includes(row)
        this.table.toggleRowSelection(row, checkFlag)
      })
    })
  }

  /**
   * 行点击事件
   */
  @Emit("onRowClick")
  private onRowClick(row, column, event) {
    return
  }

  /**
   * 行双击
   */
  @Emit("onRowdbClick")
  private emitRowdbClick(row, column, event) {
    return
  }

  private tableHeight() {
    return this.height || this.maxHeight
  }


  private get emptyText() {
    return this.data ? "暂无数据" : " "
  }
  /**
   * 组件初始化
   */
  private mounted() {
    this.table = this.$refs["table"] as any
  }

  /**
   * 监听绑定数据变化
   */
  @Watch("data")
  private onDataChanged(newVal: string, oldVal: string) {
    return
  }

  /**
   * 页码数量变化回调
   */
  private pageSizeChange(value) {
    this.page.pageIndex = 1
    this.page.pageSize = value
    this.pageConfigChange(this.page)
  }

  /**
   * 页码位置变化回调
   */
  private pageIndexChange(value) {
    this.page.pageIndex = value
    this.pageConfigChange(this.page)
  }

  /**
   * 排序改变
   */
  private onSortChange({ column, prop, order }) {
    this.sortProperty = prop

    if (this.sort) {
      this.sort.update(prop, order)
    }
  }

  /**
   * 点击表头
   */
  private onHeaderClick(column, event) {
    // 排序触发
    if (this.sort && column.sortable) {
      // 移除排序项
      if (!this.sortProperty) this.sort.remove(column.property)

      this.pageConfigChange(this.page)
    }
  }

  private get showTopSlot() {
    return !!(this.$slots.buttons || this.$slots.append)
  }
}
</script>

<style lang="less" scoped>
.component.data-box {
  padding: 10px;
  & > * {
    margin-bottom: 10px;
  }
}
</style>
<style lang="less">
.data-box.component {
  .el-table {
    thead th {
      height: 26px;
      line-height: 26px;
      background-color: #f5f5f5;
      color: #8c8c8c;
      font-size: 12px;
      padding: 0;
      text-align: center;
    }
  }
}
</style>
