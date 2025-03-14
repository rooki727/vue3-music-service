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
    <el-table
      ref="singleTableRef"
      :data="playlistsSongList"
      style="width: 100%"
      max-height="55vh"
      size="large"
    >
      <el-table-column type="index" label="#" width="50" />
      <el-table-column width="50">
        <template #default="{ row }">
          <span
            class="animaiton-isplaying"
            v-if="currentSongId === row.song_id && isPlaying"
          ></span>
        </template>
      </el-table-column>
      <el-table-column property="song_img" width="65">
        <template #default="{ row }">
          <img :src="row.song_img" alt="" style="height: 49px; width: 49px; border-radius: 10px" />
        </template>
      </el-table-column>
      <el-table-column property="song_name" label="歌曲" width="470" />
      <el-table-column property="isLike" width="200">
        <template #default="{ row, $index }">
          <div class="btn-option">
            <el-tooltip content="暂停/播放" placement="top" effect="light">
              <el-button class="btn" @click="handlePlayClick($index)">
                <i
                  class="iconfont icon-zanting"
                  v-if="currentSongId === row.song_id && isPlaying"
                ></i>
                <i class="iconfont icon-bofang" v-else></i>
              </el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top" effect="light">
              <el-button class="btn" @click="handleCloseClick(row)">
                <el-icon style="font-size: 1.5rem"><Delete /></el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip content="下一首播放" placement="top" effect="light">
              <el-button
                class="btn"
                @click="handleAddSongNext(row)"
                :disabled="currentSongId === row.song_id"
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
      <el-table-column property="singer" label="歌手" width="160" />
      <el-table-column property="duration" label="时长" width="150" />
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, ref } from 'vue'
const props = defineProps({
  playlistsSongList: {
    type: Array
  }
})
const emit = defineEmits(['deleteSongList'])
const songStore = useSongStore()
const currentSongId = computed(() => songStore.currentSongId)
const isPlaying = computed(() => songStore.isPlaying)
const playlistsSongList = computed(() => props.playlistsSongList)

const collectPlaylistVisible = ref(false)
const createPlaylistsVisible = ref(false)
// 处理播放按钮点击事件
const handlePlayClick = (index) => {
  if (currentSongId.value === playlistsSongList.value[index].song_id) {
    if (isPlaying.value) {
      songStore.setPlayingStatus(false)
    } else {
      songStore.setPlayingStatus(true)
    }
  } else {
    songStore.setSongList(playlistsSongList.value)
    songStore.setCurrentTrackIndex(index)
    songStore.setPlayingStatus(true)
  }
}
const handleCloseClick = (row) => {
  ElMessageBox.confirm('确定移出歌单吗？', '提醒', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    confirmButtonClass: 'el-button--danger',
    cancelButtonClass: 'el-button--info',
    type: 'warning'
  }).then(() => {
    // 通知父组件删除当前行
    emit('deleteSongList', row)
  })
}
// 处理喜欢按钮点击事件
const handleIsLove = (index, row) => {
  row.isLike = !row.isLike
  // 请求接口更新后台的喜欢状态，在回调函数中更新isLike
  console.log('当前行的数据:', row.isLike)
}
const handleAddSongNext = (row) => {
  songStore.addNextSong(row)
  console.log(playlistsSongList.value)

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
  clickSongId.value = row.song_id
}
</script>

<style lang="scss" scoped>
.song-list {
  height: 64vh;
  width: 100%;
}
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
    color: #000000;
  }
}
.love-btn {
  @include btn-icon-style;
  i.iconfont {
    font-size: 1.2rem;
    color: rgba(255, 38, 0, 0.725);
  }
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
  background-image: url('../../../assets/aigei_com.gif'); /* 修正路径，避免双斜杠 */
  background-size: contain; /* 保持背景图按比例缩放 */
  background-repeat: no-repeat; /* 不重复背景 */
  background-position: center; /* 背景图居中显示 */
  display: inline-block;
  text-align: center;
  font-size: 0;
}
</style>
