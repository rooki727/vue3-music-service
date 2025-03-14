import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash'
export const useSongStore = defineStore('song', () => {
  // 定义登陆用户对象
  const songList = ref([])
  // 当前歌曲索引
  const currentTrackIndex = ref(0)
  const isPlaying = ref(false)
  // 当前歌曲计算属性
  const currentTrack = computed(() => {
    const song = songList.value[currentTrackIndex.value]
    return song || null
  })
  // 计算属性当前歌曲song_id
  const currentSongId = computed(() => {
    const song_id = songList.value[currentTrackIndex.value].song_id
    return song_id || null
  })
  // 设置播放暂停
  const setPlayingStatus = (status) => {
    isPlaying.value = status
  }
  // 设置当前歌曲索引
  const setCurrentTrackIndex = (index) => {
    if (index >= 0 && index < songList.value.length) {
      currentTrackIndex.value = index
    }
  }
  // 设置是否喜欢
  const setIsLove = (index) => {
    songList.value[index].isLike = !songList.value[index].isLike
  }
  // 下一首播放
  const addNextSong = (data) => {
    // 确保 currentTrackIndex 是有效的，并且在合法范围内
    if (currentTrackIndex.value < 0 || currentTrackIndex.value + 1 > songList.value.length) {
      currentTrackIndex.value = songList.value.length // 如果无效，插入到末尾
      isPlaying.value = true
    }
    // 查找 songList 中是否已经存在相同的 data
    const existingIndex = songList.value.findIndex((song) => song.song_id === data.song_id)
    if (existingIndex !== -1) {
      if (existingIndex < currentTrackIndex.value) {
        // 如果 data 已经存在，调整该元素的位置为 currentTrackIndex.value + 1
        songList.value.splice(existingIndex, 1) // 删除该元素
        currentTrackIndex.value = currentTrackIndex.value - 1
        songList.value.splice(currentTrackIndex.value + 1, 0, data) // 插入到新的位置
      } else {
        // 如果 data 已经存在，调整该元素的位置为 currentTrackIndex.value + 1
        songList.value.splice(existingIndex, 1) // 删除该元素
        songList.value.splice(currentTrackIndex.value + 1, 0, data) // 插入到新的位置
      }
    } else {
      // 如果不存在，插入数据
      songList.value.splice(currentTrackIndex.value + 1, 0, data)
    }
  }

  // 从某个位置删除歌曲
  const deleteSong = (index) => {
    songList.value.splice(index, 1)
  }
  // 设置歌曲列表
  const setSongList = (data) => {
    // 深拷贝 而不是直接引用data
    songList.value = cloneDeep(data)
  }

  // 清空歌曲列表
  const clearSongList = () => {
    songList.value = []
  }

  return {
    songList,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    currentSongId,
    setPlayingStatus,
    clearSongList,
    setSongList,
    setCurrentTrackIndex,
    deleteSong,
    setIsLove,
    addNextSong
  }
})
