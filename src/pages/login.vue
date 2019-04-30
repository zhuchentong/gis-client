<template>
  <section class="login-page fill-absolute" @keydown.enter="submitForm">
    <div class="col center-span fill-height">
      <div class="login-title">多规合一信息综合平台</div>
      <div class="login-content">
        <div class="login-form">
          <el-form ref="login-form" :model="user" :rules="userRoles">
            <el-form-item prop="username">
              <el-input v-model="user.username" auto-complete="off" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="user.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox class="remember-label" v-model="remember">记住用户名和密码</el-checkbox>
            </el-form-item>
            <div v-if="loading">
              <i class="el-icon-loading"></i> 资源数据更新中,请稍后...
            </div>
            <div class="text-center">
              <el-button class="login-btn" @click="submitForm">登录</el-button>
              <el-button class="login-btn" @click="exit">退出</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <!-- <el-row class="copyright">上海指旺信息科技有限公司 © 版权所有</el-row> -->
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Inject } from 'typescript-ioc'
import { User } from '~/models/user.model'
import { WindowSize } from '../config/enum.config'
import { Layout } from '@/core/decorator'

@Layout('empty')
@Component({
  components: {}
})
export default class Login extends Vue {
  private user = {
    username: "",
    password: ""
  }

  private loading = false
  private remember = false
  private userRoles: any = {
    username: { required: true, message: '用户名不能为空', trigger: 'blur' },
    password: { required: true, message: '密码不能为空', trigger: 'blur' }
  }

  private submitForm() {
    this.$window.open('home', {
      size: WindowSize.normal
    })
  }

  private exit() {
    this.$electron.remote.process.exit(0)
  }
}
</script>

<style lang="less">
.login-page {
  @color: #ffffff;

  background: url('../assets/images/login_bg_1.png');
  background-size: auto 100%;
  background-repeat: no-repeat;
  color: @color;
  .login-title {
    margin-top: 20px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }
  .login-content {
    margin: 30px 50px;
    display: flex;
    text-align: left;
    border-width: 1px;
    box-sizing: border-box;
    border-radius: 2px;
    .login-left {
      width: 500px;
      background: url('../assets/images/login_left.png');
      background-repeat: round;
    }
    .login-form {
      -webkit-app-region: no-drag;
      flex: 1;
      padding: 40px;
      box-sizing: border-box;
      background-color: rgba(242, 242, 242, 0.2);
      .remember-label {
        color: @color;
      }
    }

    .login-btn {
      width: 100px;
    }
  }
  .copyright {
    position: fixed;
    bottom: 20px;
    width: 100%;
    text-align: center;
  }
}
</style>