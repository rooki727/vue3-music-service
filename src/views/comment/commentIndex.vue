<template>
  <div class="commentIndex">
    <el-tooltip content="后退" placement="top" effect="light">
      <button @click="$router.back()" class="back-btn">
        <el-icon class="back-icon"><ArrowLeftBold /></el-icon>
      </button>
    </el-tooltip>
    <!-- 头部信息区 -->
    <div class="commentIndex-header">
      <img class="commentIndex-header-img" :src="comment.img" alt="" />
      <div class="commentIndex-header-info">
        <p class="header-info-songname">{{ comment.name }}</p>
        <span class="header-info-songauthor">专辑：{{ comment.album }}</span>
        <span class="header-info-songauthor">歌手：{{ comment.author }}</span>
      </div>
    </div>
    <!-- 输入框 -->
    <div class="commentIndex-input">
      <div class="input-title">
        <span class="input-title-count">{{ comment.comments?.length }} </span>
        <span class="input-title-text">全部评论</span>
      </div>
      <div class="input-content">
        <el-input
          class="comment-input"
          v-model="inputComment"
          style="width: 90%"
          type="textarea"
          :rows="3"
          resize="none"
          maxlength="140"
          show-word-limit
          placeholder="说点什么吧"
        />
        <el-button class="comment-btn" @click="publishComment">发布</el-button>
      </div>
    </div>
    <!-- 评论列表 -->
    <span class="commentIndex-content-title">精彩评论</span>
    <div class="commentIndex-content">
      <div class="commentIndex-item" v-for="(item, index) in comment.commentList" :key="item.id">
        <img class="commentIndex-item-img" :data-src="item.avatarUrl" alt="" v-lazy />
        <div class="commentIndex-item-right">
          <p class="item-right-name">{{ item.username }}</p>
          <p class="item-right-content">{{ item.content }}</p>
          <p class="item-right-time">{{ item.createTime }}</p>
        </div>
        <el-tooltip content="删除" placement="top" effect="light">
          <el-button class="comment-btn" @click="handleCloseClick(index, item)" v-if="way == 1">
            <el-icon style="font-size: 1.3rem"><Delete /></el-icon>
          </el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onBeforeMount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getSongCommentAPI, addSongCommentAPI, deleteSongCommentAPI } from '@/apis/song'
const route = useRoute()
const id = route.query.id
const way = route.query.way
const inputComment = ref('')
console.log('该评论歌曲id为：' + id)
// 根据id获取歌曲评论信息
const comment = ref([])
const getSongComment = async () => {
  const res = await getSongCommentAPI({ id: id })
  comment.value = res.data
}
// 发布
const publishComment = async () => {
  await addSongCommentAPI({ id: id, data: inputComment.value }).then(() => {
    getSongComment()
    inputComment.value = ''
  })
  if (inputComment.value) {
    console.log(inputComment.value)
  }
}
// 处理删除按钮点击事件
const handleCloseClick = (index, item) => {
  ElMessageBox.confirm('确定删除该歌曲的评论吗？', '提醒', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    confirmButtonClass: 'el-button--danger',
    cancelButtonClass: 'el-button--info',
    type: 'warning'
  }).then(async () => {
    // 请求删除我的音乐的评论根据id
    await deleteSongCommentAPI({ id: item.id }).then(() => {
      ElMessage({
        message: '删除评论成功',
        type: 'success'
      })
      comment.value.commentList.splice(index, 1)
    })
  })
}
// 懒加载指令
const lazyDirective = {
  mounted(el) {
    const loadImage = () => {
      const dataSrc = el.getAttribute('data-src')
      if (dataSrc) {
        el.src = dataSrc
        el.removeAttribute('data-src')
      }
    }
    // 使用 IntersectionObserver 监听图片是否进入视口
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage()
            observer.disconnect() // 图片加载完成后停止观察
          }
        })
      },
      {
        rootMargin: '10px' // 提前加载图片,实际开发调高，调试可低些
      }
    )

    observer.observe(el)

    // 清理观察器
    el.__lazyObserver__ = observer
  },
  unmounted(el) {
    if (el.__lazyObserver__) {
      el.__lazyObserver__.disconnect() // 卸载时清理观察器
      delete el.__lazyObserver__
    }
  }
}
onBeforeMount(() => {
  const { appContext } = getCurrentInstance()

  // 检查指令是否已经注册
  if (!appContext.app._context.directives.lazy) {
    appContext.app.directive('lazy', lazyDirective)
  }
})
onMounted(() => {
  getSongComment()
})
// 在组件中注册懒加载指令
</script>

<style lang="scss" scoped>
.commentIndex {
  padding: 1rem;
  background-color: #fff;
  height: 88vh;
  width: 84.8vw;
  .back-btn {
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
  // 评论头部
  .commentIndex-header {
    height: 4.5rem;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    margin-left: 2rem;
    margin-top: 1rem;
    .commentIndex-header-img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 8px;
    }
    .header-info-songname {
      margin-left: 1rem;
      font-size: 1.1rem;
      color: #615f5f;
    }
    .header-info-songauthor {
      margin-left: 1rem;
      font-size: 0.8rem;
      color: #9d9c9c;
    }
  }
  // 评论输入框
  .commentIndex-input {
    .input-title {
      position: relative;
      margin-left: 2rem;
      width: 6rem;
      height: 2.5rem;
      line-height: 2.5rem;

      .input-title-text {
        font-size: 1.1rem;
        font-weight: bold;
        color: #3e3e3e;
      }
      .input-title-count {
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
        font-size: 13px;
        color: #858383;
      }
    }
    // 评论输入框内容
    .input-content {
      margin-top: 0.5rem;
      margin-left: 2rem;
      position: relative;

      .comment-btn {
        position: absolute;
        right: 5.5%;
        bottom: 0;
        border: none;
      }
      .comment-btn:hover {
        background-color: transparent;
        color: #7c7878;
        font-weight: bold;
      }
    }
  }
  .commentIndex-content-title {
    display: block;
    font-size: 17px;
    color: #515050;
    font-weight: bold;
    margin-left: 2rem;
    margin-top: 1rem;
  }
  .commentIndex-content {
    width: 90%;
    height: 53%;
    border-bottom: 1px solid #e6e6e6;
    margin-left: 2rem;
    overflow: auto;
    .commentIndex-item {
      position: relative;
      width: 100%;
      height: 5.5rem;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      .commentIndex-item-img {
        margin-top: 0.8rem;
        width: 2.3rem;
        height: 2.3rem;
        border-radius: 50%;
      }
      .commentIndex-item-right {
        flex: 1;
        margin-left: 1rem;
        .item-right-name {
          margin-top: 0.4rem;
          cursor: pointer;
          font-size: 16px;
          color: rgb(40, 184, 250);
        }
        .item-right-content {
          margin-top: 0.5rem;
          font-size: 17px;
          color: #515050;
        }
        .item-right-time {
          margin-top: 0.5rem;
          font-size: 12px;
          color: #858383;
        }
      }
      .comment-btn {
        position: absolute;
        right: 1.5%;
        bottom: 0;
        border: none;
      }
      .comment-btn:hover {
        background-color: transparent;
        color: #ee1010;
        font-weight: bold;
      }
    }
  }
}
</style>