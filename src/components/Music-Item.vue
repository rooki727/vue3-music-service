<template>
  <div class="music-item" :class="{ show: isVisible }" ref="musicItem" v-cloak>
    <!-- 播放器部分 -->
    <div class="audio-player">
      <img
        :src="currentTrack?.cover"
        class="song-cover"
        :class="{ 'is-playing': isPlaying }"
        v-if="currentTrack"
      />
      <img v-else class="song-cover" src="../assets/music-icon.jpg" alt="" />
      <div class="player-controls">
        <el-tooltip content="上一首" placement="top" effect="light">
          <button @click="prevTrack" class="control-btn">
            <i class="iconfont icon-shangyishoushangyige"></i>
          </button>
        </el-tooltip>
        <!--  -->
        <el-tooltip content="暂停/播放" placement="top" effect="light">
          <button @click="togglePlay" class="control-btn">
            <i class="iconfont icon-bofang" v-if="!isPlaying"></i>
            <i class="iconfont icon-zanting" v-else></i>
          </button>
        </el-tooltip>
        <!--  -->
        <el-tooltip content="下一首" placement="top" effect="light">
          <button @click="nextTrack" class="control-btn">
            <i class="iconfont icon-xiayigexiayishou"></i>
          </button>
        </el-tooltip>
        <!-- 进度和歌名 -->
        <span class="song-title" v-if="currentTrack"
          >{{ currentTrack?.title }} - {{ currentTrack?.artist }}</span
        >
        <span class="song-title" v-else>欢迎来到CJ-Music,选择音乐去畅听吧！</span>
        <input
          type="range"
          v-model="currentTime"
          :max="duration"
          @input="seek"
          class="progress-bar"
        />
        <span class="time-display">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
        <!-- 倍数 -->
        <el-tooltip content="倍数" placement="top" effect="light">
          <select
            v-model="playbackRate"
            @change="setPlaybackRate"
            placeholder="Select"
            class="playback-rate"
          >
            <option value="0.5">0.5x</option>
            <option value="1.0">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2.0">2x</option>
          </select>
        </el-tooltip>
        <!-- 下载 -->
        <el-tooltip content="下载" placement="top" effect="light">
          <button @click="downloadTrack" class="download-btn">
            <i class="iconfont icon-xiazai"></i>
          </button>
        </el-tooltip>
        <!-- 随机播放 -->
        <!-- 循环播放 -->
        <el-tooltip
          :content="playbackRules === 'random' ? '随机播放' : '列表循环'"
          placement="top"
          effect="light"
        >
          <button @click="toggleRandom" class="download-btn">
            <!-- 根据 playbackRules 显示对应的图标 -->
            <i class="iconfont icon-suijibofang" v-if="playbackRules === 'random'"></i>
            <i class="iconfont icon-liebiaoxunhuan" v-else-if="playbackRules === 'order'"></i>
          </button>
        </el-tooltip>
        <!-- 评论 -->
        <el-tooltip content="评论" placement="top" effect="light">
          <button @click="goComment(currentTrack.id)" class="download-btn">
            <i class="iconfont icon-pinglun"></i>
          </button>
        </el-tooltip>
        <!-- 调节音量 -->
        <el-tooltip content="音量调节" placement="top" effect="light">
          <label for="volume" class="volume-label">
            <i class="iconfont icon-yinliang" v-if="audio.volume > 0"></i>
            <i class="iconfont icon-24gl-volumeCross" v-else></i
          ></label>
        </el-tooltip>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          v-model="audio.volume"
          class="volume-bar"
        />
      </div>
    </div>
    <!-- 锁定 -->
    <el-tooltip content="隐藏" placement="top" effect="light">
      <div class="downIcon" @click="changDown">
        <el-icon><Bottom /></el-icon>
      </div>
    </el-tooltip>
    <el-tooltip content="锁定/解锁" placement="top" effect="light">
      <div class="lockIcon" @click="changeLocked">
        <el-icon v-if="isLocked"><Lock /></el-icon>
        <el-icon v-else><Unlock /></el-icon>
      </div>
    </el-tooltip>
  </div>
</template>

<script setup>
// import router from '@/router'
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { useSongStore } from '@/stores/SongStore'
import { ElMessage } from 'element-plus'
const songStore = useSongStore()

// 控制音乐栏的显示状态
const isVisible = ref(false)
const isLocked = ref(false)
const musicItem = ref(null)
// 鼠标移动事件处理函数
const handleMouseMove = (event) => {
  const mouseY = event.clientY // 获取鼠标指针的Y坐标
  const windowHeight = window.innerHeight // 获取视窗的高度
  // 判断鼠标是否接近视窗底部 (设置一个阈值，比如20px)
  if (mouseY >= windowHeight - 20) {
    isVisible.value = true
  } else if (mouseY <= windowHeight - 80) {
    isVisible.value = false
  }
}
// 锁点击事件
const changeLocked = () => {
  isLocked.value = !isLocked.value
}
// 下拉点击事件
const changDown = () => {
  isLocked.value = false
  isVisible.value = false
}
// 监听 isLocked 的变化
watch(isLocked, (newValue) => {
  if (newValue) {
    musicItem.value.removeEventListener('mousemove', handleMouseMove)
  } else {
    musicItem.value.addEventListener('mousemove', handleMouseMove)
  }
})

// 音乐播放器相关逻辑
const audio = new Audio()
const isPlaying = computed(() => songStore.isPlaying)
const currentTime = ref(0)
const duration = ref(0)
const playbackRate = ref('1.0')
const playbackRules = ref('order')
const tracks = ref([])
// 计算属性获取store中的计算属性currentTrack
const currentTrack = computed(() => songStore.currentTrack)

// 监听 songStore 的 songList 更新
watch(
  () => songStore.songList, // 监听 songStore 中的 songList
  (newValue) => {
    tracks.value = [...newValue] // 复制新的歌单到 tracks 数组
  },
  {
    deep: true, // 深度监听
    immediate: true // 立即执行
  }
)

// Method to format time (e.g., 2:03)
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}

// play/pause
const togglePlay = () => {
  songStore.setPlayingStatus(!songStore.isPlaying)
}
// 监听播放状态的变化
watch(
  () => isPlaying.value,
  (newValue) => {
    if (newValue) {
      audio.play()
    } else {
      audio.pause()
    }
  },
  {
    immediate: true // 立即执行
  }
)

// 切换随机播放和顺序播放
const toggleRandom = () => {
  playbackRules.value = playbackRules.value === 'random' ? 'order' : 'random'
  if (playbackRules.value === 'random') {
    // 当播放结束后，随机选择一首歌曲播放
    audio.onended = () => {
      let randomIndex = Math.floor(Math.random() * tracks.value.length)
      songStore.setCurrentTrackIndex(randomIndex) // 更新 songStore 中的 currentTrackIndex
      loadTrack()
    }
  }
}

// 播放下一首歌曲
const nextTrack = () => {
  if (playbackRules.value === 'random') {
    // 随机选择一首不同于当前歌曲的歌曲
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * tracks.value.length)
    } while (randomIndex === songStore.currentTrackIndex) // 确保不重复播放当前歌曲
    songStore.setCurrentTrackIndex(randomIndex)
  } else {
    // 顺序播放，按顺序切换
    if (songStore.currentTrackIndex < tracks.value.length - 1) {
      songStore.setCurrentTrackIndex(songStore.currentTrackIndex + 1)
    } else {
      songStore.setCurrentTrackIndex(0) // 列表循环到头时回到第一首
    }
  }
  loadTrack()
}

// 播放上一首歌曲
const prevTrack = () => {
  if (playbackRules.value === 'random') {
    // 随机选择一首不同于当前歌曲的歌曲
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * tracks.value.length)
    } while (randomIndex === songStore.currentTrackIndex) // 确保不重复播放当前歌曲
    songStore.setCurrentTrackIndex(randomIndex)
  } else {
    // 顺序播放，按顺序切换
    if (songStore.currentTrackIndex > 0) {
      songStore.setCurrentTrackIndex(songStore.currentTrackIndex - 1)
    } else {
      songStore.setCurrentTrackIndex(tracks.value.length - 1) // 列表循环到头时回到最后一首
    }
  }
  loadTrack()
}

// 加载当前歌曲
const loadTrack = () => {
  if (currentTrack.value) {
    audio.src = currentTrack.value.src // 设置音频源
    currentTime.value = 0 // 重置当前播放时间

    // 监听音频加载错误，自动切换到下一首
    audio.onerror = () => {
      ElMessage.warning('音频加载失败，切换到下一首')
      setTimeout(() => {
        nextTrack() // 加载下一首歌曲
      }, 500)
    }
    // 延时加载，避免立即触发

    audio.load()
  }
}
// 等待音频加载完成后再播放
audio.oncanplay = () => {
  duration.value = audio.duration
  if (songStore.isPlaying) {
    audio.play()
  }
}

// 播放进度条
const seek = () => {
  audio.currentTime = currentTime.value
}

// 设置播放速度
const setPlaybackRate = () => {
  audio.playbackRate = playbackRate.value
}
// 跳转评论页面
const goComment = (id) => {
  console.log(id)

  // 跳转到评论页面
  // router.push({ name: 'comment', params: { id: id } })
}
// 发送请求并获取下载到本地
const downloadTrack = () => {
  const link = document.createElement('a')
  link.href = currentTrack.value.src
  link.download = currentTrack.value.title + '.mp3'
  link.click()
}

// 在当前播放歌曲变化时更新音频
watch(
  () => songStore.currentTrack,
  (newTrack) => {
    if (newTrack) {
      loadTrack()
    } else {
      // 重置audio为空
      if (audio) {
        songStore.setPlayingStatus(false)
        audio.src = '' // 清空音频源
        currentTime.value = 0 // 重置播放时间
        duration.value = 0 // 重置播放时长
      }
    }
  },
  {
    immediate: true // 立即执行
  }
)
// 监听播放时长变化
audio.ontimeupdate = () => {
  currentTime.value = audio.currentTime
}
// 播放结束自动下一首
audio.onended = () => {
  nextTrack()
}

// 组件挂载时添加鼠标移动事件监听
onMounted(() => {
  loadTrack()
  audio.volume = 0.5
  musicItem.value.addEventListener('mousemove', handleMouseMove)
})

// 组件卸载时移除鼠标移动事件监听
onBeforeUnmount(() => {
  musicItem.value.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style lang="scss" scoped>
.music-item {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 5rem;
  background-color: white;
  border-radius: 10px;
  z-index: 666;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.513);
  transition: all 0.3s ease-in-out;
  transform: translateY(100%); /* 鼠标接近底部时显示 */
  .lockIcon {
    position: absolute;
    top: 0;
    right: 1%;
    cursor: pointer;
    font-size: 1.4rem;
  }
  .downIcon {
    position: absolute;
    top: 0;
    right: 3%;
    cursor: pointer;
    font-size: 1.4rem;
  }
}
.music-item.show {
  transform: translateY(0); /* 鼠标接近底部时显示 */
}
// 播放器样式
.audio-player {
  position: relative;
  width: 100%;
  background-color: transparent;
  color: #fff;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.player-controls {
  margin-left: 6.5%;
}
.song-title {
  position: absolute;
  top: 13%;
  left: 16.3%;
  font-size: 13px;
  color: #7e7d7d;
  transition: opacity 0.3s ease;
}
.time-display {
  font-size: 0.875rem;
  margin-left: 10px;
  color: #7e7d7d;
  transition: opacity 0.3s ease;
}
.song-cover {
  position: absolute;
  top: 0;
  left: 1.8%;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 1px solid #3f3d3d84;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
}
.control-btn {
  background: none;
  border: none;
  color: #fff;
  margin: 0 10px;
  cursor: pointer;
}

i.iconfont {
  font-size: 1.75rem;
  color: #7e7d7d;
}
.progress-bar {
  width: 55%;
  margin: 0 10px;
}

.playback-rate {
  background-color: transparent;
  color: #7e7d7d;
  border: none;
  padding: 5px;
  margin-left: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
}

.download-btn {
  background-color: transparent;
  border: none;
  margin: 10px 12px;
  cursor: pointer;
}
.volume-bar {
  width: 7.5%;
  margin-left: 0.5rem;
  color: #7e7d7d;
}
.volume-label {
  margin-left: 0.2rem;
  cursor: pointer;
}

// 动画内容
/* 结合旋转、震动和闪烁的动画 */
@keyframes rotateShakeBlinkAnimation {
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.602), 0 0 20px rgba(255, 0, 0, 0.607);
  }
  25% {
    transform: rotate(90deg) scale(1.05);
    opacity: 0.8;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.823), 0 0 25px rgba(0, 255, 0, 0.864);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
    opacity: 0.6;
    box-shadow: 0 0 20px rgba(0, 0, 255, 0.778), 0 0 30px rgba(0, 0, 255, 0.732);
  }
  75% {
    transform: rotate(270deg) scale(1.05);
    opacity: 0.8;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.863), 0 0 25px rgba(0, 255, 0, 0.828);
  }
  100% {
    transform: rotate(360deg) scale(1);
    opacity: 1;
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.647), 0 0 20px rgba(255, 0, 0, 0.622);
  }
}

/* 当播放时，添加旋转、缩放和闪烁效果 匀速重复 */
.is-playing {
  animation: rotateShakeBlinkAnimation 4s linear infinite;
}
</style>