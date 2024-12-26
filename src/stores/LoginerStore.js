import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { ElMessage } from 'element-plus'

export const useMusicLoginerStore = defineStore(
  'musicUserLogin',
  () => {
    // 定义登陆用户对象
    const musicUserInfo = ref({})
    const setMusicUserInfo = (data) => {
      musicUserInfo.value = data
    }
    const clearUser = () => {
      musicUserInfo.value = {}
    }
    return {
      musicUserInfo,
      clearUser,
      setMusicUserInfo
    }
  },
  {
    persist: true
  }
)
