import type { uniappRequestAdapter } from '@alova/adapter-uniapp';
import type VueHook from 'alova/vue';
import type { Response } from './types';

import AdapterUniapp from '@alova/adapter-uniapp';
import { createAlova } from 'alova';
import { createServerTokenAuthentication } from 'alova/client';
import { getTokenByStorage } from '../auth';
import { t } from '../common';
import { HEADER_TOKEN_KEY, HEADER_TOKEN_PREFIX, LOGIN_PATH, RESULT_ENUM, ROUTE_CHANGE_DELAY, TIMEOUT } from '../const';
import { getLoadingHandler, showToast } from '../modals';
import { showMessage } from './status';

const loadingHandler = getLoadingHandler();

/**
 * @description: contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

const ContentType = {
  'Content-Type': ContentTypeEnum.JSON,
  'Accept': 'application/json, text/plain, */*',
};
const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<typeof VueHook, typeof uniappRequestAdapter>({
  // 如果无法触发 refreshTokenOnSuccess，请使用 refreshTokenOnError
  refreshTokenOnSuccess: {
    // 返回 boolean 表示 token 是否过期
    // 当服务端返回 401 时，表示 token 过期
    isExpired: (response, method) => {
      if (method.config.meta?.loading) {
        loadingHandler.hide();
      }
      const status = response.statusCode;
      if (method.config.meta?.toast !== false)
        showToast(showMessage(status));
      return status === 401;
    },

    // 当 token 过期时触发，在此函数中触发刷新 token
    handler: (response) => {
      const status = response.statusCode;
      // 延迟跳转到登录页，否则 toast 会很快消失
      setTimeout(() => uni.reLaunch({ url: LOGIN_PATH }), ROUTE_CHANGE_DELAY);
      // 并抛出错误
      throw new Error(showMessage(status));
    },
  },
});

/**
 * alova 请求实例
 * @link https://github.com/alovajs/alova
 */
const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: TIMEOUT,
  ...AdapterUniapp(),
  beforeRequest: onAuthRequired((method) => {
    const { config } = method;
    config.headers = Object.assign(config.headers, ContentType);
    // 自定义的 headers
    if (config.meta?.headers) {
      config.headers = Object.assign(config.headers, config.meta?.headers);
    }
    const token = getTokenByStorage();
    if (token) {
      config.headers[HEADER_TOKEN_KEY] = HEADER_TOKEN_PREFIX + token;
    }
    // 是否显示 loading
    if (config.meta?.loading) {
      loadingHandler.show();
    }
  }),
  responded: onResponseRefreshToken((response, method) => {
    const { config } = method;
    const { requestType } = config;
    const { statusCode, data: responseData } = response as UniNamespace.RequestSuccessCallbackResult;
    if (config.meta?.loading) {
      loadingHandler.hide();
    }
    if (statusCode === 200) {
      if (requestType === 'download') {
        return response;
      }
      const { code, message, data } = responseData as Response;
      if (code === RESULT_ENUM.SUCCESS) {
        return data as any;
      }
      // 如果没有显式定义 custom 的 toast 为 false 的话，默认对报错进行 toast 弹出提示
      if (config.meta?.toast !== false)
        showToast(message || t('message.requestFailed'));
      throw new Error(message || t('message.requestFailed'));
    }
    else {
      // 处理 statusCode 不为 200 的情况
      if (config.meta?.toast !== false)
        showToast(showMessage(statusCode));
      throw new Error(showMessage(statusCode));
    }
  }),
});

export const request = alovaInstance;

export function get<T>(url = '', config = {}): Promise<T> {
  return request.Get<T>(url, config).then((res) => {
    return res;
  }).catch((err) => {
    return Promise.reject(err);
  });
}

export function post<T>(url = '', data = {}, config = {}): Promise<T> {
  return request.Post<T>(url, data, config).then((res) => {
    return res;
  }).catch((err) => {
    return Promise.reject(err);
  });
}

export function upload<T>(url = '', data = {}, config = {}): Promise<T> {
  return request.Post<T>(url, data, {
    // 设置请求方式为上传，适配器内将调用 uni.uploadFile
    requestType: 'upload',
    ...config,
  }).then((res) => {
    return res;
  }).catch((err) => {
    return Promise.reject(err);
  });
}

export function download<T>(url = '', config = {}): Promise<T> {
  return request.Get<T>(url, {
    // 设置请求方式为下载，适配器内将调用 uni.downloadFile
    requestType: 'download',
    ...config,
  }).then((res) => {
    return res;
  }).catch((err) => {
    return Promise.reject(err);
  });
}
