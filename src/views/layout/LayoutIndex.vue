<template>
  <!--头部  -->
  <NavHeader></NavHeader>
  <!-- 导航和内容出口 -->
  <div class="layout-index-mid">
    <LayoutNav></LayoutNav>
    <LayoutContent></LayoutContent>
  </div>
</template>

<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutContent from './components/LayoutContent.vue'
import NavHeader from '@/components/NavHeader.vue'
</script>

<style lang="scss" scoped>
.layout-index-mid {
  display: flex;
}
</style>