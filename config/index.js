// 生产环境相关配置
const production = {
  BASE_URL: '',
};

// 测试环境相关配置
const staging = {
  BASE_URL: '',
};

// 开发环境相关配置
const develop = {
  BASE_URL: 'https://www.example.com',
  // BASE_URL: "http://localhost"
};

// #ifdef MP-WEIXIN
export function getConfig() {
  const envVersion = uni.getAccountInfoSync();
  let config = {};

  switch (envVersion.miniProgram.envVersion) {
    // 开发版
    case 'develop':
      config = develop;
      break;
    // 体验版
    case 'trial':
      config = staging;
      break;
    // 	正式版
    case 'release':
      config = production;
      break;
    // 默认正式版
    default:
      config = production;
      break;
  }

  return config;
}
// #endif
