import Vue from 'vue';
import App from './App';

import { setupPlugins } from './plugins';

import './interceptor';

function bootstrap() {
  const app = new Vue({
    ...App,
  });

  // 挂载插件
  setupPlugins(Vue);

  app.$mount();
}

bootstrap();
Vue.config.productionTip = false;
App.mpType = 'app';
