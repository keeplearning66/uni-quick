import type { AppState, SystemInfo } from './types';
import { defineStore } from 'pinia';

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    systemInfo: {} as SystemInfo,
  }),
  getters: {
    getSystemInfo(): SystemInfo {
      return this.systemInfo;
    },
  },
  actions: {
    initSystemInfo() {
      // #ifdef MP-WEIXIN
      this.systemInfo = uni.getWindowInfo();
      // #endif

      // #ifndef MP-WEIXIN
      this.systemInfo = uni.getSystemInfoSync();
      // #endif
    },
    setSystemInfo(info: UniApp.GetSystemInfoResult) {
      this.systemInfo = info;
    },
  },
});

export default useAppStore;
