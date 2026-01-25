import { getCurrentRoute, isPathExists, removeQueryString, routes } from '@/router';
import { ERROR404_PATH, LOGIN_PATH, TOKEN_KEY } from '../const';
import { getStorageHandler } from '../storage';

// 白名单路由
const whiteList = ['/'];
routes.forEach((item) => {
  if (item.needLogin !== true) {
    whiteList.push(item.path);
  }
});

export function getTokenByStorage() {
  const storage = getStorageHandler();
  const user = storage.getJSON('user');
  return user ? user[TOKEN_KEY] : null;
};

export function isLogin() {
  return !!getTokenByStorage();
};

/**
 * 权限校验
 * @param {string} path
 * @returns {boolean} 是否有权限
 */
export function hasPerm(path = '') {
  if (!isPathExists(path) && path !== '/') {
    uni.redirectTo({
      url: ERROR404_PATH,
    });
    return false;
  }
  // 在白名单中或有 token，直接放行
  const hasPermission
    = whiteList.includes(removeQueryString(path)) || isLogin();
  if (!hasPermission) {
    // 将用户的目标路径传递过去，这样可以实现用户登录之后，直接跳转到目标页面
    uni.redirectTo({
      url: `${LOGIN_PATH}?redirect=${encodeURIComponent(path)}`,
    });
  }
  return hasPermission;
}

// 对某些特殊场景需要在页面 onShow 生命周期中校验权限:
// 1.微信小程序端点击 tabbar 的底层逻辑不触发 uni.switchTab
// 2.h5在浏览器地址栏输入 url 后跳转不触发 uni 的路由 api
// 3.首次启动加载的页面不触发 uni 的路由 api
export function getCurrentRoutePermission() {
  return hasPerm(getCurrentRoute());
};
