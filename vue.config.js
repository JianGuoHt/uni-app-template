// const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

module.exports = {
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.vue$/,
      use: [
        {
          loader: path.resolve(__dirname, './node_modules/vue-inset-loader'), // 解决ivew组件 忽略前缀i的问题
          options: {
            pagesPath: path.resolve(__dirname, './pages.json'),
          },
        },
      ],
    });
  },

  chainWebpack: (config) => {
    // 发行或运行时启用了压缩时会生效
    config.optimization.minimizer('terser').tap((args) => {
      const compress = args[0].terserOptions.compress;
      // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
      compress.drop_console = true;
      compress.pure_funcs = [
        '__f__', // App 平台 vue 移除日志代码
        // 'console.debug' // 可移除指定的 console 方法
      ];
      return args;
    });

    // 加载 .env 文件（环境变量）
    config.plugin('define').tap((args) => {
      const config = getEnvsByDot();
      Object.keys(config).forEach((key) => {
        if (typeof config[key] === 'string') {
          config[key] = '"' + config[key] + '"';
        }
        args[0]['process.env'][key] = config[key];
      });
      return args;
    });
  },
};

/**
 * 从.env中获取
 */
function getEnvsByDot() {
  const prefixRE = /^VUE_APP_/;
  let dotEnvs = {};

  //加载通用环境变量
  const envPathBase = __dirname + '/.env';
  const dotEnvsConfigBase = dotenv.config({ path: envPathBase });

  //加载专属环境变量
  const env = process.env.NODE_ENV;
  const envPath = __dirname + '/.env.' + env;
  const dotEnvsConfig = dotenv.config({ path: envPath });

  // 合并环境变量
  // 专属环境变量 权重更高，如果出现相同的变量，采用专属环境变量
  const dotEnvsData = Object.assign(dotEnvsConfigBase.parsed || {}, dotEnvsConfig.parsed || {});
  Object.keys(dotEnvsData).forEach((key) => {
    if (prefixRE.test(key)) {
      dotEnvs[key] = dotEnvsData[key];
    }
  });

  return dotEnvs;
}
