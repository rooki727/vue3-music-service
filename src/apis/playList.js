import httpInstance from '@/utils/http'
// 获取用户创建的歌单
export function listCreateAPI() {
  return httpInstance({
    method: 'POST',
    url: '/api/c/playlist/listCreate'
  })
}
// 创建歌单
export function createPlaylistAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/playlist/add',
    data
  })
}
// 将歌曲添加到歌单
export function addToPlaylistAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/song/addToPlaylist',
    data
  })
}
// 获取热门歌单
export function getHotPlaylistAPI() {
  return httpInstance({
    method: 'POST',
    url: '/api/c/playlist/listHot'
  })
}
// 获取飙升榜
export function getRisePlaylistAPI() {
  return httpInstance({
    method: 'POST',
    url: '/api/c/playlist/up'
  })
}
// 获取新歌榜
export function getNewPlaylistAPI() {
  return httpInstance({
    method: 'POST',
    url: '/api/c/playlist/new'
  })
}
// 获取热歌榜
export function getHotSongListAPI() {
  return httpInstance({
    method: 'POST',
    url: '/api/c/playlist/hot'
  })
}
// 获取推荐榜
export function getRecommendPlaylistAPI() {
  return httpInstance({
    method: 'POST',
    url: '/api/c/playlist/recommend'
  })
}
// 获取某个歌单
export function getPlaylistDetailAPI(id) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/playlist/get',
    data: {
      id
    }
  })
}
// 移出歌单
export function removeSongFromPlaylistAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/playlist/removeSong',
    data
  })
}
// 用户收藏的歌单
export function listCollectAPI() {
  return httpInstance({
    method: 'POST',
    url: '/api/c/playlist/listCollect'
  })
}
// 收藏该歌单
export function collectPlaylistAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/playlist/collect',
    data
  })
}
// 取消收藏歌单
export function cancelCollectPlaylistAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/playlist/disCollect',
    data
  })
}
