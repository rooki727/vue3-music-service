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
import { ElMessage } from 'element-plus'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

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
  searchSongList.value = [
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
      duration: '03:45',
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
      duration: '03:45',
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
      duration: '03:45',
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
      duration: '03:45',
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
      duration: '03:45',
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
      song_id: 11,
      song_img: 'src\\assets\\avatar.jpg',
      song_name: '他不懂',
      singer: '张杰',
      song_file: 'src\\assets\\song\\他不懂.mp3',
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
    },
    {
      song_id: 14,
      song_img: 'src\\assets\\avatar.jpg',
      song_name: '清明雨上',
      singer: '许嵩',
      song_file: 'src\\assets\\song\\清明雨上.mp3',
      playCount: 1000,
      duration: '03:45',
      isLike: true,
      album: 'album1'
    }
  ]
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
  if (currentSongId.value === searchSongList.value[index].song_id) {
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
  clickSongId.value = row.song_id
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
onMounted(() => getsearchSong())
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
