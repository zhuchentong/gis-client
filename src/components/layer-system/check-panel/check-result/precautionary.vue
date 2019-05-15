<template>
  <section class="component precautionary">
    <label-container :column="1" :labelWidth="120">
      <label-item label="基本农田占用检测">
        <label>
          <i class="el-icon-warning"></i>
          压占基本农田，疑似违法用地，请核实！</label>
      </label-item>
      <label-item label="基本农田保护区"></label-item>
      <label-item label="一般农用地"></label-item>
    </label-container>
    <label-container :column="1" :labelWidth="120">
      <label-item label="非允许建设区检测">
        <label>
          <i class="el-icon-warning"></i>
          压占非允许建设区，疑似违法用地，请核实！</label>
      </label-item>
      <label-item label="允许建设区"></label-item>
      <label-item label="有条件建设区"></label-item>
      <label-item label="限制建设区"></label-item>
      <label-item label="禁止建设区"></label-item>
    </label-container>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class Precautionary extends Vue {

  private data: any = {}

}
</script>
