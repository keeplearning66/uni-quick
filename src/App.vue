<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app';
import { useAppStore } from '@/store';
import { mpUpdate } from '@/utils/index';

const appStore = useAppStore();

onLaunch(() => {
  // 初始化系统信息
  appStore.initSystemInfo();

  // #ifdef MP-WEIXIN
  mpUpdate();
  // #endif
});
</script>

<style lang="scss">
@use '@/static/styles/common.scss';
</style>
