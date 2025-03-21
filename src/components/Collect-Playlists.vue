<template>
  <el-dialog
    :model-value="collectPlaylistVisible"
    width="480"
    style="border-radius: 15px"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <el-icon class="close-icon" @click="closeDialog" style="font-size: 25px"><Close /></el-icon>
    <h2 class="collect-title">收藏到歌单</h2>
    <div class="collect-playlists">
      <div class="collect-playlists-build" @click="createNewPlaylist">
        <el-icon class="collect-playlists-button" style="font-size: 20px"><Plus /></el-icon>
        <span>创建新歌单</span>
      </div>
      <!-- 封装收藏列表div -->
      <div
        class="collect-playlists-item"
        v-for="item in playlistStore.playlists"
        :key="item.id"
        @click="collectPlaylist(item.id)"
      >
        <div class="collect-playlists-item-left">
          <img class="item-left-img" :src="item.img" alt="" />
        </div>
        <div class="collect-playlists-item-right">
          <span class="item-right-title">{{ item.title }}</span>
          <span class="item-right-count" style="font-size: 12px; margin-top: 3px"
            >{{ item.songCount ? item.songCount : 0 }}首</span
          >
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useplaylistStore } from '@/stores/playlistStore'
import { addToPlaylistAPI } from '@/apis/playList'
import { ElMessage } from 'element-plus'
const playlistStore = useplaylistStore()
const props = defineProps(['collectPlaylistVisible', 'clickSongId'])
const collectPlaylistVisible = computed(() => props.collectPlaylistVisible)
const clickSongId = computed(() => props.clickSongId)
const emit = defineEmits(['changeCollectPlaylistVisible', 'openCreatePlaylistDialog'])
const closeDialog = () => {
  emit('changeCollectPlaylistVisible', false)
}

// 将获取到的歌曲发送请求收藏到该歌单
const collectPlaylist = async (id) => {
  console.log(clickSongId.value, id)
  await addToPlaylistAPI({ id: clickSongId.value, cid: id })
  // 完成请求后在回调函数中关闭弹窗
  closeDialog()
  ElMessage.success('收藏成功')
  playlistStore.getPlaylists()
}
const createNewPlaylist = () => {
  closeDialog()
  emit('openCreatePlaylistDialog', true)
}
onMounted(() => {
  playlistStore.getPlaylists()
})
</script>

<style lang="scss" scoped>
.close-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
.collect-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 2.3rem;
}
.collect-playlists {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: auto;

  .collect-playlists-build {
    padding: 0.4rem 0;
    width: 100%;
    height: 50px;
    cursor: pointer;
    .collect-playlists-button {
      height: 50px;
      width: 50px;
      background-color: #eae6e6;
      margin-right: 1.5rem;
      border-radius: 10px;
    }
  }
  .collect-playlists-build:hover {
    background-color: #ebe8e8a6;
  }
  .collect-playlists-item {
    cursor: pointer;
    padding: 0.4rem 0;
    display: flex;
    .collect-playlists-item-left {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      .item-left-img {
        width: 50px;
        height: 50px;
        border-radius: 10px;
      }
    }
    .collect-playlists-item-right {
      flex: 1;
      height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 1.5rem;
    }
  }
  .collect-playlists-item:hover {
    background-color: #ebe8e8a6;
  }
}
</style>