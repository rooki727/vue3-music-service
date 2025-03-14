<template>
  <div class="loginInfo-container">
    <div class="loginInfo">
      <!-- 左 -->
      <div class="loginInfo-left">
        <img class="loginInfo-left-avatar" :src="musicUserInfo.avatar || '/avatar.jpg'" alt="" />
        <span class="loginInfo-left-name">{{ musicUserInfo.name || '未设置昵称' }}</span>
        <span class="loginInfo-left-account">账号：{{ musicUserInfo.account }}</span>
      </div>
      <!-- 右 -->
      <div class="loginInfo-right">
        <div class="loginInfo-right-top">
          <el-menu
            :default-active="activedIndex"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
          >
            <el-menu-item index="1">修改头像</el-menu-item>
            <el-menu-item index="2">编辑资料</el-menu-item>
            <el-menu-item index="3">修改密码</el-menu-item>
          </el-menu>
        </div>
        <div class="loginInfo-right-content">
          <ChangeAvatar v-if="activedIndex === '1'"></ChangeAvatar>
          <ChangeInfo v-else-if="activedIndex === '2'"></ChangeInfo>
          <ChangePassword v-else-if="activedIndex === '3'"></ChangePassword>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import ChangeAvatar from './components/ChangeAvatar.vue'
import ChangeInfo from './components/ChangeInfo.vue'
import ChangePassword from './components/ChangePassword.vue'
import { useMusicLoginerStore } from '@/stores/LoginerStore'
const loginerStore = useMusicLoginerStore()
const musicUserInfo = computed(() => loginerStore.musicUserInfo)
const activedIndex = ref('2')

const handleSelect = (index) => {
  activedIndex.value = index
}
</script>

<style lang="scss" scoped>
.loginInfo-container {
  padding: 1.5rem;
  background-color: #fff;
  height: 87vh;
  width: 84.2vw;
}
.loginInfo {
  margin: 0 auto;
  margin-top: 2rem;
  width: 72%;
  height: 85%;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  box-shadow: 0 0 15px #9d9d9d;
  // 左部
  .loginInfo-left {
    border-radius: 10px 0 0 10px;
    width: 25%;
    height: 100%;
    background-color: #cee7f7;
    display: flex;
    flex-direction: column;
    align-items: center;

    .loginInfo-left-avatar {
      width: 70%;
      height: 28%;
      border-radius: 50%;
      margin-top: 20%;
    }
    .loginInfo-left-name {
      margin-top: 8%;
      font-size: 15px;
      color: #161616;
    }
    .loginInfo-left-account {
      margin-top: 4%;
      font-size: 12px;
      color: #2e2d2d;
    }
  }
  // 右部
  .loginInfo-right {
    flex: 1;
    height: 100%;
    .loginInfo-right-top {
      height: 10%;
      border-bottom: 1px solid #ccc;
      .el-menu {
        margin-left: 10%;
      }
    }
    .loginInfo-right-content {
      height: 90%;
      width: 100%;
    }
  }
}
</style>