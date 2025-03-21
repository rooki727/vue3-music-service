<template>
  <div class="playlists-detail">
    <div class="playlists-detail-header">
      <el-tooltip content="后退" placement="top" effect="light">
        <button @click="$router.back()" class="back-btn">
          <el-icon class="back-icon"><ArrowLeftBold /></el-icon>
        </button>
      </el-tooltip>
      <div class="header-content">
        <div class="content-left">
          <span class="left-listen-count" v-if="playlists?.listenCount"
            ><el-icon><Headset /></el-icon>{{ playlists?.listenCount }}</span
          >
          <img :src="playlists?.playlistImg" alt="" />
        </div>
        <div class="content-right">
          <h3>{{ playlists?.playlistName }}</h3>
          <div class="right-avatar-info">
            <img
              class="right-avatar"
              :src="
                playlists?.createByAvatar ? playlists?.createByAvatar : '../../assets/avatar.jpg'
              "
              alt=""
            />
            <span class="right-name"> {{ playlists?.createByName }}</span>
            <span class="right-build-time"
              >{{ playlists?.updateTime }}{{ id ? '创建' : '更新' }}</span
            >
          </div>
          <div class="right-btn">
            <el-button class="right-btn-playall" @click="playAll"
              ><el-icon style="font-size: 19px"><CaretRight /></el-icon>播放全部</el-button
            >
            <el-tooltip content="收藏" placement="top" effect="light">
              <el-button @click="handeleAddCollection()" class="collect-btn">
                <el-icon v-if="!isCollect" style="font-size: 18px"><FolderAdd /></el-icon>
                <el-icon v-else style="font-size: 18px"><FolderChecked /></el-icon
                >{{ isCollect ? '已收藏' : '收藏' }}
              </el-button>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>

    <div class="playlists-detail-content">
      <div class="song-count">
        <div class="song-title">歌曲</div>
        <div class="song-count-num">{{ playlists?.songList.length }}</div>
      </div>
    </div>
    <PlaylistsSongList
      :playlistsSongList="playlistsSongList"
      @deleteSongList="deleteSongList"
      :playlist_id="id"
      :isMine="playlists?.isMine"
    ></PlaylistsSongList>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import PlaylistsSongList from './components/Playlists-SongList.vue'
import { useSongStore } from '@/stores/SongStore'
import { ElMessage } from 'element-plus'
import {
  getRisePlaylistAPI,
  getNewPlaylistAPI,
  getHotSongListAPI,
  getRecommendPlaylistAPI,
  getPlaylistDetailAPI,
  collectPlaylistAPI,
  cancelCollectPlaylistAPI
} from '@/apis/playList'
const isCollect = ref(false)
const songStore = useSongStore()

const route = useRoute()
// 判断是recommendList还是playlists_id
const id = route.query.playlists_id
const title = route.query.title

// 根据playlists_id||recommendList_id获取歌单信息详情
const playlists = ref()
const playlistsSongList = ref([])
if (id) {
  getPlaylistDetailAPI(id).then((res) => {
    playlists.value = res.data
    playlistsSongList.value = res.data.songList
    isCollect.value = res.data.isCollect
  })
} else {
  const apiMap = {
    飙升榜: getRisePlaylistAPI,
    新歌榜: getNewPlaylistAPI,
    热歌榜: getHotSongListAPI,
    推荐榜: getRecommendPlaylistAPI
  }

  const apiFunction = apiMap[title]
  if (apiFunction) {
    apiFunction().then((res) => {
      playlists.value = res.data
      isCollect.value = res.data.isCollect
      playlistsSongList.value = res.data.songList
    })
  }
}

const playAll = () => {
  // 将当前的歌曲列表赋值给store
  songStore.setSongList(playlistsSongList.value)
  // store调用设置为第一首
  songStore.setCurrentTrackIndex(0)
  // store调用播放
  songStore.setPlayingStatus(true)
}
// 收藏按钮
const handeleAddCollection = async () => {
  if (isCollect.value) {
    isCollect.value = !isCollect.value
    await cancelCollectPlaylistAPI({ id: id })
    ElMessage({ message: '取消收藏', duration: 1000, type: 'warning' })
  } else {
    isCollect.value = !isCollect.value
    await collectPlaylistAPI({ id: id })
    ElMessage({ message: '收藏成功', duration: 1000, type: 'success' })
  }
  // 发送请求添加给该用户的收藏
}
const deleteSongList = (row) => {
  console.log(row.id)
  // 发送请求通过playlists_id删除对应的id
  console.log(playlists.value.playlists_id)

  // 发送请求重新获取歌单中的歌曲

  // 现在做假处理
  // 假设 songList 是一个响应式的数组
  playlistsSongList.value = playlistsSongList.value.filter((item) => {
    return item.id !== row.id // 过滤掉 id 和 row.id 相等的项
  })
}
</script>

<style lang="scss" scoped>
.playlists-detail {
  background-color: #fff;
}
.playlists-detail-header {
  position: relative;
  .back-btn {
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 25px;
    height: 30px;
    background-color: transparent;
    border: 1px solid #9d9c9c;
    border-radius: 5px;
    cursor: pointer;
  }
  .back-icon {
    font-size: 1.15rem;
    color: #9d9c9c;
  }
  .back-btn:hover .back-icon {
    color: #121111;
  }
  .header-content {
    padding-left: 4rem;
    height: 10rem;
    width: 60%;
    padding-top: 1.2rem;
    display: flex;
    .content-left {
      position: relative;

      .left-listen-count {
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
      img {
        width: 10rem;
        height: 10rem;
        border-radius: 15px;
      }
    }
    .content-right {
      margin-left: 1rem;
      position: relative;
      .right-avatar-info {
        display: flex;
        align-items: center;
        margin-top: 1rem;
        .right-avatar {
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
        }
        .right-name {
          margin-left: 0.7rem;
          font-size: 14px;
          color: #585555;
        }
        .right-build-time {
          margin-left: 0.8rem;
          font-size: 12px;
          color: #969292;
        }
      }
      .right-btn {
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        .right-btn-playall {
          border-radius: 10px;
          border: none;
          background-color: rgba(255, 0, 0, 0.582);
          color: white;
          transition: all 0.3s;
        }
        .right-btn-playall:hover {
          background-color: rgb(249, 6, 6);
          scale: (1.05);
        }
        .collect-btn {
          color: #3d3c3c;
          font-size: 13px;
        }
        .collect-btn:hover {
          border: none;
          background-color: #f1ececcf;
        }
      }
    }
  }
}

// 内容
.playlists-detail-content {
  .song-count {
    position: relative;
    height: 2.5rem;
    width: 60px;
    margin-top: 1rem;
    margin-left: 4rem;

    .song-title {
      line-height: 2.5rem;
      font-size: 18px;
      font-weight: 600;
    }
    .song-count-num {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 15px;
      color: #272727;
    }
  }
}
</style>