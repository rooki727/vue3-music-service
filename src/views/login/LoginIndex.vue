<template>
  <!--头部  -->
  <NavHeader></NavHeader>
  <div class="register-container">
    <div class="registerFrom-left">
      <div class="registerFrom-left-title">
        <h2>登录</h2>
        <span>访问您的音乐、歌单和帐户</span>
      </div>
      <div class="registerFrom-left-img"></div>
    </div>
    <div class="registerFrom-right">
      <el-form
        style="max-width: 600px"
        :model="registerForm"
        status-icon
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item>
          <MaterialInput :label="'账号'" v-model="registerForm.account"></MaterialInput
        ></el-form-item>

        <el-form-item style="margin-top: 1rem">
          <MaterialInput
            :label="'密码'"
            :type="'password'"
            v-model="registerForm.pass"
          ></MaterialInput>
        </el-form-item>

        <el-form-item>
          <el-button class="btnDiy" @click="submitForm"> 登录 </el-button>
        </el-form-item>
      </el-form>
      <div class="registerFrom-right-bottom">
        <span>没有账号？</span
        ><el-button class="btnGoLogin" @click="$router.push('/register')"> 注册 </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavHeader from '@/components/NavHeader.vue'
import MaterialInput from '@/components/MaterialInput.vue'
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useMusicLoginerStore } from '@/stores/LoginerStore'
import router from '@/router'
const musicLoginerStore = useMusicLoginerStore()
const registerForm = reactive({
  account: '',
  pass: ''
})

const submitForm = () => {
  if (registerForm.account === '' || registerForm.pass === '') {
    ElMessage({
      message: '账号或密码不能为空',
      type: 'warning'
    })
    return
  } else {
    // 发送api请求

    console.log(registerForm)
    musicLoginerStore.musicUserInfo.account = registerForm.account
    musicLoginerStore.musicUserInfo.pass = registerForm.pass
    musicLoginerStore.musicUserInfo.token = 'tokentext123'
    router.replace('/')
  }
}
</script>

<style lang="scss" scoped>
.register-container {
  margin: 6% auto;
  display: flex;
  width: 40rem;
  height: 30rem;
  background-color: #fff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  .registerFrom-left {
    width: 15rem;
    height: 100%;
    background-color: rgba(238, 71, 71, 0.679);
    border-top-left-radius: 10px; /* 左上角 */
    border-bottom-left-radius: 10px; /* 左下角 */
    .registerFrom-left-title {
      height: 50%;
      width: 100%;
      h2 {
        color: white;
        margin: 2rem 0 0.5rem 2rem;
      }
      span {
        color: white;
        margin-left: 2rem;
        font-size: 14px;
      }
    }
    .registerFrom-left-img {
      height: 50%;
      width: 100%;
      background-image: url('../../assets/fengmian.jpg');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 240px 160px;
    }
  }
  // 表单部分
  .registerFrom-right {
    margin: 0 auto;
    .el-form {
      margin-top: 6rem;
      width: 20rem;

      input {
        height: 2rem;
      }
    }

    .btnDiy {
      width: 20rem;
      background-color: rgba(238, 71, 71, 0.679);
      height: 2.6rem;
      color: rgb(225, 223, 223);
      margin-top: 1rem;
      transition: all 0.1s ease-in-out;
    }
    .btnDiy:hover {
      color: white;

      height: 2.8rem;
    }
    .registerFrom-right-bottom {
      text-align: center;
      span {
        color: #575656;
      }
      .btnGoLogin {
        border: none;
        font-size: 16px;
      }
      .btnGoLogin:hover {
        background: transparent;
      }
    }
  }
}
</style>