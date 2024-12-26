<template>
  <div class="playlists-list">
    <div
      class="playlists-item"
      v-for="item in playlists"
      :key="item.playlists_id"
      @click="goToDetail(item.playlists_id)"
    >
      <div class="item-content">
        <el-tooltip content="暂停/播放" placement="top" effect="light">
          <button @click.stop="choosePlaylists(item.playlists_id)" class="item-play-button">
            <i class="iconfont icon-bofang"></i>
          </button>
        </el-tooltip>
        <span class="item-listen-count"
          ><el-icon><Headset /></el-icon>{{ item.listenCount }}</span
        >
        <img class="item-image" :src="item.img" alt="封面加载失败" />
        <p class="item-title">{{ item.title }}</p>
        <p class="item-count">{{ item.count }}首</p>
      </div>
      <div class="overlay"></div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
// import { useSongStore } from '@/stores/SongStore'
defineProps({
  playlists: {
    type: Object,
    required: true
  }
})
// const songStore = useSongStore()
const choosePlaylists = (playlists_id) => {
  console.log(playlists_id)

  // 根据歌单的id获取歌曲列表
  // songStore.setSongList(res.data)
  // 设置当前播放的歌曲
  // songStore.setCurrentTrackIndex(0)
  // 开始播放
  //  songStore.setPlayingStatus(true)
}
const goToDetail = (playlists_id) => {
  router.push(`/playlistsdetail?playlists_id=${playlists_id}`)
}
</script>

<style lang="scss" scoped>
.playlists-list {
  display: flex;
  flex-wrap: wrap;
  .playlists-item {
    position: relative;
    width: 200px;
    height: 250px;
    background-color: transparent;
    margin: 1rem;
    border-radius: 15px;
    cursor: pointer;
    .item-content {
      position: relative;
      width: 100%;
      height: 100%;
      .item-listen-count {
        position: absolute;
        max-width: 50px;
        top: 3%;
        right: 5%;
        color: white;
        font-size: 13px;
        font-weight: bold;
        display: flex;
        align-items: center;
      }
      .item-play-button {
        position: absolute;
        bottom: 25%;
        right: 6%;
        width: 30px;
        height: 30px;
        border: none;
        background-color: transparent;
        display: flex;
        color: white;
        justify-content: center;
        align-items: center;

        cursor: pointer;
        z-index: 2;
        opacity: 0;
        transition: background-color 0.3s ease;

        i.iconfont {
          font-size: 1.75rem;
        }
        &:hover {
          color: #e3dddd;
          transform: scale(1.02);
        }
      }
      .item-image {
        width: 100%;
        height: 80%;
        border-radius: 15px;
      }
      .item-title {
        margin: 0 5%;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #3f3d3d;
      }
      .item-count {
        margin: 0 5%;
        font-size: 13px;
        color: #6f6d6d;
      }
    }
    // 悬浮蒙层
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 80%;
      border-radius: 15px;
      background-color: rgba(125, 124, 124, 0.5); /* 半透明的黑色背景 */
      opacity: 0; /* 默认隐藏蒙层 */
      transition: opacity 0.3s ease; /* 添加过渡效果 */
    }
  }
  .playlists-item:hover {
    background-color: white;
  }
  .playlists-item:hover .item-play-button {
    opacity: 1;
  }

  .playlists-item:hover .overlay {
    opacity: 1; /* 鼠标悬浮时显示蒙层 */
  }
}
</style>