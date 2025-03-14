<template>
  <div class="recommentlist-item" @click="clickToDetail(recommend.recommendList_id)">
    <img class="item-img" :src="recommend.img" alt="" />
    <span class="item-title">{{ recommend.title }}</span>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'

defineProps({
  recommend: {
    type: Object
  }
})
const clickToDetail = (recommendList_id) => {
  router.push(`/playlistsdetail?recommendList_id=${recommendList_id}`)
}
</script>

<style scoped lang="scss">
.recommentlist-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 180px;
  margin: 1rem 1.8rem;
  cursor: pointer;
  .item-img {
    width: 145px;
    height: 145px;
    border-radius: 10px;
  }
  .item-title {
    margin-top: 10px;
    font-size: 14px;
    color: #898585;
  }
}
.recommentlist-item:hover .item-title {
  color: #616060;
  font-weight: bold;
}
</style>