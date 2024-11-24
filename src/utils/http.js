import axios from 'axios'
import { useMusicLoginerStore } from '@/stores/LoginerStore'
import { computed } from 'vue'
const http = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

http.interceptors.request.use(
  (config) => {
    const musicLoginerStore = useMusicLoginerStore()
    const token = computed(() => musicLoginerStore.token)
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
    return Promise.reject(error)
  }
)

export default http
