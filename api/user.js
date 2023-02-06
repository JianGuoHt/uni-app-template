import request from '@/utils/request';

// 获取个人信息,在个人中心展示
export function getUserInfo(params) {
  return request.get('/system/user/profile', params);
}

// 用户登出
export function userLoginOut(params) {
  return request.get('/applet/userLoginOut', params);
}
