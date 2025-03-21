<template>
  <!-- 对话框确定栏 -->
  <el-dialog v-model="dialogVisible" title="提醒" width="350">
    <span>您确认退出要当前登录吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="info" @click="cancelExit">取消</el-button>
        <el-button type="danger" @click="confirmExit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
  <div class="layout-index-header">
    <div class="layout-index-header-left" @click="$router.replace('/')">
      <img class="layout-index-header-left-icon" src="../assets/music-icon.jpg" alt="" />
      <span class="layout-index-header-left-title">CJ-Music</span>
    </div>
    <div class="layout-index-header-mid">
      <div class="layout-index-header-mid-input">
        <el-icon style="font-size: 18px; font-weight: 600"><Search /></el-icon>
        <input
          type="text"
          placeholder="搜索音乐、歌手、歌单"
          v-model="searchValue"
          ref="searchInput"
        />
        <el-button :icon="Search" circle class="searchBtn" @click="handleSearch" />
        <div class="recommondSearchs" v-show="recommondSearchs.length > 0 && searchValue !== ''">
          <span class="recommondSearchs-title">推荐搜索</span>
          <span class="recommondSearchs-delete" @click="handleDeleteSearch"
            ><el-icon><Delete /></el-icon
          ></span>
          <p
            @click="handleChooseSearch(item)"
            class="recommondSearchs-content"
            v-for="(item, index) in recommondSearchs"
            :key="index"
          >
            {{ item }}
          </p>
        </div>
      </div>
    </div>
    <div class="layout-index-header-right">
      <div class="layout-index-header-right-isLogin" v-if="musicUserInfo.token">
        <el-dropdown>
          <!-- 增加头像和id -->
          <div class="avatarName">
            <img class="avatar" :src="musicUserInfo.avatar || '/avatar.jpg'" alt="" />
            <span class="name"> {{ musicUserInfo.name || musicUserInfo.account }} </span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.replace('/loginInfo')">个人信息</el-dropdown-item>

              <el-dropdown-item @click="showPopoverConfirm">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="layout-index-header-right-isLogin" v-else>
        <el-button @click="$router.push('/login')" class="layout-index-header-right-isLogin-btn"
          >登录</el-button
        >
        <el-button @click="$router.push('/register')" class="layout-index-header-right-isLogin-btn"
          >注册</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { useMusicLoginerStore } from '@/stores/LoginerStore'
import { computed, onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { logoutAPI } from '@/apis/user'
import { ElMessage, ElMessageBox } from 'element-plus'
const searchValue = ref('')
const musicLoginerStore = useMusicLoginerStore()
const musicUserInfo = computed(() => musicLoginerStore.musicUserInfo)
const recommondSearchs = ref([])
// 处理搜索选择
const handleChooseSearch = (item) => {
  searchValue.value = item
}
// 处理搜索
const handleSearch = () => {
  if (searchValue.value) {
    // 确保 recommondSearchs.value 是数组
    if (!Array.isArray(recommondSearchs.value)) {
      recommondSearchs.value = []
    }

    // 检查是否已存在相同的值
    const index = recommondSearchs.value.indexOf(searchValue.value)
    if (index !== -1) {
      // 如果已存在，将其从原位置移除
      recommondSearchs.value.splice(index, 1)
    }

    // 将搜索项插入到数组的最前面
    recommondSearchs.value.unshift(searchValue.value)

    // 限制推荐搜索项的数量（例如最多保留 10 条）
    if (recommondSearchs.value.length > 10) {
      recommondSearchs.value = recommondSearchs.value.slice(0, 10)
    }

    // 将数组转换为 JSON 字符串并存储到 localStorage 中
    localStorage.setItem('recommondSearchs', JSON.stringify(recommondSearchs.value))

    // 跳转到搜索页面
    router.push({
      path: '/search',
      query: {
        keywords: searchValue.value
      }
    })
    searchValue.value = ''
  }
}
// 清空搜索记录
const handleDeleteSearch = async () => {
  ElMessageBox.confirm('确定要清空搜索记录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    recommondSearchs.value = []
    localStorage.removeItem('recommondSearchs')
    ElMessage({
      type: 'success',
      message: '清空成功!'
    })
  })
}
// 对话框逻辑处理
const dialogVisible = ref(false)
const showPopoverConfirm = () => {
  dialogVisible.value = true
}
const cancelExit = () => {
  dialogVisible.value = false
  // 取消退出操作
}
const confirmExit = async () => {
  // 执行退出登录操作，例如清除登录信息等
  dialogVisible.value = false
  router.push('/login')
  // 确认退出操作
  await logoutAPI()
  musicLoginerStore.clearUser()
}
onMounted(() => {
  recommondSearchs.value = JSON.parse(localStorage.getItem('recommondSearchs')) || []
})
</script>

<style lang="scss" scoped>
.layout-index-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 666;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  .layout-index-header-left {
    margin-left: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .layout-index-header-left-icon {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    .layout-index-header-left-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-left: 0.5rem;
      display: inline-block;
      color: rgba(238, 71, 71, 0.679);
    }
  }
  .layout-index-header-mid {
    flex: 1;
    margin-left: 7rem;
    height: 100%;
    margin-top: 8px;
    .layout-index-header-mid-input {
      position: relative;
      background-color: #f0ecec;
      height: 42px;
      width: 38rem;
      display: flex;
      align-items: center;
      border-radius: 10px;
      padding-left: 1rem;
      // 推荐搜索列表
      .recommondSearchs {
        position: absolute;
        width: 100%;
        height: 300px;
        bottom: 0;
        left: 0;
        background-color: #faf8f8e8;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.294);
        z-index: 666;
        border-radius: 15px;
        overflow: auto;
        transform: translateY(102%);
        opacity: 1;
        transition: all 0.4s ease-in-out;

        .recommondSearchs-title {
          display: block;
          margin-top: 1rem;
          margin-left: 1rem;
          // 箭头
          cursor: default;
          font-size: 19px;
          color: #7b7575;
        }
        .recommondSearchs-delete {
          position: absolute;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          right: 1rem;
          top: 1rem;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          &:hover {
            transform: scale(1.1);
          }
        }
        .recommondSearchs-content {
          height: 3rem;
          line-height: 3rem;
          padding-left: 1.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          border-bottom: 1px solid #e0dddd;
        }
        .recommondSearchs-content:hover {
          background-color: white;
          color: #000;
          font-weight: bold;
        }
      }
      input {
        margin-left: 1rem;
        height: 45px;
        width: 35rem;
        border: none;
        background-color: transparent;
      }
      .searchBtn {
        background-color: transparent;
        border: none;
        font-size: 20px;
        margin-right: 0.6rem;
        transition: all 0.3s ease-in-out;
      }
      .searchBtn:hover {
        scale: (1.1);
        color: #2e2d2d;
        font-weight: bold;
      }
      /* 当 input 获得焦点时，不显示边框 */
      input:focus {
        outline: none; /* 移除默认的聚焦边框 */
      }
      // input:focus ~ .recommondSearchs {
      //   transform: translateY(103%);
      //   opacity: 1;
      // }
    }
  }
  .layout-index-header-right {
    margin-right: 3rem;
    display: flex;
    align-items: center;
    .layout-index-header-right-isLogin {
      display: flex;
      align-items: center;
      justify-content: center;
      // 已登录部分信息
      .avatarName {
        max-width: 6.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 1re;
        padding: 0 10px;
        .avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          margin-right: 0.5rem;
        }
        .name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .avatarName:hover {
          background-color: #f3ecec;
        }
        // 已登录按钮部分
        .layout-index-header-right-isLogin-btn {
          font-size: 1rem;
          border: none;
        }
        button:hover {
          background-color: #f3ecec;
          color: rgb(78, 76, 76);
        }
      }
      // 未登录按钮部分
      .layout-index-header-right-isLogin-btn {
        font-size: 1rem;
        border: none;
      }
      button:hover {
        background-color: #f3ecec;
        color: rgb(78, 76, 76);
      }
    }
    .layout-index-header-right-isLogin:hover {
      border: none;
    }
  }
}
</style>