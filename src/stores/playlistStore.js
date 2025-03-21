import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listCreateAPI } from '@/apis/playList'

export const useplaylistStore = defineStore(
  'playlistStore',
  () => {
    // 定义登陆用户对象
    const playlists = ref([])
    // 获取用户歌单列表
    const getPlaylists = async () => {
      const res = await listCreateAPI()
      playlists.value = res.data
    }
    const setPlaylist = (data) => {
      playlists.value = data
    }
    const clearPlaylist = () => {
      playlists.value = {}
    }
    return {
      playlists,
      getPlaylists,
      clearPlaylist,
      setPlaylist
    }
  },
  {
    persist: true
  }
)
