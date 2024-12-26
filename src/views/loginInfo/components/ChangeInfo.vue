<script  setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
// 级联地址
import { pcTextArr } from 'element-china-area-data'
// 1、provinceAndCityData省市二级联动数据,汉字+code
// 2、regionData省市区三级联动数据
// 3、pcTextArr省市联动数据，纯汉字
// 4、pcaTextArr省市区联动数据，纯汉字
// 5、codeToText是个大对象，属性是区域码，属性值是汉字 用法例如：codeToText[‘110000’]输出北京市

// import { useMusicLoginerStore } from '@/stores/LoginerStore'
// const musicLoginerStore = useMusicLoginerStore()
// const musicLoginer = computed(() => musicLoginerStore.musicLoginer)
const optionsnative_place = pcTextArr
const userFormRef = ref(null)
const userform = ref({
  account: null,
  user_id: 12312312,
  name: '',
  gender: '',
  birthday: '',
  region: '',
  individual: ''
})
// const user_id = computed(() => musicLoginer.value.user_id)
// const getprofileData = async () => {
//   // 发送请求拿个人数据
// const res = await getUserByIdAPI(parseInt(user_id.value))
//   if (res.code != '-1') {
//     musicLoginer.setMusicUserInfo(res)
//     Object.assign(profileData.value, res)
//   }
// }
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
  ]
}
const submitadd = (addFormRef) => {
  addFormRef.validate((valid) => {
    if (valid) {
      console.log(userform.value)
      console.log(userform.value.region.join(''))

      // api数据请求，更新该用户的信息
      //  addSinger(
      //     )
      //     .then(() => {
      //       // 如果 addUser 没有报错，则执行成功提示
      //       ElMessage({ type: 'success', message: '更新成功' })

      //     })
      //     .catch(() => {
      //       // 处理请求失败的情况
      //       ElMessage({ type: 'erro', message: '修改失败！请检查输入信息' })
      //       // 在此处可以添加相应的错误处理逻辑，例如提示用户登录失败等
      //     })
    } else {
      // 如果表单验证不通过，提醒
      ElMessage({ type: 'error', message: '更新失败！请检查输入信息' })
    }
  })
}
</script>

<template>
  <div class="change-info">
    <el-form :model="userform" :rules="rules" ref="userFormRef">
      <el-form-item label="账号" label-width="15%" prop="account">
        <span>{{ userform.account }}</span>
      </el-form-item>
      <el-form-item label="user_id" label-width="15%" prop="user_id">
        <span>{{ userform.user_id }}</span>
      </el-form-item>
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
  width: 45%;
}
.change-info-button {
  margin-top: 0.3rem;
  margin-left: 5.8rem;
  border-radius: 18px;
  width: 15%;
  transition: all 0.5s;
}
.change-info-button:hover {
  transform: scale(1.05);
  color: #f6f0f0;
}
</style>