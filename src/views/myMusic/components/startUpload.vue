<template>
  <h2 class="edit-title">开始上传</h2>
  <div class="start-upload">
    <div class="form-left">
      <el-form :model="addform" :rules="rules" ref="addForm" style="margin-top: 3rem">
        <el-form-item label="歌名" label-width="8.75rem" prop="song_name">
          <el-input
            v-model="addform.song_name"
            autocomplete="off"
            style="width: 55%"
            placeholder="歌名"
          />
        </el-form-item>
        <el-form-item label="歌曲图片" label-width="8.75rem" prop="song_img">
          <!-- 增加修改图标 -->
          <div style="display: flex">
            <el-input
              v-model="addform.song_img"
              autocomplete="off"
              placeholder="输入图片链接或按钮上传"
              style="width: 60%; height: 2rem; margin-top: 0.5rem"
            />
            <img
              style="width: 80px; height: 80px; margin-left: 1rem"
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
              <el-button class="btn-upload">点击上传歌曲文件</el-button>
            </el-upload>

            <!-- 进度条 -->
            <el-progress
              class="progress-bar"
              :percentage="uploadPercentage"
              :stroke-width="16"
              :status="progressStatus"
              style="margin-top: 20px; width: 25rem"
              striped
              striped-flow
            ></el-progress>
          </div>
        </el-form-item>
        <el-form-item label="歌手" label-width="8.75rem" prop="singer">
          <el-input
            v-model="addform.singer"
            autocomplete="off"
            style="width: 55%"
            placeholder="歌手"
          />
        </el-form-item>
        <el-form-item label="专辑" label-width="8.75rem" prop="album">
          <el-input
            v-model="addform.album"
            autocomplete="off"
            style="width: 55%"
            placeholder="专辑"
          />
        </el-form-item>
      </el-form>

      <el-button type="success" @click="submitadd(addForm)" class="btn-upload-submit">
        上传
      </el-button>
    </div>
    <div class="info-box">
      <div class="info-title">
        <el-icon class="icon-info"><InfoFilled /></el-icon
        ><span style="margin-left: 0.5rem; color: grey">信息</span>
      </div>
      <img class="info-avatar" :src="musicLoginer.avatar" alt="" />
      <span class="info-content">昵&nbsp;&nbsp;&nbsp;称：{{ musicLoginer.name }}</span>
      <span class="info-content">账&nbsp;&nbsp;&nbsp;号:{{ musicLoginer.account }}</span>
      <span class="info-content">性&nbsp;&nbsp;&nbsp;别：{{ musicLoginer.gender }}</span>
      <span class="info-content">所在地：</span>
      <span class="info-content">个人签名：</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useMusicLoginerStore } from '@/stores/LoginerStore'
const loginerStore = useMusicLoginerStore()
const musicLoginer = computed(() => loginerStore.musicUserInfo)
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

      // api数据请求，添加该歌曲的信息
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
    ElMessage.error('只能上传图片')
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
  if (response.result) {
    progressStatus.value = 'success' // 上传成功，设置进度条状态为成功
    addform.value.song_file = response.result
  } else {
    progressStatus.value = 'exception' // 上传失败，设置进度条状态为异常
    ElMessage({
      message: '上传失败',
      type: 'error'
    })
  }
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
</script>

<style lang="scss" scoped>
.start-upload {
  display: flex;
  height: 65vh;
  .form-left {
    margin-top: 1rem;
    width: 75%;
    height: 90%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.258);
    border-radius: 10px;
  }
  .info-box {
    margin-left: 3rem;
    margin-top: 1rem;
    width: 20%;
    height: 60%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.258);
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    .info-title {
      margin-top: 0.8rem;
      color: #817f7f;
      display: flex;
      align-items: center;
      .icon-info {
        margin-left: 0.8rem;
        width: 2.1rem;
        height: 2.1rem;
        font-size: 1.2rem;
        background-color: rgb(255, 145, 0);
        border-radius: 50%;
        color: white;
      }
    }
    .info-avatar {
      margin: 0.6rem auto;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    .info-content {
      display: block;
      margin: 0.6rem 1rem;
      font-size: 15px;
      color: #505152;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.form-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .form-item {
    width: 80%;
    margin-top: 1rem;
  }
}
.edit-title {
  margin-top: 1rem;
  font-size: 1.5rem;
  color: #817f7f;
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
.btn-upload {
  border-radius: 15px;
  transition: all 0.3s;
}
.btn-upload:hover {
  background-color: #fff;
  color: #ff6d40;
  transform: scale(1.1);
}
.btn-upload-submit {
  margin-top: 1.5%;
  margin-left: 27%;
  width: 10rem;
  border-radius: 15px;
  transition: all 0.3s;
}
.btn-upload-submit:hover {
  transform: scale(1.1);
  color: #ffffff;
}
</style>