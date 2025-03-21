<template>
  <el-dialog
    :model-value="createPlaylistsVisible"
    width="480"
    style="border-radius: 15px"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <el-icon class="close-icon" @click="closeDialog" style="font-size: 25px"><Close /></el-icon>
    <h2 class="collect-title">创建歌单</h2>
    <div class="create-playlists">
      <el-input
        class="create-input"
        v-model="inputTitle"
        style="width: 400px"
        type="textarea"
        :rows="4"
        resize="none"
        maxlength="40"
        show-word-limit
        placeholder="输入歌单标题"
      />
      <el-button class="create-btn" @click="createPlaylists">创建</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import { createPlaylistAPI } from '@/apis/playList'
import { useplaylistStore } from '@/stores/playlistStore'
const playlistStore = useplaylistStore()
const props = defineProps(['createPlaylistsVisible'])
const createPlaylistsVisible = computed(() => props.createPlaylistsVisible)
const inputTitle = ref('')
const emit = defineEmits(['changeCreatePlaylistsVisible'])
const closeDialog = () => {
  emit('changeCreatePlaylistsVisible', false)
}
const createPlaylists = async () => {
  if (inputTitle.value.length === 0) {
    ElMessage.error('歌单标题不能为空')
    return
  } else {
    await createPlaylistAPI({ data: inputTitle.value }).then(() => {
      ElMessage.success('创建歌单成功')
      playlistStore.getPlaylists()
      closeDialog()
      inputTitle.value = ''
    })
  }
}
</script>

<style lang="scss" scoped>
.close-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
.collect-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 2.3rem;
}
.create-playlists {
  width: 100%;
  height: 200px;
  .create-input {
    margin-left: 22px;
  }
  .create-btn {
    margin-top: 20px;
    width: 80px;
    height: 36px;
    border-radius: 20px;
    background-color: #ec4141f4;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    margin-top: 2rem;
    margin-left: 180px;
  }
  .create-btn:hover {
    background-color: #f70505;
  }
}
</style>