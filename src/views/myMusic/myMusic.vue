<template>
  <div class="myMusic">
    <div class="myMusic-menu">
      <el-menu
        :default-active="activedIndex"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
        text-color="gray"
        active-text-color="orange"
      >
        <el-menu-item index="1">开始上传</el-menu-item>
        <el-menu-item index="2">我上传的</el-menu-item>
      </el-menu>
    </div>
    <div class="myMusic-content">
      <startUpload v-if="activedIndex === '1'"></startUpload>
      <myUpload v-else-if="activedIndex === '2'"></myUpload>
    </div>
  </div>
</template>

<script setup>
import myUpload from './components/myUpload.vue'
import startUpload from './components/startUpload.vue'
import { ref } from 'vue'

const activedIndex = ref('2')

const handleSelect = (index) => {
  activedIndex.value = index
}
</script>

<style lang="scss" scoped>
.myMusic {
  padding: 1.5rem;
  background-color: #fff;
  height: 87vh;
  width: 84.2vw;
  .myMusic-menu {
    margin: 0 2.5rem;
  }
  .myMusic-content {
    margin: 0 2.5rem;
  }
}
</style>