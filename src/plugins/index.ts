import type { App } from 'vue';
import setupI18n from '@/locale';
import setupStore from '@/store';
import setupPermission from './permission';

export default {
  install(app: App) {
    // 状态管理
    setupStore(app);
    // 国际化
    setupI18n(app);
    // 路由拦截
    setupPermission();
  },
};
