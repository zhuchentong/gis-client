<template>
  <section class="component business-detail-attach">
    <data-box :data="dataSet">
      <template slot="columns">
        <el-table-column label="原始文件名" prop="originName"></el-table-column>
        <el-table-column label="文件名称" prop="fileName"></el-table-column>
        <el-table-column label="扩展名称" prop="extensionName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="preview(scope.row)">预览</el-button>
            <el-button type="text" @click="download(scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import { BusinessFlowModel } from "~/models/business-flow.model"

@Component({
  components: {
    DataBox
  }
})
export default class extends Vue {
  @Prop()
  private flowId!: string
  private businessFlowModel = new BusinessFlowModel()
  private dataSet = [
    {
      fileId: "123332",
      originName: "环保批文",
      fileName: "120ssdff993ks9f3",
      extensionName: ".pdf",
    },
    {
      fileId: "123333",
      originName: "施工计划",
      fileName: "120ssdff993ks9f3",
      extensionName: ".pdf",
    },
    {
      fileId: "123334",
      originName: "位置文件",
      fileName: "120ssdff993ks9f3",
      extensionName: ".txt",
    }
  ]

  private preview(row) {
    // 
  }

  private download(row) {
    // 
  }

  @Watch('flowId', { immediate: true })
  private onIdChange(value) {
    this.dataSet = []
    value && this.businessFlowModel.getBaseInfo(value).subscribe(
      data => this.dataSet = data
    )
  }

}
</script>

<style lang="less" scoped>
.component.business-detail-info {
  .detail-item {
    padding: 20px;
    border-bottom: solid 2px #f3f3f3;
  }
}
</style>


