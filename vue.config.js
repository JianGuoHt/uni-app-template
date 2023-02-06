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
};
