<template>
  <el-dialog
    :model-value="editSongVisible"
    width="600"
    style="border-radius: 15px; height: 460px"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <el-icon class="close-icon" @click="closeDialog" style="font-size: 25px"><Close /></el-icon>
    <span class="edit-title">修改歌曲</span>
    <el-form :model="addform" :rules="rules" ref="addForm" style="margin-top: 1.2rem">
      <el-form-item label="歌名" label-width="8.75rem" prop="song_name">
        <el-input
          v-model="addform.song_name"
          autocomplete="off"
          style="width: 70%"
          placeholder="歌名"
        />
      </el-form-item>
      <el-form-item label="歌曲图片" label-width="8.75rem" prop="song_img">
        <!-- 增加修改图标 -->
        <div style="display: flex">
          <el-input
            v-model="addform.song_img"
            autocomplete="off"
            placeholder="输图片链接或按钮上传"
            style="width: 60%; height: 2rem; margin-top: 0.5rem"
          />
          <img
            style="width: 80px; height: 80px; margin-left: 10px"
            v-if="addform.song_img"
            :src="addform.song_img"
            alt=""
          />
          <el-upload
            class="avatar-uploader"
            action="http://119.29.168.176:8080/library_ssm/file/uploadPicture"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeUpload"
            name="image"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="歌曲文件" label-width="8.75rem" prop="song_file">
        <div>
          <!-- 上传组件 -->
          <el-upload
            class="upload-demo"
            action="http://119.29.168.176:8080/library_ssm/file/uploadPicture"
            :on-progress="handleProgress"
            :before-upload="beforeUploadAudio"
            :on-success="handleSuccess"
            :on-error="handleError"
            :show-file-list="false"
            name="song"
          >
            <span class="el-upload__text" v-if="addform.song_file">{{ addform.song_file }}</span>
            <el-button>点击上传歌曲文件</el-button>
          </el-upload>

          <!-- 进度条 -->
          <el-progress
            :percentage="uploadPercentage"
            :stroke-width="16"
            :status="progressStatus"
            style="margin-top: 20px; width: 18rem"
            striped
            striped-flow
          ></el-progress>
        </div>
      </el-form-item>
      <el-form-item label="歌手" label-width="8.75rem" prop="singer">
        <el-input
          v-model="addform.singer"
          autocomplete="off"
          style="width: 70%"
          placeholder="歌手"
        />
      </el-form-item>
      <el-form-item label="专辑" label-width="8.75rem" prop="album">
        <el-input
          v-model="addform.album"
          autocomplete="off"
          style="width: 70%"
          placeholder="专辑"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog" style="width: 5.25rem; border-radius: 10px">取消</el-button>
        <el-button
          type="success"
          @click="submitadd(addForm)"
          style="width: 5.25rem; border-radius: 10px"
        >
          更新
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
const props = defineProps(['editSongVisible', 'clickRow'])
const editSongVisible = computed(() => props.editSongVisible)
const clickRow = computed(() => props.clickRow)
const emit = defineEmits(['closeEditSongDialog', 'updateClickRow'])
const closeDialog = () => {
  emit('updateClickRow', {}) // 发送事件给父组件，请求修改props.clickRow的值为null
  emit('closeEditSongDialog', false)
}

const addForm = ref(null)
const addform = reactive({
  song_id: null,
  song_img: '',
  song_file: '',
  song_name: '',
  singer: '',
  album: ''
})
const rules = {
  song_name: [
    {
      required: true,
      message: '请输入歌曲名字',
      trigger: 'blur'
    }
  ],
  album: [
    {
      required: true,
      message: '请输入专辑名字',
      trigger: 'blur'
    }
  ],

  singer: [
    {
      required: true,
      message: '请输入歌手名字',
      trigger: 'blur'
    }
  ]
}

const submitadd = (addForm) => {
  addForm.validate((valid) => {
    if (valid) {
      console.log(addform)

      // api数据请求，添加该用户的信息
      emit('closeEditSongDialog', false)
      //  updateSinger(
      //     )
      //     .then(() => {
      //       // 如果 addUser 没有报错，则执行成功提示
      //       ElMessage({ type: 'success', message: '修改成功' })
      //     })
      //     .catch(() => {
      //       // 处理请求失败的情况
      //       ElMessage({ type: 'erro', message: '修改失败！请检查输入信息' })
      //       // 在此处可以添加相应的错误处理逻辑，例如提示用户登录失败等
      //     })
    } else {
      // 如果表单验证不通过，提醒
      ElMessage({ type: 'error', message: '修改失败！请检查输入信息' })
    }
  })
}
// 上传图片
const handleAvatarSuccess = (response) => {
  addform.song_img = response.result
}
// 上传图片前的校验
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    this.$message.error('只能上传图片')
  }
  return isImage // 确保文件是图片
}

// 上传mp3文件
const uploadPercentage = ref(0) // 用于存储上传进度
const progressStatus = ref('') // 进度条状态，'active', 'success', 'exception'

// 上传进度事件
const handleProgress = (event) => {
  console.log('上传进度', event)

  uploadPercentage.value = event.percent // 获取上传进度
  progressStatus.value = 'warning' // 设置进度条状态为正在上传
}

// 文件上传前的钩子
const beforeUploadAudio = (file) => {
  console.log(file)

  const isAudio = file.type.startsWith('audio/')
  if (!isAudio) {
    ElMessage({
      message: '只能上传audio文件',
      type: 'error'
    })
  }
  return isAudio
}

// 上传成功
const handleSuccess = (response, file, fileList) => {
  console.log('上传成功', response, file, fileList)
  progressStatus.value = 'success' // 上传成功，设置进度条状态为成功
  addform.value.song_file = response.result
}

// 上传失败
const handleError = (err, file, fileList) => {
  console.log('上传失败', err, file, fileList)
  progressStatus.value = 'exception' // 上传失败，设置进度条状态为异常
  ElMessage({
    message: '上传失败',
    type: 'error'
  })
}

// watch
watch(
  () => clickRow.value,
  (oldVal) => {
    Object.assign(addform, oldVal)
  }
)
</script>

<style lang="scss" scoped>
.close-icon {
  position: absolute;
  top: 13px;
  right: 13px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.close-icon:hover {
  color: #000;
  font-weight: bold;
  transform: scale(1.1);
}
.edit-title {
  position: absolute;
  top: 12px;
  left: 15px;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 1rem;
}
.avatar-uploader {
  width: 80px;
  height: 80px;
  margin-left: 10px;
  border: 1px solid gainsboro;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
}

.avatar-uploader .el-icon {
  font-size: 50px;
  color: #8c939d;
}

.avatar-uploader .el-icon:hover {
  color: #ff6d40;
}
.el-upload__text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 80px;
  height: 16px;
  line-height: 16px;
  margin-right: 1rem;
}
</style>