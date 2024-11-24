<template>
  <!-- 对话框确定栏 -->
  <el-dialog v-model="dialogVisible" title="提醒" width="350">
    <span>您确认退出要当前登录吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelExit">取消</el-button>
        <el-button type="primary" @click="confirmExit"> 确认 </el-button>
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
        <input type="text" placeholder="搜索音乐、歌手、歌单" />
      </div>
    </div>
    <div class="layout-index-header-right">
      <div class="layout-index-header-right-isLogin" v-if="musicUserInfo.token">
        <el-dropdown>
          <!-- 增加头像和id -->
          <div class="avatarName">
            <img class="avatar" :src="musicUserInfo.avatar || '/avatar.jpg'" alt="" />
            <span> CJ </span>
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
import { computed, ref } from 'vue'

const musicLoginerStore = useMusicLoginerStore()
const musicUserInfo = computed(() => musicLoginerStore.musicUserInfo)

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
  // 确认退出操作
  const id = computed(() => musicUserInfo.value.id)
  console.log(id.value)
  // await resetAdminTokenAPI(id.value)
  musicLoginerStore.clearUser()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.layout-index-header {
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
      background-color: #f0ecec;
      height: 42px;
      width: 38rem;
      display: flex;
      align-items: center;
      border-radius: 10px;
      padding-left: 1rem;
      input {
        margin-left: 1rem;
        height: 45px;
        width: 35rem;
        border: none;
        background-color: transparent;
      }
      /* 当 input 获得焦点时，不显示边框 */
      input:focus {
        outline: none; /* 移除默认的聚焦边框 */
        border: none; /* 移除输入框的边框 */
      }
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