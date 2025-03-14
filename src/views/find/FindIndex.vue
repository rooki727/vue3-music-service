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
import { ref } from 'vue'
import RecommentlistItem from './components/Recommendlist-Item.vue'
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
    title: '原创榜',
    img: '/recommendImage/yuanchuang.jpg'
  },
  {
    recommendList_id: 4,
    title: '热歌榜',
    img: '/recommendImage/rege.jpg'
  }
]
// 请求接口获取热门歌单列表推荐
const playlists = ref([
  {
    playlists_id: 1,
    img: 'src\\assets\\music-icon.jpg',
    title: '我喜欢的音乐1',
    listenCount: 100,
    count: 100
  },
  {
    playlists_id: 2,
    img: 'src\\assets\\music-icon.jpg',
    title: '我喜欢的音乐2',
    listenCount: 100,
    count: 20
  },
  {
    playlists_id: 3,
    img: 'src\\assets\\music-icon.jpg',
    title: '我喜欢的音乐3',
    listenCount: 100,
    count: 30
  },
  {
    playlists_id: 4,
    img: 'src\\assets\\music-icon.jpg',
    title: '我喜欢的音乐4',
    listenCount: 100,
    count: 400
  },
  {
    playlists_id: 5,
    img: 'src\\assets\\music-icon.jpg',
    title: '我喜欢的音乐5',
    listenCount: 100,
    count: 14
  },
  {
    playlists_id: 6,
    img: 'src\\assets\\music-icon.jpg',
    title: '我喜欢的音乐6',
    listenCount: 100,
    count: 120
  },
  {
    playlists_id: 7,
    img: 'src\\assets\\music-icon.jpg',
    title: '我喜欢的音乐7',
    listenCount: 100,
    count: 100
  }
])
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
