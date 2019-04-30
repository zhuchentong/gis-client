<template>
  <base-col-three class="page task-system">
    <div slot="left">
      <div v-for="item of menus" :key="item.label" class="task-type-item" @click="selected = item" :class="{'task-type-item-activated': item.label === selected.label}">
        <svg-icon :iconName="item.icon" iconSize="32"></svg-icon>
        <div>{{item.label}}</div>
      </div>
    </div>
    <div slot="middle">
      <div class="search">
        <el-select v-model="workType">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="地灾巡查" value="地灾巡查"></el-option>
          <el-option label="违法用地" value="违法用地"></el-option>
          <el-option label="其他巡查" value="其他巡查"></el-option>
        </el-select>
      </div>
      <div class="no-data" v-if="!dataList.length"></div>
      <div v-else>
        <div v-for="item of dataList" :key="item.id" class="info-item" @click="infoId = item.id" :class="{'info-item-activated': infoId === item.id}">
          <label-item label="任务名称" :value="item.taskName"></label-item>
          <label-item label="外业类型" :value="item.taskName"></label-item>
          <label-item label="创建时间" :value="item.taskName | dateTimeFormat"></label-item>
        </div>
      </div>
    </div>
    <div slot="content">123</div>
  </base-col-three>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import BaseColThree from "~/components/common/base-col-three.vue"
import { MenuItems } from "~/components/task-system/task-system.config.ts"

@Component({
  components: {
    BaseColThree
  }
})
export default class TaskSystem extends Vue {

  private menus = MenuItems
  private selected = MenuItems[0]
  private dataList: any[] = []
  private infoId = ""
  private workType = "全部"

  @Watch("selected.type")
  private onTypeChange() {
    this.infoId = ""
    this.dataList = [
      {
        id: "1233442134132133212",
        taskName: "姚店村地灾巡查",
        taskType: "地灾巡查",
        createTime: '2018-04-30 14:00:02'
      },
      {
        id: "323234324324",
        taskName: "姚店村违法用地巡查",
        taskType: "违法用地巡查",
        createTime: '2018-04-30 14:00:02'
      },
      {
        id: "234534dfsg3",
        taskName: "姚店村其他巡查",
        taskType: "其他巡查",
        createTime: '2018-04-30 14:00:02'
      }
    ]
    if (this.dataList.length) {
      this.infoId = this.dataList[0].id
    }
  }

  private mounted() {
    this.onTypeChange()
  }

}
</script>

<style lang="less" scoped>
.page.task-system {
  .task-type-item {
    text-align: center;
    padding: 5px 0;
    background-color: #f2f2f2;
    &-activated {
      background-color: aquamarine;
    }
  }
  .info-item {
    padding: 5px 0 5px 10px;
    border-bottom: solid 2px #f3f3f3;
    &-activated {
      background-color: #ffffea;
    }
  }
}
</style>
