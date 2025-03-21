import axios from 'axios'
import { useMusicLoginerStore } from '@/stores/LoginerStore'
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const http = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
})

http.interceptors.request.use(
  (config) => {
    const musicLoginerStore = useMusicLoginerStore()
    const token = computed(() => musicLoginerStore.musicUserInfo.token)
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      return response.data
    } else {
      return Promise.reject(response.data)
    }
  },
  (error) => {
    // 401 token失效处理
    if (error.response && error.response.status === 401) {
      ElMessage({
        type: 'warning',
        // 具体可写后端提供的错误信息
        message: '请检查您的网络或请求信息是否有误'
      })
      const loginerStore = useMusicLoginerStore()
      loginerStore.clearUser()
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default http
