<template>
  <div class="isplayingList">
    <h2 class="isplaying-title">正在播放</h2>
    <SongList></SongList>
  </div>
</template>

<script setup>
import SongList from '@/components/Song-List.vue'
</script>

<style lang="scss" scoped>
.isplayingList {
  height: 87vh;
  width: 84.2vw;
  background-color: #ffffff;
  padding: 1.5rem;
  .isplaying-title {
    font-size: 1.5rem;
    color: #817f7f;
  }
}
</style>