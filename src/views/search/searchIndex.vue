<template>
  <CollectPlaylists
    :collectPlaylistVisible="collectPlaylistVisible"
    :clickSongId="clickSongId"
    @changeCollectPlaylistVisible="changeCollectPlaylistVisible"
    @openCreatePlaylistDialog="openCreatePlaylistDialog"
  ></CollectPlaylists>
  <CreatePlaylists
    :createPlaylistsVisible="createPlaylistsVisible"
    @changeCreatePlaylistsVisible="changeCreatePlaylistsVisible"
  ></CreatePlaylists>
  <div class="song-list">
    <div class="search-played-header">
      <el-tooltip content="回到首页" placement="top" effect="light">
        <button @click="$router.replace('/')" class="back-btn">
          <el-icon class="back-icon"><House /></el-icon>
        </button>
      </el-tooltip>
      <h2 class="search-title">搜索结果</h2>
      <el-button class="right-btn-playall" @click="playAll"
        ><el-icon style="font-size: 19px"><CaretRight /></el-icon>播放全部</el-button
      >
    </div>

    <el-table
      ref="singleTableRef"
      :data="searchSongList"
      style="width: 100%"
      max-height="74vh"
      size="large"
    >
      <el-table-column type="index" label="#" width="100" />
      <el-table-column width="50">
        <template #default="{ row }">
          <span class="animaiton-isplaying" v-if="currentSongId === row.id && isPlaying"></span>
        </template>
      </el-table-column>
      <el-table-column property="img" width="65">
        <template #default="{ row }">
          <img :src="row.img" alt="" style="height: 49px; width: 49px; border-radius: 10px" />
        </template>
      </el-table-column>
      <el-table-column property="name" label="歌曲" width="350" />
      <el-table-column property="isLike" width="250">
        <template #default="{ row, $index }">
          <div class="btn-option">
            <el-tooltip content="暂停/播放" placement="top" effect="light">
              <el-button class="btn" @click="handlePlayClick($index)">
                <i class="iconfont icon-zanting" v-if="currentSongId === row.id && isPlaying"></i>
                <i class="iconfont icon-bofang" v-else></i>
              </el-button>
            </el-tooltip>
            <el-tooltip content="下一首播放" placement="top" effect="light">
              <el-button
                class="btn"
                @click="handleAddSongNext(row)"
                :disabled="currentSongId === row.id"
              >
                <el-icon style="font-size: 1.5rem"><CirclePlusFilled /></el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip content="收藏歌单" placement="top" effect="light">
              <el-button class="btn" @click="handleOpenPlaylists(row)">
                <el-icon style="font-size: 1.5rem"><FolderAdd /></el-icon>
              </el-button>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="singer" label="歌手" width="180" />
      <el-table-column property="album" label="专辑" width="200" />
      <el-table-column label="喜爱" width="120">
        <template #default="{ $index, row }">
          <el-button class="love-btn" @click="handleIsLove($index, row)">
            <i class="iconfont icon-like__easyico" v-if="row.isLike"></i>
            <i class="iconfont icon-xiai" v-else></i>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column property="playCount" label="播放次数" width="120" />
    </el-table>
  </div>
</template>

<script setup>
import CollectPlaylists from '@/components/Collect-Playlists.vue'
import CreatePlaylists from '@/components/Create-Playlists.vue'
import { useSongStore } from '@/stores/SongStore'
import { ElMessage } from 'element-plus'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { likeSongAPI, dislikeSongAPI, searchSongAPI } from '@/apis/song'
const songStore = useSongStore()
const currentSongId = computed(() => songStore.currentSongId)
const isPlaying = computed(() => songStore.isPlaying)
const route = useRoute()
const searchSongList = ref([])
const collectPlaylistVisible = ref(false)
const createPlaylistsVisible = ref(false)
//根据关键词搜索歌曲，获取歌曲列表
const keywords = ref('')
// 获取用户的搜索歌曲根据keywords
const getsearchSong = async () => {
  await searchSongAPI({ data: keywords.value }).then((res) => {
    searchSongList.value = res.data
    console.log(searchSongList.value)
  })
}
// 监控页面的keywords变化来更新，重新请求搜索结果
watch(
  () => route.query.keywords, // 监听 route.query.keywords,
  (newKeywords) => {
    keywords.value = newKeywords // 更新 keywords
    console.log(keywords.value)
    getsearchSong()
  },
  { immediate: true }
)

// 处理播放按钮点击事件
const handlePlayClick = (index) => {
  if (currentSongId.value === searchSongList.value[index].id) {
    if (isPlaying.value) {
      songStore.setPlayingStatus(false)
    } else {
      songStore.setPlayingStatus(true)
    }
  } else {
    songStore.setSongList(searchSongList.value)
    songStore.setCurrentTrackIndex(index)
    songStore.setPlayingStatus(true)
  }
}

// 处理喜欢按钮点击事件
const handleIsLove = (index, row) => {
  row.isLike = !row.isLike
  // 请求接口更新后台的喜欢状态，在回调函数中更新isLike
  if (row.isLike) {
    likeSongAPI({ id: row.id }).then(() => {
      ElMessage.success('已添加到喜欢')
    })
  } else {
    dislikeSongAPI({ id: row.id }).then(() => {
      ElMessage.success('已取消喜欢')
    })
  }
  console.log('当前行的数据:', row.isLike)
}
const handleAddSongNext = (row) => {
  songStore.addNextSong(row)
  ElMessage.success('已添加到下一首播放')
  // 请求接口更新后台的正在播放列表
}
// 处理弹出可见事件
const changeCollectPlaylistVisible = (value) => {
  collectPlaylistVisible.value = value
}
const changeCreatePlaylistsVisible = (value) => {
  createPlaylistsVisible.value = value
}
const openCreatePlaylistDialog = (value) => {
  createPlaylistsVisible.value = value
}
const clickSongId = ref(null)
// 打开收藏到歌单
const handleOpenPlaylists = (row) => {
  collectPlaylistVisible.value = true
  clickSongId.value = row.id
}

// 播放全部
const playAll = () => {
  // 将当前的歌曲列表赋值给store
  songStore.setSongList(searchSongList.value)
  // store调用设置为第一首
  songStore.setCurrentTrackIndex(0)
  // store调用播放
  songStore.setPlayingStatus(true)
}
</script>

<style lang="scss" scoped>
.song-list {
  padding: 1.5rem;
  background-color: #fff;
  height: 87vh;
  width: 84.2vw;
  .search-played-header {
    display: flex;
    position: relative;
    .back-btn {
      position: absolute;
      top: 0rem;
      left: 0rem;
      width: 30px;
      height: 30px;
      background-color: transparent;
      border: 1px solid #9d9c9c;
      border-radius: 50%;
      cursor: pointer;
    }
    .back-icon {
      font-size: 1.15rem;
      color: #9d9c9c;
    }
    .back-btn:hover .back-icon {
      color: #121111;
    }
    .search-title {
      margin-left: 2.8rem;
      font-size: 1.5rem;
      color: #817f7f;
    }
    .right-btn-playall {
      margin-left: 3rem;
      border-radius: 10px;
      border: none;
      background-color: rgba(255, 0, 0, 0.586);
      color: white;
      transition: all 0.3s;
    }
    .right-btn-playall:hover {
      background-color: rgb(249, 6, 6);
      scale: (1.05);
    }
  }
}
// 封装按钮样式
@mixin btn-icon-style {
  padding: 0;
  margin: 0;
  width: 30px;
  margin-left: 0.5rem;
  height: 30px;
  border: none;
  color: #9b9898;
  background-color: transparent;
  transition: all 0.2s;
}
.btn-option {
  display: flex;

  .btn {
    @include btn-icon-style;
    opacity: 0;
    i.iconfont {
      font-size: 1.5rem;
      color: #7e7d7d;
    }
  }
  .btn:hover {
    background-color: transparent;
    color: #444343;
  }
}
.love-btn {
  @include btn-icon-style;
  i.iconfont {
    font-size: 1.2rem;
    color: rgba(255, 38, 0, 0.725);
  }
}
.love-btn:hover {
  background-color: transparent;
  color: #4a4848;
}
.el-table__row:hover .btn {
  opacity: 1;
}
.animaiton-isplaying {
  cursor: pointer;
  margin: 0;
  padding: 0;
  width: 50px;
  height: 50px;
  background-image: url('../../assets/aigei_com.gif'); /* 修正路径，避免双斜杠 */
  background-size: contain; /* 保持背景图按比例缩放 */
  background-repeat: no-repeat; /* 不重复背景 */
  background-position: center; /* 背景图居中显示 */
  display: inline-block;
  text-align: center;
  font-size: 0;
}
</style>
