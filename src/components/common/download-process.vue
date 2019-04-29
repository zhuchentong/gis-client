<template>
  <section class="component download-process">
    <common-title title="下载进度通知" :showIcon="false">
      <template slot="append">
        <a title="关闭" @click="() => setShowState(false)">
          <svg-icon class="close-icon" iconName="zengjia"></svg-icon>
        </a>
      </template>
    </common-title>
    <div class="content">
      <div class="download-item" v-for="(item,index) of fileList" :key="index">
        <div class="download-file-name" :title="item.filename">{{item.filename}}</div>
        <el-progress :percentage="item.percentage" :status="item.percentage === 100 ? 'success' : ''"></el-progress>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { namespace } from "vuex-class"
import SvgIcon from "~/components/common/svg-icon.vue"
import { Property } from 'cesium/Cesium'
import { IFileInfo } from "~/models/interface/i-file-info.interface.ts"
import CommonTitle from "~/components/common/common-title.vue"

const DownloadProcessModule = namespace('downloadProcessModule')

@Component({
  components: {
    SvgIcon,
    CommonTitle
  }
})
export default class DownloadProcess extends Vue {
  @DownloadProcessModule.Mutation private setShowState!: () => void
  @DownloadProcessModule.Mutation private deleteDownLoadInfo!: () => void
  @DownloadProcessModule.Mutation private addDownLoadInfo!: () => void
  @DownloadProcessModule.State private fileList!: any[]

}
</script>

<style lang="less" scoped>
.component.download-process {
  width: 450px;
  background-color: #fff;
  @shadow-color: #d4d4d4;
  box-shadow: -1px 6px 13px 0px @shadow-color;
  .content {
    max-height: 280px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      background-color: #b4b4b4;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      border-radius: 10px;
      background-color: #e2e2e2;
    }
  }

  .close-icon {
    transform: rotate(45deg);
  }
  .download-item {
    margin: 10px;
    padding: 10px;
    border: solid 1px #fff;
    box-shadow: 2px 3px 10px 0px @shadow-color;
    &:hover {
      box-shadow: 2px 3px 10px 0px #b2b2b2;
    }
    .download-file-name {
      height: 40px;
      line-height: 40px;
      text-overflow: ellipsis;
      width: 350px;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>
