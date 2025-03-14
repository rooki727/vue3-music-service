<template>
  <div class="layout-nav">
    <el-menu>
      <router-link to="/" class="router-link-item">
        <el-menu-item :class="{ 'is-active': $route.path === '/' }" class="nav-item">
          <el-icon><Search /></el-icon>
          <template #title>
            <span>发现音乐</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/isplayinglist" class="router-link-item">
        <el-menu-item :class="{ 'is-active': $route.path === '/isplayinglist' }" class="nav-item">
          <el-icon><Loading /></el-icon>
          <template #title>
            <span>正在播放</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/recentlyplayed" class="router-link-item">
        <el-menu-item :class="{ 'is-active': $route.path === '/recentlyplayed' }" class="nav-item">
          <el-icon><Calendar /></el-icon>
          <template #title>
            <span>最近播放</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/playlists" class="router-link-item">
        <el-menu-item :class="{ 'is-active': $route.path === '/playlists' }" class="nav-item">
          <el-icon><Service /></el-icon>
          <template #title>
            <span>我的歌单</span>
          </template>
        </el-menu-item>
      </router-link>
      <router-link to="/myMusic" class="router-link-item">
        <el-menu-item :class="{ 'is-active': $route.path === '/myMusic' }" class="nav-item">
          <el-icon><Share /></el-icon>
          <template #title>
            <span>我的音乐-上传</span>
          </template>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.layout-nav {
  width: 13%;
  height: 92vh;

  position: fixed;
  top: 60px;
  left: 0;
  z-index: 666;
  .router-link-item {
    text-decoration: none;
  }
  .el-menu {
    padding-top: 2rem;
    height: 100%;
    background-color: #ebfafa33;
    border-right: 1px solid #e6e6e6;
    color: rgb(112, 110, 110) !important;
  }

  .nav-item {
    text-decoration: none;
    color: #7c7979;
    height: 2.6rem;
    font-size: 1rem;
    font-family: serif;
    font-weight: 600;
  }
  .nav-item:hover {
    background-color: rgba(240, 145, 145, 0.679);
    color: rgb(247, 242, 242);
  }
  .is-active {
    background-color: rgba(230, 74, 74, 0.679);
    color: rgb(251, 251, 251);
  }
}
</style>