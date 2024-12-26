<template>
  <div class="isplayingList"><SongList></SongList></div>
</template>

<script setup>
import SongList from '@/components/Song-List.vue'
</script>

<style lang="scss" scoped>
.isplayingList {
  width: 82.1vw;
  height: 83vh;
  background-color: #ffffff;
  padding: 2.5rem;
}
</style>