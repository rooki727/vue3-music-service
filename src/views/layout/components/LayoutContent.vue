<template>
  <div class="layout-content">
    <router-view></router-view>
    <MusicItem></MusicItem>
  </div>
</template>

<script setup>
import MusicItem from '@/components/Music-Item.vue'
</script>

<style lang="scss" scoped>
.layout-content {
  flex: 1;
}
</style>