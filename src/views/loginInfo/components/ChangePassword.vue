<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// import { updatePasswordAPI } from '@/apis/login'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
// import { getCaptchaAPI } from '@/apis/user'

import { useMusicLoginerStore } from '@/stores/LoginerStore'
const musicLoginerStore = useMusicLoginerStore()
const musicLoginer = computed(() => musicLoginerStore.musicLoginer)
// 获取t方法才可以在js代码里使用
const captcha = ref('1234')
const ruleForm = reactive({
  Oripass: '',
  newPass: '',
  checkPass: '',
  captcha: ''
})
const router = useRouter()

// const LoginerId = computed(() => LoginerStore.userInfo.id)
const LoginerOriPassword = computed(() => musicLoginer.value.password)
// 图片验证码
// const captchaUrl = ref('')
// 对象dom
const ruleFormRef = ref()
// 确定密码函数
const validateConfirm = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请确认密码'))
  } else if (value !== ruleForm.newPass) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}
// 提醒框组件功能使用
const centerDialogVisible = ref(false)
const changeDialogVisible = (value) => {
  centerDialogVisible.value = value
}
const submitForm = (formRef) => {
  // 调用表单的 validate 方法进行验证
  formRef.validate(async (valid) => {
    if (valid) {
      // 如果表单验证通过，可以继续执行提交逻辑
      // 进行api提交
      if (ruleForm.Oripass === LoginerOriPassword.value) {
        // await updatePasswordAPI(LoginerId.value, ruleForm.newPass)
        ElMessage({
          message: '修改密码成功',
          type: 'success',
          plain: true
        })
        router.replace('/login')
        musicLoginerStore.clearUser()
      } else {
        ElMessage({
          message: '原密码错误',
          type: 'error',
          plain: true
        })
      }
    } else {
      // 如果表单验证不通过，出现dialog并且提醒
      centerDialogVisible.value = true
    }
  })
}

const rules = {
  Oripass: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  newPass: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 8, message: '长度至少8个字符', trigger: 'blur' },
    {
      // 正则表达式
      pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      message: '密码必须包含字母和数字',
      trigger: 'blur'
    }
  ],
  checkPass: [{ validator: validateConfirm, trigger: 'blur' }],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== captcha.value) {
          callback(new Error('验证码错误'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 假设一个验证功能：具体得用后端的接口提供的验证码
// 重置验证码
const refreshCaptcha = () => {
  // 调用api重新接收验证码和图片
  console.log('刷新验证码')
}

onMounted(() => refreshCaptcha())
</script>

<template>
  <DialogTip
    TipMessage="请输入正确的信息"
    :centerDialogVisible="centerDialogVisible"
    @changeDialogVisible="changeDialogVisible"
  ></DialogTip>
  <div class="passwordDiv">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="原密码" prop="Oripass">
        <el-input
          v-model="ruleForm.Oripass"
          type="password"
          autocomplete="off"
          placeholder="请输入原密码"
          show-password
          class="passwordInput"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input
          v-model="ruleForm.newPass"
          type="password"
          autocomplete="off"
          placeholder="请输入新密码"
          show-password
          class="passwordInput"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          v-model="ruleForm.checkPass"
          type="password"
          autocomplete="off"
          placeholder="请确认密码"
          show-password
          class="passwordInput"
        />
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input v-model="ruleForm.captcha" style="width: 7rem" placeholder="请输入验证码" />
        <img
          @click="refreshCaptcha"
          src="../../../assets/captcha.jpg"
          alt=""
          style="width: 100px; height: 40px; margin-left: 20px"
        />
      </el-form-item>
      <el-form-item>
        <span class="refresh-captcha-link" @click="refreshCaptcha">
          <el-icon style="font-size: 17px"><Refresh /></el-icon>
          &nbsp;看不清，换一张
        </span>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm(ruleFormRef)" class="el-button-bottom">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<style scoped lang="scss">
.passwordDiv {
  width: 100%;
  height: 100%;
  margin-left: 15%;
  margin-top: 13%;
}
.captcha-box {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  display: inline-block;
  font-family: Arial, sans-serif;
  position: relative;
  margin-left: 6rem;
  font-size: 1rem;
  height: 1.6rem;
}

.passwordInput {
  width: 58%;
}
.el-button-bottom {
  margin-left: 12%;
  width: 18%;
  background-color: #41abedda;
  color: white;
  border-radius: 10px;
  transition: all 0.3s;
}
.el-button-bottom:hover {
  transform: scale(1.05);
}
.refresh-captcha-link {
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  color: gray;
  margin-left: 12%;
}
.refresh-captcha-link:hover {
  color: rgb(181, 177, 177);
}
</style>