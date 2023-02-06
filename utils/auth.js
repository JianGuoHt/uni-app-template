import { getUserInfo, userLoginOut } from "@/api/user.js"

/**
 * 获取用户信息
 * @param {Function} callback
 */
export function getUserInfos(callback = () => {}) {
  getUserInfo().then((res) => {
    callback(res.data)
    uni.setStorageSync("userinfo", res.data)
    uni.setStorageSync("roleGroup", res.roleGroup)
  })
}

/**
 * 退出登录
 * @returns
 */
export function logout() {
  return userLoginOut().then(() => {
    clearLoginInfo()
    uni.reLaunch({
      url: "/pages/login/login"
    })
  })
}

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
  uni.removeStorageSync("token")
  uni.removeStorageSync("userinfo")
}
