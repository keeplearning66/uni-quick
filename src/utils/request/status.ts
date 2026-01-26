import { t } from '@/locale';

/**
 * 根据状态码，生成对应的错误信息
 * @param {number|string} status 状态码
 * @returns {string} 错误信息
 */
export function showMessage(status: number | string): string {
  let message = '';
  switch (status) {
    case 401:
      message = t('message.response401');
      break;
    case 403:
      message = t('message.response403');
      break;
    case 404:
      message = t('message.response404');
      break;
    case 500:
      message = t('message.response500');
      break;
    default:
      message = t('message.requestFailed');
  }
  return message;
};
