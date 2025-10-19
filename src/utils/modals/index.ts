import type { LoadingOptions, ModalOptions, ToastOptions } from './types';
import { t } from '../common';

/**
 * Toast
 * @param {string} content 提示内容
 * @param {object} options 配置
 */
export const showToast = (content: string, options: ToastOptions = {}) => {
  uni.showToast({
    title: content,
    icon: 'none',
    mask: true,
    duration: 1500,
    ...options,
  });
};

/**
 * Loading
 */
export const getLoadingHandler = (): LoadingOptions => ({
  show: (content = t('message.loaidng')) => {
    uni.showLoading({
      title: content,
      mask: true,
    });
  },
  hide: () => {
    uni.hideLoading();
  },
});

/**
 * Dialog
 * @param {string} content 提示内容
 * @param {object} options 配置
 */
export const showModal = (content: string, options: ModalOptions = {}) => {
  options.showCancel = false;
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: t('message.modalTitle'),
      content,
      showCancel: false,
      confirmColor: '#1677FF',
      success(res) {
        if (res.confirm)
          resolve(res);
      },
      fail() {
        reject(new Error(t('message.callFailed')));
      },
      ...options,
    });
  });
};
