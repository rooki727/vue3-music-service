<template>
  <CreatePlaylists
    :createPlaylistsVisible="createPlaylistsVisible"
    @changeCreatePlaylistsVisible="changeCreatePlaylistsVisible"
  ></CreatePlaylists>
  <div class="playlistsIndex">
    <div class="playlists-title-header">
      <span class="playlists-title">我创建的歌单</span>
      <span class="create-playlists-icon">
        <el-tooltip content="创建歌单" placement="top" effect="light"
          ><el-icon @click="changeCreatePlaylistsVisible(true)"><FolderAdd /></el-icon
        ></el-tooltip>
      </span>
    </div>

    <PlaylistsItem :playlists="createPlaylists"></PlaylistsItem>
    <span class="playlists-title">我收藏的歌单</span>
    <PlaylistsItem :playlists="collectPlaylists"></PlaylistsItem>
  </div>
</template>

<script setup>
import CreatePlaylists from '@/components/Create-Playlists.vue'
import PlaylistsItem from '../../components/Playlists-Item.vue'
import { onMounted, ref } from 'vue'
import { listCollectAPI, listCreateAPI } from '@/apis/playList'
const createPlaylistsVisible = ref(false)
// 挂载时就请求接口获取歌单数据数组
const collectPlaylists = ref([])
const createPlaylists = ref([])
// 获取我创建的歌单数据
const getCreatePlaylists = async () => {
  const res = await listCreateAPI()
  createPlaylists.value = res.data
}
// 获取我收藏的歌单数据
const getCollectPlaylists = async () => {
  const res = await listCollectAPI()
  collectPlaylists.value = res.data
}
// 打开创建歌单弹窗
const changeCreatePlaylistsVisible = (value) => {
  createPlaylistsVisible.value = value
}
onMounted(() => {
  getCreatePlaylists()
  getCollectPlaylists()
})
</script>

<style lang="scss" scoped>
.playlistsIndex {
  padding: 1.5rem;
  height: 87vh;
  width: 83.4vw;
  overflow: auto;
  .playlists-title-header {
    display: flex;
  }
  .playlists-title {
    font-size: 1.2rem;
    color: rgb(104, 103, 103);
    font-weight: 600;
  }
  .create-playlists-icon {
    font-size: 1.5rem;
    cursor: pointer;
    margin-left: 1rem;
  }

  .create-playlists-icon:hover {
    color: rgb(134, 132, 132);
  }
}
</style>