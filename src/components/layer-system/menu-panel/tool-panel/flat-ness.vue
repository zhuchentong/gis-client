<template>
  <section class="component flat-ness">
      <el-form :model="model" label-width="110px" ref="form">
            <el-form-item label="基准面高程：" prop="land">
            <span slot="append">{{ }}</span>
        </el-form-item>
        <el-form-item label="预计平整高度：" prop="land">
          <el-input v-model="model.land" type="number" :min="0" :max="999999">
             <span slot="append">米</span>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="operate-buttons">
      <el-button>测算</el-button>
      </div>
      <div>
      <p>测量结果</p>
      <el-card class="approve-steps-item">
      <label-item label="最高点"></label-item>
      <label-item label="最低点"></label-item>
      <label-item label="填方量"></label-item>
      <label-item label="挖方量"></label-item>
      <label-item label="填挖方总量"></label-item>
      <label-item label="填挖区域面积"></label-item>
      <label-item label="挖方区域面积"></label-item>
      <label-item label="填挖区域面积"></label-item>
      <label-item label="区域总面积"></label-item>
      </el-card>
      </div>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class FlatNess extends Vue {

    private model:any={
        land:""
    }
}
</script>
