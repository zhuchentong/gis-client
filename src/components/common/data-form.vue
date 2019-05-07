<template>
  <section class="component data-form">
    <el-form ref="data-form" label-width="120px" :inline="true" :rules="rules" label-position="right" :model="model">
      <div ref="inputs" class="inputs">
        <slot name="inputs"></slot>
      </div>

      <el-form-item class="operate-button" ref="operate-button">
        <el-button @click="submitForm" class="search-button">搜索</el-button>
        <el-button @click="resetForm" class="reset-button">重置</el-button>
      </el-form-item>

      <el-form-item>
        <slot name="default-button"></slot>
      </el-form-item>

      <div class="row middle-span center-span collapse-icon more-container" @click="changeCollapseHandle" v-if="showCollapseIcon">
        <div class="more-content">
          <span class="more-button">{{`${showCollapseContext ? '收起' :'更多'}搜索`}}</span>
          <svg-icon :class="[showCollapseContext ? 'arrow-up':'arrow-down']" class="more-button" iconName="xiala"></svg-icon>
        </div>
      </div>
    </el-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Watch, Prop, Emit } from "vue-property-decorator"
import { Form } from "element-ui"
import { PageService } from "~/extension/services/page.service"
import SvgIcon from "~/components/common/svg-icon.vue"

@Component({
  components: {
    SvgIcon
  }
})
export default class DataForm extends Vue {
  // 验证规则
  @Prop()
  private rules!: any
  // 数据模型
  @Prop()
  private model!: any
  // 数据模型
  @Prop()
  private page!: PageService

  private showCollapseIcon: boolean = true
  private showCollapseContext: boolean = false
  private inputs!: Element

  @Watch("rules")
  private onRulesChange(val) {
    return
  }
  @Emit("onSearch")
  private onSearch() {
    return
  }

  @Emit("handleResetForm") // 手动清空输入框
  private handleResetForm() {
    return
  }

  private beforeCreate() {
    const inputSlot = this.$slots.inputs
    if (!inputSlot) return
  }

  /**
   * 初始化
   */
  private mounted() {
    this.inputs = this.$refs.inputs as Element
    this.$nextTick(() => this.setVisiableElement())
  }

  private setVisiableElement(showFlag = false) {
    if (!this.inputs) return

    const elformItems = this.inputs.getElementsByClassName("el-form-item")
    if (!elformItems.length) return

    if (!showFlag) {
      const itemCountInOneLine = Math.floor(
        (this.$el as HTMLElement).offsetWidth / (elformItems[0].clientWidth + 5)
      )
      const hiddenMaxCount = Math.abs(itemCountInOneLine - 1)
      if (elformItems.length <= hiddenMaxCount) {
        this.showCollapseIcon = false
        return
      }
      for (let index = hiddenMaxCount; index < elformItems.length; index++) {
        const item = elformItems.item(index)
        if (item && !item.classList.contains("hidden-item")) {
          item.classList.add("hidden-item")
        }
      }
    } else {
      for (let index = 0; index < elformItems.length; index++) {
        const item = elformItems.item(index)
        if (item) item.classList.remove("hidden-item")
      }
    }
  }

  /**
   * 提交输入表单
   */
  private submitForm() {
    const dataForm = this.$refs["data-form"] as Form
    dataForm.validate(success => {
      if (!success) {
        return
      }

      if (this.page) {
        this.page.reset()
      }

      this.onSearch()
    })
  }

  /**
   * 重置输入表单
   */
  private resetForm() {
    const dataForm = this.$refs["data-form"] as Form
    dataForm.resetFields()
    this.handleResetForm()
  }

  /**
   * 折叠状态改变
   */
  private changeCollapseHandle() {
    this.showCollapseContext = !this.showCollapseContext
    this.setVisiableElement(this.showCollapseContext)
  }
}
</script>

<style lang="less" scoped>
.component.data-form {
  padding: 10px;
  .inputs {
    display: contents;
  }
  .operate-button {
    margin-left: 60px !important;
  }
  .hidden-item {
    display: none;
  }
  .arrow-down {
    transform: rotate(0deg);
    transition: transform ease-in 0.2s;
  }

  .arrow-up {
    transform: rotate(180deg);
    transition: transform ease-in 0.2s;
  }

  .collapse-icon {
    height: 30px;
  }
  .more-button {
    margin-right: 5px;
  }
  @border-color: #dee1e5;
  .more-container {
    border-top: solid 1px @border-color;
    :hover {
      cursor: pointer;
    }
  }
  .more-content {
    border: solid 1px @border-color;
    padding: 2px 10px;
    border-top-color: white;
    margin-top: -3px;
  }
}
</style>
<style lang="less">
.component.data-form {
  .hidden-item {
    display: none;
  }
}
</style>

