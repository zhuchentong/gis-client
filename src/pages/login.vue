<template>
  <section class="login-page row center-span" @keydown.enter="submitForm">
    <div class="login-content col middle-span">
      <div class="logo"></div>
      <el-form
        ref="login-form"
        class="login-form "
        :model="user"
        :rules="userRoles"
      >
        <el-form-item prop="username">
          <el-input
            v-model="user.username"
            prefix-icon="el-icon-user"
            auto-complete="off"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="user.password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="text-left remember">
            <el-checkbox class="remember-label " v-model="remember">
              记住用户名和密码
            </el-checkbox>
          </div>
        </el-form-item>
      </el-form>
      <div class="text-center">
        <div v-if="loading">
          <i class="el-icon-loading"></i> 资源数据更新中,请稍后...
        </div>
        <el-button v-else class="login-btn" @click="submitForm">登录</el-button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Inject } from 'typescript-ioc'
import { User } from '~/models/user.model'
import { WindowSize } from '~/config/enum.config'
import { Layout } from '@/core/decorator'
import { State, Mutation, Action, namespace } from 'vuex-class'
import { DataDict } from '~/models/data-dict.model'
import { StorageService } from '~/utils/storage.service'
import { LayerInfoService } from '~/services/layer-info.service'
import { RequestParams } from '~/core/http'
import { TempLayers } from '@/models/temp-layers.model'
import { LayerSpace } from '~/config/business-config'

const LayerRelationModule = namespace('layerRelationModule')

@Layout('empty')
@Component({
  components: {}
})
export default class Login extends Vue {
  @State private menuResource!: any[]
  @Mutation private updateUserPrincipalList!: () => void
  @Mutation private updateDictData!: (data) => void
  @Action private updateUserLoginData!: (data) => boolean
  // 更新图层关系
  @LayerRelationModule.Mutation private updateLayerRelations!: (
    data: any[]
  ) => void

  @Inject
  private layerService!: LayerInfoService
  private loading: boolean = false
  private dataDict = new DataDict()
  private user = new User()
  private userRoles: any = {
    username: { required: true, message: '用户名不能为空', trigger: 'blur' },
    password: { required: true, message: '密码不能为空', trigger: 'blur' }
  }

  private remember: boolean = false

  private mounted() {
    const rember: any = StorageService.getItem('remember')
    this.remember = !!rember
    if (rember) {
      this.user.username = rember.username
      this.user.password = rember.password
    }

    this.loading = true
    this.checkDictData()
  }

  private async checkDictData() {
    const oldHash = StorageService.getItem('dictHash')
    const needUpdateFlag = await new Promise(resolve => {
      this.dataDict.getHashCode().subscribe(
        data => {
          if (
            !oldHash ||
            (oldHash && data.dataDictHashCode !== oldHash.toString())
          ) {
            StorageService.setItem('dictHash', data.dataDictHashCode)
            return resolve(true)
          }
          resolve(false)
        },
        () => resolve(false)
      )
    })
    if (needUpdateFlag) {
      this.dataDict.getDictData().subscribe(data => {
        this.updateDictData(data)
        this.loading = false
      })
    } else {
      this.loading = false
    }
  }

  /**
   * 提交登录表单
   */
  private submitForm() {
    const loginForm: any = this.$refs['login-form']
    loginForm.validate(success => {
      if (!success) return
      this.login()
    })
  }

  private async login() {
    if (this.remember) {
      StorageService.setItem('remember', {
        username: this.user.username,
        password: this.user.password
      })
    } else {
      StorageService.removeItem('remember')
    }
    let data = await this.user.login().toPromise()
    const loginStatus = this.updateUserLoginData({
      token: data.token,
      user: data.operatorResponse
    })
    if (loginStatus) {
      data = await this.layerService
        .getLayerRelation(new RequestParams(null))
        .toPromise()
      this.updateLayerRelations(data)
      this.deleteLocalLayers()

      this.$window.open(
        'home',
        {
        },
        {
          replace: true
        },
        this
      )
    } else {
      this.$message.error('登录失败')
    }
  }

  /**
   * 删除所有的临时发布图层
   */
  private deleteLocalLayers() {
    const tmpLayers = new TempLayers()
    tmpLayers.layerList.forEach(item => {
      const param = new RequestParams({
        ...item,
        layerSpace: LayerSpace.temp
      })
      this.layerService
        .deleteTempLayer(param)
        .subscribe(() => tmpLayers.delete(item.layerCode))
    })
  }

  private exit() {
    this.$electron.remote.process.exit(0)
  }
}
</script>

<style lang="less" scoped>
.login-page {
  @contentWidth: 300px;
  height: 100%;
  background: url('../assets/images/login.png');
  background-size: cover;
  padding-top: 10%;

  .logo {
    background-image: url('../assets/images/login-title.png');
    height: 144px;
    width: @contentWidth;
    background-repeat: no-repeat;
    background-position: center;
    margin-top: 24px;
  }
  .login-content {
    width: 433px;
    height: 440px;
    background-color: #ffffffd1;
    box-shadow: 0px 16px 26px 9px rgba(3, 0, 0, 0.72);
    border-radius: 6px;
    .login-form {
      width: @contentWidth;
      margin-top: 20px;
      .remember {
        padding-left: 10px;
      }
    }
    .login-btn {
      width: 300px;
    }
  }
}
</style>
<style lang="less">
.login-page {
  .login-form {
    .el-input__prefix {
      font-size: 20px;
      color: #1962c0;
    }
    .el-input.el-input--prefix {
      .el-input__inner {
        padding-left: 32px;
        border-radius: 0;
        border-top: unset;
        border-right: unset;
        border-left: unset;
        background: unset;
      }
    }
  }
}
</style>
