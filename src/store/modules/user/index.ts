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
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    resetInfo() {
      this.$reset();
    },
  },
  persist: true,
});

export default useUserStore;
