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
          <span class="left-listen-count"
            ><el-icon><Headset /></el-icon>{{ playlists.listenCount }}</span
          >
          <img src="../../assets/music-icon.jpg" alt="" />
        </div>
        <div class="content-right">
          <h3>{{ playlists.title }}</h3>
          <div class="right-avatar-info">
            <img
              class="right-avatar"
              :src="playlists.avatar ? playlists.avatar : '../../assets/avatar.jpg'"
              alt=""
            />
            <span class="right-name"> {{ playlists.author }}</span>
            <span class="right-build-time"
              >{{ playlists.buildTime }}{{ playlists_id ? '创建' : '更新' }}</span
            >
          </div>
          <div class="right-btn">
            <el-button class="right-btn-playall" @click="playAll"
              ><el-icon style="font-size: 19px"><CaretRight /></el-icon>播放全部</el-button
            >
            <el-tooltip content="收藏" placement="top" effect="light">
              <el-button @click="handeleAddCollection" class="collect-btn">
                <el-icon v-if="!isCollect" style="font-size: 18px"><FolderAdd /></el-icon>
                <el-icon v-else style="font-size: 18px"><FolderChecked /></el-icon>收藏
              </el-button>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>

    <div class="playlists-detail-content">
      <div class="song-count">
        <div class="song-title">歌曲</div>
        <div class="song-count-num">{{ playlists.count }}</div>
      </div>
    </div>
    <PlaylistsSongList
      :playlistsSongList="playlistsSongList"
      @deleteSongList="deleteSongList"
    ></PlaylistsSongList>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import PlaylistsSongList from './components/Playlists-SongList.vue'
import { useSongStore } from '@/stores/SongStore'
import { ElMessage } from 'element-plus'
const isCollect = ref(false)
const songStore = useSongStore()

const route = useRoute()
// 判断是recommendList_id还是playlists_id
const playlists_id = route.query.playlists_id
const recommendList_id = route.query.recommendList_id

// 根据playlists_id||recommendList_id获取歌单信息详情
const playlists = ref({
  playlists_id: 1,
  img: '',
  avatar:
    'http://119.29.168.176:8080/library_ssm/static/1aaa6171-5905-4a7e-9670-2877ec72e752_book.jpg',
  title: '我喜欢的音乐',
  listenCount: 100,
  count: 100,
  author: '123',
  buildTime: '2023-01-01'
})
if (playlists_id) {
  console.log('playlists_id：' + playlists_id)
} else {
  console.log('recommendList_id：' + recommendList_id)
}
// 根据playlists_id||recommendList_id获取歌单歌曲列表
// const getplaylistsDetail = async () => {
//   if (playlists_id) {
//     const res = await songStore.getPlaylistsDetail(playlists_id)
//     playlists.value = res
//   } else if (recommendList_id) {
//     const res = await songStore.getRecommendListDetail(recommendList_id)
//     playlists.value = res
//   }
// }
// const getplaylistsSongList = async () => {
//   if (playlists_id) {
//     const res = await songStore.getPlaylistsSongList(playlists_id)
//     playlistsSongList.value = res
//   } else if (recommendList_id) {
//     const res = await songStore.getRecommendListSongList(recommendList_id)
//     playlistsSongList.value = res
//   }
// }

const playlistsSongList = ref([
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
])
const playAll = () => {
  // 将当前的歌曲列表赋值给store
  songStore.setSongList(playlistsSongList.value)
  // store调用设置为第一首
  songStore.setCurrentTrackIndex(0)
  // store调用播放
  songStore.setPlayingStatus(true)
}
// 收藏按钮
const handeleAddCollection = () => {
  if (isCollect.value) {
    isCollect.value = !isCollect.value
    ElMessage({ message: '取消收藏', duration: 1000 })
  } else {
    isCollect.value = !isCollect.value
    ElMessage({ message: '收藏成功', duration: 1000, type: 'success' })
  }
  // 发送请求添加给该用户的收藏
}
const deleteSongList = (row) => {
  console.log(row.song_id)
  // 发送请求通过playlists_id删除对应的song_id
  console.log(playlists.value.playlists_id)

  // 发送请求重新获取歌单中的歌曲

  // 现在做假处理
  // 假设 songList 是一个响应式的数组
  playlistsSongList.value = playlistsSongList.value.filter((item) => {
    return item.song_id !== row.song_id // 过滤掉 song_id 和 row.song_id 相等的项
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