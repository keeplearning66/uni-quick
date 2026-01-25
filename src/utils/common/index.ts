import { t } from '@/locale';
import { showModal } from '../modals';

// 小程序更新检测
export function mpUpdate() {
  const updateManager = uni.getUpdateManager();

  updateManager.onCheckForUpdate(() => {
    // 请求完新版本信息的回调
  });

  updateManager.onUpdateReady(async () => {
    await showModal(t('message.updateContent'), {
      title: t('message.updateTitle'),
    });
    updateManager.applyUpdate();
  });

  updateManager.onUpdateFailed(() => {
    // 新的版本下载失败
    showModal(t('message.updateFailedContent'), {
      title: t('message.updateFailedTitle'),
      showCancel: false,
    });
  });
};
