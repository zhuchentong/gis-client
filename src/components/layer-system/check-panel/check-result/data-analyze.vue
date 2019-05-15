<template>
  <section class="component data-analyze">
    <common-title :showIcon="false" title="建设用地管制区"></common-title>
    <label-container :column="1" :labelWidth="120">
      <label-item label="允许建设区"></label-item>
      <label-item label="有条件建设区"></label-item>
      <label-item label="限制建设区"></label-item>
      <label-item label="禁止建设区"></label-item>
    </label-container>
    <common-title :showIcon="false" title="控制性详情规划"></common-title>
    <label-container :column="1" :labelWidth="120">
      <label-item label="住宅用地"></label-item>
      <label-item label="医院用地"></label-item>
    </label-container>
    <common-title :showIcon="false" title="土地用途区"></common-title>
    <label-container :column="1" :labelWidth="120">
      <label-item label="基本农田保护区"></label-item>
      <label-item label="一般农地区"></label-item>
    </label-container>
    <common-title :showIcon="false" title="土地变更现状"></common-title>
    <label-container :column="1" :labelWidth="120">
      <label-item label="旱地"></label-item>
      <label-item label="园地"></label-item>
    </label-container>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import { FlowInfoService } from "~/services/flow-info.service"
import { RequestParams } from "~/core/http/"
import { Inject } from "typescript-ioc"
import { PageService } from "~/extension/services/page.service"

@Component({
  components: {
    DataBox
  }
})
export default class DataAnalyze extends Vue {



}
</script>
