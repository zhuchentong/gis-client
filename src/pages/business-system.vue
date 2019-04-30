<template>
  <base-col-three class="page business-system">
    <!-- <div slot="left">
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
    <div slot="content">123</div> -->
  </base-col-three>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Layout } from '@/core/decorator'
import BaseColThree from "~/components/common/base-col-three.vue"

@Layout('workspace')
@Component({
  components: {
    BaseColThree
  }
})
export default class extends Vue { }
</script>

