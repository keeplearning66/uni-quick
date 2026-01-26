import type { LoadingOptions, ModalOptions, showLoadingOptions, ToastOptions } from './types';
import { t } from '@/locale';

export function showToast(content: string, options: ToastOptions = {}) {
  uni.showToast({
    title: content,
    icon: 'none',
    mask: true,
    duration: 1500,
    ...options,
  });
};

export function getLoadingHandler(): LoadingOptions {
  return {
    show: (content = t('message.loaidng'), options: showLoadingOptions = {}) => {
      uni.showLoading({
        title: content,
        mask: true,
        ...options,
      });
    },
    hide: () => {
      uni.hideLoading();
    },
  };
};

export function showModal(content: string, options: ModalOptions = {}) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: t('message.modalTitle'),
      content,
      confirmColor: '#1677FF',
      success(res) {
        if (res.confirm) {
          resolve(res);
        }
        else {
          reject(new Error(t('message.cancel')));
        }
      },
      fail() {
        reject(new Error(t('message.callFailed')));
      },
      ...options,
    });
  });
};
