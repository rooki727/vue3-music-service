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
  <EditSongDialog
    :editSongVisible="editSongVisible"
    @closeEditSongDialog="closeEditSongDialog"
    :clickRow="clickRow"
    @updateClickRow="updateClickRow"
  ></EditSongDialog>
  <div class="song-list">
    <div class="upload-played-header">
      <h2 class="upload-title">我上传的</h2>
      <el-button class="right-btn-playall" @click="playAll"
        ><el-icon style="font-size: 19px"><CaretRight /></el-icon>播放全部</el-button
      >
    </div>

    <el-table
      ref="singleTableRef"
      :data="uploadSongList"
      style="width: 100%"
      max-height="66vh"
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
      <el-table-column property="song_name" label="歌曲" width="430" />
      <el-table-column property="isLike" width="230">
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
              <el-button class="btn" @click="handleCloseClick($index, row)">
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
            <el-tooltip content="修改歌曲" placement="top" effect="light">
              <el-button class="btn" @click="handleEditSong(row)">
                <el-icon style="font-size: 1.5rem"><Edit /></el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip content="管理评论" placement="top" effect="light">
              <el-button class="btn" @click="handGoComment(row)">
                <el-icon style="font-size: 1.5rem"><ChatLineRound /></el-icon>
              </el-button>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="singer" label="歌手" width="160" />
      <el-table-column property="duration" label="时长" width="120" />
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
import { computed, onMounted, ref } from 'vue'
import EditSongDialog from './EditSong-Dialog.vue'
import router from '@/router'
const songStore = useSongStore()
const currentSongId = computed(() => songStore.currentSongId)
const isPlaying = computed(() => songStore.isPlaying)
const uploadSongList = ref([])
const collectPlaylistVisible = ref(false)
const createPlaylistsVisible = ref(false)
const clickRow = ref({})
// 处理播放按钮点击事件
const handlePlayClick = (index) => {
  if (currentSongId.value === uploadSongList.value[index].song_id) {
    if (isPlaying.value) {
      songStore.setPlayingStatus(false)
    } else {
      songStore.setPlayingStatus(true)
    }
  } else {
    songStore.setSongList(uploadSongList.value)
    songStore.setCurrentTrackIndex(index)
    songStore.setPlayingStatus(true)
  }
}
// 处理删除按钮点击事件
const handleCloseClick = (index, row) => {
  ElMessageBox.confirm('确定删除你上传的歌曲吗？', '提醒', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    confirmButtonClass: 'el-button--danger',
    cancelButtonClass: 'el-button--info',
    type: 'warning'
  }).then(() => {
    // 请求删除我的音乐接口
    // 在回到函数中更新前端的数据
    uploadSongList.value.splice(index, 1)
    console.log(row.song_id)
  })
}
// 处理喜欢按钮点击事件
const handleIsLove = (index, row) => {
  row.isLike = !row.isLike
  // 请求接口更新后台的喜欢状态，在回调函数中更新isLike
  console.log('当前行的数据:', row.isLike)
}
// 处理下一首播放按钮点击事件
const handleAddSongNext = (row) => {
  songStore.addNextSong(row)
  ElMessage.success('已添加到下一首播放')
  // 请求接口更新后台的正在播放列表
}
// 处理编辑歌曲按钮
const editSongVisible = ref(false)
const closeEditSongDialog = (value) => {
  editSongVisible.value = value
}
const updateClickRow = (row) => {
  clickRow.value = row
}
const handleEditSong = (row) => {
  clickRow.value = row
  editSongVisible.value = true
}
// 处理管理评论页面
const handGoComment = (row) => {
  router.push(`/comment?way=1&song_id=${row.song_id}`)
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
// 获取用户的最近播放歌曲根据store里的user_id
const getRecentlyPlayed = async () => {
  uploadSongList.value = [
    {
      song_id: 1,
      song_img:
        'https://ts2.cn.mm.bing.net/th?id=OIP.hpZGHxGucRaBho0fUp4FgAHaHa&w=298&h=298&c=10&rs=1&qlt=99&bgcl=fffffe&r=0&o=6&dpr=1.1&pid=MultiSMRSV2Source',
      song_name: '陪你渡过漫长岁月',
      singer: '陈奕迅',
      song_file: 'src\\assets\\song\\陪你渡过漫长岁月.mp3',
      playCount: 1000,
      duration: '03:45',
      isLike: false,
      album: 'album1'
    },
    {
      song_id: 2,
      song_img:
        'https://ts2.cn.mm.bing.net/th?id=ODL.03197bfbbeca33bed8b221d7cb75741e&w=298&h=298&c=10&rs=1&qlt=99&bgcl=fffffe&r=0&o=6&dpr=1.1&pid=WrapstarImage',
      song_name: '难念的经',
      singer: '周华勇 ',
      song_file: 'src\\assets\\song\\难念的经.mp3',
      playCount: 1000,
      duration: '03:25',
      isLike: false,
      album: 'album1'
    },
    //
    {
      song_id: 3,
      song_img:
        'https://tse3-mm.cn.bing.net/th/id/OIP-C.JMcf6rc-pJ7WuFlc9qhCTAHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      song_name: '孤勇者',
      singer: '陈奕迅',
      song_file: 'src\\assets\\song\\孤勇者.mp3',
      playCount: 1000,
      duration: '04:45',
      isLike: false,
      album: 'album1'
    },
    {
      song_id: 4,
      song_img:
        'https://tse2-mm.cn.bing.net/th/id/OIP-C.g9zmtDMG16s101qt3e9xGgHaHa?w=157&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      song_name: '大鱼',
      singer: '周深',
      song_file: 'src\\assets\\song\\大鱼.mp3',
      playCount: 1000,
      duration: '05:45',
      isLike: false,
      album: 'album1'
    },
    {
      song_id: 5,
      song_img:
        'https://tse3-mm.cn.bing.net/th/id/OIP-C.P-r2setjViGAPKQ2I6KGDQHaE8?w=279&h=186&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      song_name: '意外',
      singer: '薛之谦',
      song_file: 'src\\assets\\song\\意外.mp3',
      playCount: 1000,
      duration: '03:25',
      isLike: true,
      album: 'album1'
    },
    {
      song_id: 6,
      song_img:
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.oSpPSE8ld_OqAZc5O6KkNwAAAA?w=116&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      song_name: '不染',
      singer: '毛不易',
      song_file: 'src\\assets\\song\\不染.mp3',
      playCount: 1000,
      duration: '03:55',
      isLike: true,
      album: 'album1'
    },
    {
      song_id: 7,
      song_img: 'https://puui.qpic.cn/vpic_cover/n3313422o5d/n3313422o5d_hz.jpg/1280',
      song_name: '无名的人',
      singer: '毛不易',
      song_file: 'src\\assets\\song\\无名的人.mp3',
      playCount: 1000,
      duration: '03:45',
      isLike: true,
      album: 'album1'
    },
    {
      song_id: 8,
      song_img:
        'https://tse2-mm.cn.bing.net/th/id/OIP-C.ZYosQqTlui_VPgrcTSTnjgHaEK?w=314&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      song_name: '稻香',
      singer: '周杰伦',
      song_file: 'src\\assets\\song\\稻香.mp3',
      playCount: 1000,
      duration: '03:45',
      isLike: true,
      album: 'album1'
    },
    {
      song_id: 9,
      song_img:
        'https://tse4-mm.cn.bing.net/th/id/OIP-C.zDSellii_LNFxv-CQvC0ygAAAA?w=169&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      song_name: '告白气球',
      singer: '周杰伦',
      song_file: 'src\\assets\\song\\告白气球.mp3',
      playCount: 1000,
      duration: '03:45',
      isLike: true,
      album: 'album1'
    },

    {
      song_id: 10,
      song_img:
        'https://tse4-mm.cn.bing.net/th/id/OIP-C.9Lo-xsTa_kUx8H-s3l34aQHaEK?w=324&h=182&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      song_name: '兰亭序',
      singer: '周杰伦',
      song_file: 'src\\assets\\song\\兰亭序.mp3',
      playCount: 1000,
      duration: '03:45',
      isLike: true,
      album: 'album1'
    },

    {
      song_id: 12,
      song_img:
        'https://tse3-mm.cn.bing.net/th/id/OIP-C.DiXx1eufnVR-UZW49StJFgAAAA?w=203&h=203&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      song_name: '这就是爱',
      singer: '张杰',
      song_file: 'src\\assets\\song\\这就是爱.mp3',
      playCount: 1000,
      duration: '03:45',
      isLike: true,
      album: 'album1'
    },
    {
      song_id: 13,
      song_img:
        'https://tse2-mm.cn.bing.net/th/id/OIP-C.LHDIW_pJ8s2CvqEXrX_uswAAAA?w=170&h=132&c=7&r=0&o=5&dpr=1.1&pid=1.7',
      song_name: '有何不可',
      singer: '许嵩',
      song_file: 'src\\assets\\song\\有何不可.mp3',
      playCount: 1000,
      duration: '03:45',
      isLike: true,
      album: 'album1'
    }
  ]
}
// 播放全部
const playAll = () => {
  // 将当前的歌曲列表赋值给store
  songStore.setSongList(uploadSongList.value)
  // store调用设置为第一首
  songStore.setCurrentTrackIndex(0)
  // store调用播放
  songStore.setPlayingStatus(true)
}
onMounted(() => getRecentlyPlayed())
</script>

<style lang="scss" scoped>
.song-list {
  padding-top: 1rem;
  .upload-played-header {
    display: flex;
    .upload-title {
      font-size: 1.5rem;
      color: #817f7f;
    }
    .right-btn-playall {
      margin-left: 5rem;
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
