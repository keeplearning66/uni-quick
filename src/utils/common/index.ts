import { i18n } from '@/locale';

export const t = i18n.global.t;

// 小程序更新检测
export const mpUpdate = () => {
  const updateManager = uni.getUpdateManager();
  updateManager.onCheckForUpdate(() => {
    // 请求完新版本信息的回调
  });
  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: t('message.updateTitle'),
      content: t('message.updateContent'),
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });
  updateManager.onUpdateFailed(() => {
    // 新的版本下载失败
    uni.showModal({
      title: t('message.updateFailedTitle'),
      content: t('message.updateFailedContent'),
      showCancel: false,
    });
  });
};
