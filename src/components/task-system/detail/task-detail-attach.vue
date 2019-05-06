<template>
  <section class="component task-detail-attach">
    <div class="text-right">
      <el-button @click="dialog.appendAttach = true">添加附件</el-button>
    </div>
    <div class="content">
      <common-title title="巡查信息" iconName="info"></common-title>
      <p style="text-indent: 2em;">{{result.content}}</p>
      <common-title title="巡查照片" iconName="info"></common-title>
      <view-file-info v-for="item of result.image" :key="item.id" :fileInfo="item" class="content-file"></view-file-info>

      <common-title title="巡查视频" iconName="info"></common-title>
      <view-file-info v-for="item of result.video" :key="item.id" :fileInfo="item" class="content-file"></view-file-info>
    </div>

    <el-dialog title="添加附件" :center="true" :visible.sync="dialog.appendAttach" width="750px" :show-close="false" :close-on-click-modal="false">
      <append-task-attach :id="id" @close="dialog.appendAttach = false" @success="onIdChange"></append-task-attach>
      <div></div>
    </el-dialog>

  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { PatrolInfoService } from "~/services/patrol-info.service"
import { Inject } from "typescript-ioc"
import { RequestParams } from '~/core/http'
import ViewFileInfo from "~/components/common/view-file-info.vue"
import { FileType } from "~/config/enum.config"
import AppendTaskAttach from "~/components/task-system/add-new/append-task-attach.vue"

@Component({
  components: {
    ViewFileInfo,
    AppendTaskAttach
  }
})
export default class extends Vue {
  @Prop()
  private id!: string

  @Inject
  private service!: PatrolInfoService

  private result = {}
  private dialog = {
    appendAttach: false
  }


  @Watch('id', { immediate: true })
  private onIdChange() {
    this.result = {}
    const params = { id: this.id }
    this.id && this.service.getPatrolResultById(new RequestParams(params))
      .subscribe(data => {
        this.result = {
          content: data.content,
          image: data.uploadFiles.filter(x => FileType.PICTURE.value.includes(x.extensionName.toLowerCase())),
          video: data.uploadFiles.filter(x => FileType.MP4.value.includes(x.extensionName.toLowerCase()))
        }
      })
  }

}
</script>

<style lang="less" scoped>
.component.task-detail-attach {
  position: relative;
  .content {
    position: absolute;
    top: 50px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    overflow: auto;
    &-file {
      margin: 0 30px 15px 0;
    }
  }
}
</style>


