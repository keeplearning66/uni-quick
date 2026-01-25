import type { App } from 'vue';
import setupI18n from '@/locale';
import setupStore from '@/store';
import setupPermission from './permission';

export default {
  install(app: App) {
    setupStore(app);
    setupI18n(app);
    setupPermission();
  },
};
