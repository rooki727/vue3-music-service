import httpInstance from '@/utils/http'
// 获取验证码
export function getVerifyCodeAPI() {
  return httpInstance({
    method: 'POST',
    url: '/api/file/captcha'
  })
}

// 注册
export function registerAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/user/register',
    data
  })
}

// 登录
export function loginAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/user/login',
    data
  })
}
// 登出
export function logoutAPI() {
  return httpInstance({
    method: 'POST',
    url: '/api/c/user/logout'
  })
}
// 更新基础信息
export function updateBaseInfoAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/user/updateBaseInfo',
    data
  })
}
// 更新头像
export function updateAvatarAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/user/updateAvatar',
    data
  })
}
// 更新密码
export function updatePasswordAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/c/user/updatePassword',
    data
  })
}
