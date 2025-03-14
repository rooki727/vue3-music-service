<template>
  <!--头部  -->
  <NavHeader></NavHeader>
  <div class="register-container">
    <div class="registerFrom-left">
      <div class="registerFrom-left-title">
        <h2>注册</h2>
        <span>注册您的账户、音乐和歌单</span>
      </div>
      <div class="registerFrom-left-img"></div>
    </div>
    <div class="registerFrom-right">
      <el-form
        ref="registerFormRef"
        style="max-width: 600px"
        :model="registerForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item prop="account">
          <el-input v-model="registerForm.account" placeholder="请输入账号,阿拉伯数字6-10位" />
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            v-model="registerForm.pass"
            type="password"
            autocomplete="off"
            placeholder="请输入密码,包含数字字母8-20位"
          />
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            v-model="registerForm.checkPass"
            type="password"
            autocomplete="off"
            placeholder="请再次输入密码"
          />
        </el-form-item>
        <el-form-item prop="captcha" class="captchaItem">
          <el-input
            v-model="registerForm.captcha"
            autocomplete="off"
            placeholder="请输入验证码"
            style="width: 180px"
          />
          <img
            @click="refreshCaptcha"
            src="../../assets/captcha.jpg"
            alt=""
            style="width: 100px; height: 40px; margin-left: 20px"
          />
        </el-form-item>
        <el-form-item>
          <el-button class="btnDiy" @click="submitForm(registerFormRef)"> 注册 </el-button>
        </el-form-item>
      </el-form>
      <div class="registerFrom-right-bottom">
        <span>已有账号？</span
        ><el-button class="btnGoLogin" @click="$router.push('/login')"> 登录 </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavHeader from '@/components/NavHeader.vue'
import router from '@/router'
import { ElMessage } from 'element-plus'

import { reactive, ref } from 'vue'

const registerFormRef = ref(null)
const captcha = ref('1234')
const registerForm = reactive({
  pass: '',
  checkPass: '',
  account: '',
  email: '',
  captcha: ''
})

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (registerForm.checkPass !== '') {
      if (!registerFormRef.value) return
      registerFormRef.value.validateField('checkPass')
    }
    callback()
  }
}
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.pass) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
const validateCaptcha = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入验证码'))
    // 替换为后端发送的验证码
  } else if (value !== captcha.value) {
    callback(new Error('验证码错误'))
  } else {
    callback()
  }
}

const rules = reactive({
  account: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 10,
      message: '最少6位阿拉伯数字,最大10位',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]+$/, // 使用正则表达式限制输入只能为数字字符
      message: '账号必须为纯数字', // 自定义提示消息
      trigger: ['blur', 'change']
    }
  ],
  pass: [
    { validator: validatePass, trigger: 'blur' },
    { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' },
    // 必须包含数字字母
    {
      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
      message: '密码必须包含数字字母',
      trigger: 'blur'
    }
  ],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],

  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur'
    },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  captcha: [{ validator: validateCaptcha, trigger: 'blur' }]
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(registerForm)
      // 发送api请求注册 回调函数跳转登录页

      ElMessage({
        message: '注册成功',
        type: 'success',
        duration: 1000 // 消息显示时间为 1 秒
      })
      // 延迟500毫秒后跳转
      setTimeout(() => {
        router.replace('/login')
      }, 500)
    } else {
      ElMessage({
        message: '请输入正确的信息',
        type: 'error'
      })
    }
  })
}
// 重置验证码
const refreshCaptcha = () => {
  // 调用api重新接收验证码和图片
}
</script>

<style lang="scss" scoped>
.register-container {
  margin: 10% auto;
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
      margin-top: 2.8rem;
      width: 20rem;

      input {
        height: 2rem;
      }
    }
    .btnDiy {
      width: 20rem;
      background-color: rgba(238, 71, 71, 0.679);
      height: 2.6rem;
      color: rgb(249, 248, 248);
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
      }
      .btnGoLogin:hover {
        background: transparent;
      }
    }
  }
}
</style>