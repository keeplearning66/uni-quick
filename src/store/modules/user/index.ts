import type { UserState } from './types';
import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userId: '',
    userName: '',
    token: '',
  }),
  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },
  actions: {
    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    // 重置用户信息
    resetInfo() {
      this.$reset();
    },
  },
  persist: true,
});

export default useUserStore;
