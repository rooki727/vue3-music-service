<template>
  <div class="find-index">
    <span class="find-title">榜单精选</span>
    <div class="recomment-list">
      <RecommentlistItem
        v-for="item in recommendList"
        :key="item.recommendList_id"
        :recommend="item"
      ></RecommentlistItem>
    </div>
    <span class="find-title">热门歌单</span>
    <PlaylistsItem :playlists="playlists"></PlaylistsItem>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import RecommentlistItem from './components/Recommendlist-Item.vue'
import { getHotPlaylistAPI } from '@/apis/playList'
const recommendList = [
  {
    recommendList_id: 1,
    title: '飙升榜',
    img: '/recommendImage/biaosheng.jpg'
  },
  {
    recommendList_id: 2,
    title: '新歌榜',
    img: '/recommendImage/xinge.jpg'
  },
  {
    recommendList_id: 3,
    title: '热歌榜',
    img: '/recommendImage/rege.jpg'
  },
  {
    recommendList_id: 4,
    title: '推荐榜',
    img: '/recommendImage/recommend.jpg'
  }
]
// 请求接口获取热门歌单列表推荐
const playlists = ref([])
const getHotPlaylist = async () => {
  const res = await getHotPlaylistAPI()
  playlists.value = res.data
  playlists.value.sort((a, b) => b.listenCount - a.listenCount)
}
onMounted(() => {
  getHotPlaylist()
})
</script>

<style lang="scss" scoped>
.find-index {
  padding: 1.5rem;
  height: 87vh;
  width: 83.4vw;
  overflow: auto;
  .find-title {
    font-size: 1.2rem;
    color: rgb(104, 103, 103);
    font-weight: 600;
  }
  .recomment-list {
    height: 200px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 4rem;
  }
}
</style>
