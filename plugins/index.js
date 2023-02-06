// z-paging配置
import { setupZPaging } from './z-paging';
// uview
import { setupUView } from './uview';

export function setupPlugins(Vue) {
  // 挂载uView
  setupUView(Vue);
  // 挂载z-paging
  setupZPaging(Vue);
}
