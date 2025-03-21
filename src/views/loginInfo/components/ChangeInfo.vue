<script  setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
// 级联地址
import { pcTextArr } from 'element-china-area-data'
import { updateBaseInfoAPI } from '@/apis/user'
// 1、provinceAndCityData省市二级联动数据,汉字+code
// 2、regionData省市区三级联动数据
// 3、pcTextArr省市联动数据，纯汉字
// 4、pcaTextArr省市区联动数据，纯汉字
// 5、codeToText是个大对象，属性是区域码，属性值是汉字 用法例如：codeToText[‘110000’]输出北京市

import { useMusicLoginerStore } from '@/stores/LoginerStore'
const musicLoginerStore = useMusicLoginerStore()
const optionsnative_place = pcTextArr
const userFormRef = ref(null)
const userform = ref({
  name: '',
  gender: '',
  birthday: '',
  region: '',
  individual: '',
  phone: '',
  email: ''
})
const rules = {
  name: [
    {
      required: true,
      message: '请输入您的昵称',
      trigger: 'blur'
    }
  ],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  region: [
    {
      required: true,
      message: '请输入地区',
      trigger: 'blur'
    }
  ],
  birthday: [
    {
      required: true,
      message: '请选择生日',
      trigger: 'blur'
    }
  ],
  individual: [
    {
      required: true,
      message: '请输入歌手简介', // 如果未输入电子邮件地址，则显示此消息
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: '请输入手机号码', // 如果未输入电子邮件地址，则显示此消息
      trigger: 'blur'
    },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '手机号码格式错误',
      trigger: 'blur'
    },
    {
      min: 11,
      max: 11,
      message: '手机号码长度为11位',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入电子邮件地址', // 如果未输入电子邮件地址，则显示此消息
      trigger: 'blur'
    },
    {
      type: 'email',
      message: '请输入正确的电子邮件地址', // 如果输入的电子邮件地址不符合规则，则显示此消息
      trigger: ['blur', 'change']
    }
  ]
}
const submitadd = (addFormRef) => {
  addFormRef.validate((valid) => {
    if (valid) {
      console.log(userform.value)
      console.log(userform.value.region)

      // api数据请求，更新该用户的信息
      updateBaseInfoAPI({
        name: userform.value.name,
        gender: userform.value.gender,
        birthday: userform.value.birthday,
        region: userform.value.region,
        individual: userform.value.individual,
        phone: userform.value.phone,
        email: userform.value.email
      })
        .then(() => {
          // 如果 addUser 没有报错，则执行成功提示
          ElMessage({ type: 'success', message: '更新成功' })
          musicLoginerStore.musicUserInfo.name = userform.value.name
          musicLoginerStore.musicUserInfo.gender = userform.value.gender
          musicLoginerStore.musicUserInfo.birthday = userform.value.birthday
          musicLoginerStore.musicUserInfo.region = userform.value.region
          musicLoginerStore.musicUserInfo.individual = userform.value.individual
          musicLoginerStore.musicUserInfo.phone = userform.value.phone
          musicLoginerStore.musicUserInfo.email = userform.value.email
        })
        .catch(() => {
          // 处理请求失败的情况
          ElMessage({ type: 'erro', message: '修改失败！请检查输入信息' })
          // 在此处可以添加相应的错误处理逻辑，例如提示用户登录失败等
        })
    } else {
      // 如果表单验证不通过，提醒
      ElMessage({ type: 'error', message: '更新失败！请检查输入信息' })
    }
  })
}
onMounted(() => {
  // Object.assign() 或扩展运算符来创建一个新的对象，从而确保不会直接修改 store 中的值
  Object.assign(userform.value, musicLoginerStore.musicUserInfo)
})
</script>

<template>
  <div class="change-info">
    <el-form :model="userform" :rules="rules" ref="userFormRef">
      <el-form-item label="昵称" label-width="15%" prop="name">
        <el-input v-model="userform.name" autocomplete="off" class="change-info-input" />
      </el-form-item>
      <el-form-item label="性别" label-width="15%" prop="gender">
        <el-radio-group v-model="userform.gender">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日" label-width="15%" prop="birthday">
        <el-date-picker
          v-model="userform.birthday"
          type="date"
          placeholder="Pick a day"
          size="default"
        />
      </el-form-item>
      <el-form-item label="电话" label-width="15%" prop="phone">
        <el-input v-model="userform.phone" autocomplete="off" class="change-info-input" />
      </el-form-item>
      <el-form-item label="邮箱" label-width="15%" prop="email">
        <el-input v-model="userform.email" autocomplete="off" class="change-info-input" />
      </el-form-item>
      <el-form-item label="地区" label-width="15%" prop="region">
        <el-cascader v-model="userform.region" :options="optionsnative_place" />
      </el-form-item>
      <el-form-item label="简介" label-width="15%" prop="individual">
        <el-input
          v-model="userform.individual"
          autocomplete="off"
          placeholder="输入你的个性签名，让周围的人更了解你"
          type="textarea"
          style="width: 75%"
          :rows="7"
        />
      </el-form-item>
    </el-form>
    <el-button @click="submitadd(userFormRef)" type="primary" class="change-info-button"
      >保存</el-button
    >
  </div>
</template>


<style scoped>
.change-info {
  width: 100%;
  height: 100%;
  margin: 3% auto;
}
.change-info-input {
  width: 60%;
}
.change-info-button {
  margin-left: 7rem;
  border-radius: 18px;
  width: 15%;
  transition: all 0.5s;
}
.change-info-button:hover {
  transform: scale(1.05);
  color: #f6f0f0;
}
</style>