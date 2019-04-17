<template>
  <section class="layer-menu">
    <el-tabs
      type="border-card"
      class="fill"
    >
      <el-tab-pane
        v-for="(tools,key) of menuList"
        :key="key"
        :label="key"
      >
        <div class="row middle-span no-padding no-margin tool-panel">
          <el-button
            v-for="item of tools"
            :key="item.label"
            class="tool-item"
            type="text"
          >{{item.label}}</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class extends Vue {
  private readonly menuList = {
    测量: [
      {
        label: '测距'
      },
      {
        label: '测面'
      },
      {
        label: '测高'
      },
      {
        label: '填方'
      },
      {
        label: '挖方'
      }
    ],
    检索: [
      {
        label: '地块检索'
      },
      {
        label: '建筑检索'
      },
      {
        label: '辅助选址'
      }
    ],
    视角: [
      {
        label: '三维视角'
      },
      {
        label: '二维视角'
      },
      {
        label: '放大'
      },
      {
        label: '缩小'
      },
      {
        label: '重置'
      },
      {
        label: '巡视'
      }
    ],
    检测: [
      {
        label: '控制线检测'
      },
      {
        label: '巡查结果检测'
      },
      {
        label: '图层检测'
      }
    ],
    地灾: [
      {
        label: '地灾点展示'
      },
      {
        label: '地灾点查询'
      }
    ],
    项目: [
      {
        label: '项目查询'
      }
    ]
  }
}
</script>


<style lang="less">
.layer-menu {
  height: 100%;
  .el-tabs__content {
    padding: 0;
  }
}
</style>

<style lang="less" scoped>
.layer-menu {
  height: 100%;
  .tool-panel {
    height: 40px;
  }
  .tool-item {
    color: black;
    margin: 0 20px;
  }
}
</style>

