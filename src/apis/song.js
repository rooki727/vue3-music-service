import httpInstance from '@/utils/http'
// 获取用户上传的歌曲
export function getListUploadedAPI() {
  return httpInstance({
    method: 'POST',
    url: '/api/c/song/listUploaded'
  })
}
// 上传歌曲
export function uploadSongAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/song/add',
    data
  })
}
// 更新歌曲
export function updateSongAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/song/update',
    data
  })
}
// 喜爱歌曲
export function likeSongAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/song/like',
    data
  })
}
// 取消喜爱歌曲
export function dislikeSongAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/song/disLike',
    data
  })
}
// 删除歌曲
export function deleteSongAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/song/delete',
    data
  })
}
// 歌曲评论列表
export function getSongCommentAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/song/listComment',
    data
  })
}
// 对歌曲进行评论
export function addSongCommentAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/song/comment',
    data
  })
}
// 对歌曲进行删除
export function deleteSongCommentAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/song/removeComment',
    data
  })
}

// 获取最近播放歌曲
export function getRecentlyPlayedAPI() {
  return httpInstance({
    method: 'POST',
    url: '/api/c/song/listPlayed'
  })
}
// 最近播放删除歌曲记录
export function deleteRecentlyPlayedAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/song/removePlayed',
    data
  })
}
// 播放结束

export function playedSongAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/song/playOver',
    data
  })
}
// 搜索歌曲
export function searchSongAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/song/search',
    data
  })
}
