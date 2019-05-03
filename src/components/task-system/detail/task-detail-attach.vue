<template>
  <section class="component task-detail-attach">
    <div class="text-right">
      <el-button>添加照片</el-button>
      <el-button>添加视频</el-button>
    </div>
    <div class="content">
      <common-title title="巡查信息" iconName="info"></common-title>
      <p>{{result.message}}</p>
      <common-title title="巡查照片" iconName="info"></common-title>
      <div>
        <img v-img v-for="(item,index) of result.images" :key="index" :src="item" class="content-image">
      </div>
      <common-title title="巡查视频" iconName="info"></common-title>
      <div>
        <video v-for="(item,index) of result.video" :key="index" :src="item" class="content-video"></video>
      </div>
    </div>

  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import { BusinessFlowModel } from "~/models/business-flow.model"
import ViewAttach from "~/components/business-common/view-attach.vue"

@Component({
  components: {
    ViewAttach
  }
})
export default class extends Vue {
  @Prop()
  private flowId!: string
  private businessFlowModel = new BusinessFlowModel()
  private result = {
    message: "暂未发现问题，建议后续跟进",
    images: [
      "https://tse4-mm.cn.bing.net/th?id=OIP.bP9MneHaK-ccDUhq0JdtqgHaE7&w=300&h=199&c=7&o=5&dpr=1.25&pid=1.7",
      "https://tse4-mm.cn.bing.net/th?id=OIP.bP9MneHaK-ccDUhq0JdtqgHaE7&w=300&h=199&c=7&o=5&dpr=1.25&pid=1.7",
      "https://tse4-mm.cn.bing.net/th?id=OIP.bP9MneHaK-ccDUhq0JdtqgHaE7&w=300&h=199&c=7&o=5&dpr=1.25&pid=1.7",
      "https://tse4-mm.cn.bing.net/th?id=OIP.bP9MneHaK-ccDUhq0JdtqgHaE7&w=300&h=199&c=7&o=5&dpr=1.25&pid=1.7",
      "https://tse4-mm.cn.bing.net/th?id=OIP.bP9MneHaK-ccDUhq0JdtqgHaE7&w=300&h=199&c=7&o=5&dpr=1.25&pid=1.7"
    ],
    video: [
      "http://ips.ifeng.com/video19.ifeng.com/video09/2017/06/02/4307993-102-009-152149.mp4?vid=db5187f6-66a5-4c30-b719-d0d457636ca5&uid=1551774845645_smon6b10&from=v_Free&pver=vHTML5Player_v2.0.0&sver=&se=%E6%8B%89%E7%89%87&cat=70-73&ptype=70&platform=pc&sourceType=h5&dt=1496386921000&gid=k_RPAWp9g0YC&sign=ba2d9e86bd10cdf872e2cac9c69740df&tm=1556883916294",
      "http://ips.ifeng.com/video19.ifeng.com/video09/2017/06/02/4307993-102-009-152149.mp4?vid=db5187f6-66a5-4c30-b719-d0d457636ca5&uid=1551774845645_smon6b10&from=v_Free&pver=vHTML5Player_v2.0.0&sver=&se=%E6%8B%89%E7%89%87&cat=70-73&ptype=70&platform=pc&sourceType=h5&dt=1496386921000&gid=k_RPAWp9g0YC&sign=ba2d9e86bd10cdf872e2cac9c69740df&tm=1556883916294",
      "http://ips.ifeng.com/video19.ifeng.com/video09/2017/06/02/4307993-102-009-152149.mp4?vid=db5187f6-66a5-4c30-b719-d0d457636ca5&uid=1551774845645_smon6b10&from=v_Free&pver=vHTML5Player_v2.0.0&sver=&se=%E6%8B%89%E7%89%87&cat=70-73&ptype=70&platform=pc&sourceType=h5&dt=1496386921000&gid=k_RPAWp9g0YC&sign=ba2d9e86bd10cdf872e2cac9c69740df&tm=1556883916294",
    ]
  }


  @Watch('flowId', { immediate: true })
  private onIdChange(value) {
    // this.dataSet = []
    // value && this.businessFlowModel.getBusinessFileByFlowId(value).subscribe(
    //   data => this.dataSet = data
    // )
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
    &-image {
      max-width: 180px;
      max-height: 120px;
      margin: 0 10px 10px 0px;
    }
    &-video {
      max-width: 180px;
      max-height: 120px;
      margin: 0 10px 10px 0px;
    }
  }
}
</style>


