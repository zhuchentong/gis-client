<template>
  <section class="component modify-password">
    <el-form
      :model="user"
      :rules="rules"
      ref="form"
      label-width="120px"
      class="text-left"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          type="password"
          v-model="user.oldPassword"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          type="password"
          v-model="user.newPassword"
          auto-complete="off"
          @input="passwordChange"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPassword">
        <el-input type="password" v-model="user.confirmPassword"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="8" style="text-align:right">
          <span>弱</span>
        </el-col>
        <el-col :span="8" style="padding:7px">
          <el-progress
            :stroke-width="5"
            :show-text="false"
            :percentage="percentage"
          ></el-progress>
        </el-col>
        <el-col :span="8">
          <span>强</span>
        </el-col>
      </el-row>
    </el-form>
    <div class="operate-buttons">
      <el-button @click="close">取消</el-button>
      <el-button @click="confirm">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import { Form } from "element-ui"
import { Component, Vue, Emit, Prop } from "vue-property-decorator"
import { State, Mutation, Action, namespace } from "vuex-class"
import { User } from "~/models/user.model"

@Component({
  components: {}
})
export default class WorkPassword extends Vue {
  @State private userData!: any
  private user = new User()

  private percentage = 0

  // 数据校验规则
  private rules: any = {
    oldPassword: [
      { required: true, message: "请输入原密码", trigger: "blur" },
      {
        min: 6,
        max: 64,
        message: "密码长度不能小于6位大于64位",
        trigger: "blur"
      }
    ],
    newPassword: [
      { required: true, message: "请输入新密码", trigger: "blur" },
      {
        validator: (rule, value, callback) => {
          const pwd = this.user.newPassword
          const repwd = this.user.confirmPassword
          // 判断
          if (pwd !== "" && repwd !== "" && pwd !== repwd) {
            callback(new Error("请确认两次输入密码是否一致"))
          } else {
            callback()
          }
        },
        trigger: "blur"
      },
      {
        min: 6,
        max: 64,
        message: "密码长度不能小于6位大于64位",
        trigger: "blur"
      }
    ],
    confirmPassword: [
      { required: true, message: "请再次输入新密码", trigger: "blur" },
      {
        validator: (rule, value, callback) => {
          const pwd = this.user.newPassword
          const repwd = this.user.confirmPassword
          // 判断
          if (pwd !== "" && repwd !== "" && pwd !== repwd) {
            callback(new Error("请确认两次输入密码是否一致"))
          } else {
            callback()
          }
        },
        trigger: "blur"
      },
      {
        min: 6,
        max: 64,
        message: "密码长度不能小于6位大于64位",
        trigger: "blur"
      }
    ]
  }

  @Emit()
  private success() {
    this.$message.success("密码修改成功,请重新登录")
    this.close()
  }

  /**
   * 确定
   */
  private confirm() {
    const form = this.$refs.form as any
    form.validate(v => {
      if (!v) return
      this.user.id = this.userData.id
      this.user
        .changePassword()
        .subscribe(this.success,
          () => { this.$message.error("修改密码失败") }
        )
    })
  }

  /**
   * 密码复杂度验证
   */
  private passwordChange(value) {
    const regUpper = /[A-Z]/
    const regLower = /[a-z]/
    const regNum = /[0-9]/
    const regTeShu = new RegExp(
      "[`~!@#$^&*()=|{}':',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
    )

    this.percentage = 0
    // if(value.length<6) return

    if (regLower.test(value)) {
      this.percentage += 25
    }
    if (regUpper.test(value)) {
      this.percentage += 25
    }
    if (regNum.test(value)) {
      this.percentage += 25
    }
    if (regTeShu.test(value)) {
      this.percentage += 25
    }
  }

  @Emit()
  private close() {
    this.reset()
  }

  private reset() {
    const form = this.$refs.form as any
    form.resetFields()
  }

}
</script>