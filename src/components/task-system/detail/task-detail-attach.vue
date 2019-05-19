<template>
  <section class="component task-detail-attach">
    <div v-if="!id" class="no-data"></div>
    <div v-else>
      <div class="text-right add-attach-btn">
        <el-button @click="dialog.appendAttach = true">添加附件</el-button>
      </div>
      <div class="container-full-page">
        <el-card header="巡查信息">
          <p style="text-indent: 2em;">
            {{ content || '暂无巡查信息!' }}
          </p>
        </el-card>
        <el-card header="巡查照片">
          <p style="text-indent: 2em;" v-if="!image.length">暂无数据!</p>
          <view-file-info
            v-else
            v-for="item of image"
            :key="item.id"
            :fileInfo="item"
            class="content-file"
          ></view-file-info>
        </el-card>
        <el-card header="巡查视频">
          <p style="text-indent: 2em;" v-if="!video.length">暂无数据!</p>
          <view-file-info
            v-else
            v-for="item of video"
            :key="item.id"
            :fileInfo="item"
            class="content-file"
          ></view-file-info>
        </el-card>
      </div>
    </div>
    <el-dialog
      title="添加附件"
      :center="true"
      :visible.sync="dialog.appendAttach"
      width="750px"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <append-task-attach
        :id="id"
        @close="dialog.appendAttach = false"
        @success="onIdChange"
      ></append-task-attach>
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

  private result: any
  private dialog = {
    appendAttach: false
  }

  private content = ""
  private image: any[] = []
  private video: any[] = []

  @Watch('id', { immediate: true })
  private onIdChange() {
    const params = { id: this.id }
    this.id && this.service.getPatrolResultById(new RequestParams(params))
      .subscribe(data => {
        this.content = data.content
        this.image = data.uploadFiles.filter(x => FileType.PICTURE.value.includes(x.extensionName.toLowerCase()))
        this.video = data.uploadFiles.filter(x => FileType.MP4.value.includes(x.extensionName.toLowerCase()))
      })
  }

}
</script>

<style lang="less" scoped>
.component.task-detail-attach {
  position: relative;
  .content-file {
    margin: 0 9px 9px 0;
  }
  .add-attach-btn {
    padding-right: 30px;
  }
}
</style>


