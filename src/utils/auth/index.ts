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

export function hasPerm(path = '') {
  if (!isPathExists(path) && path !== '/') {
    uni.redirectTo({
      url: ERROR404_PATH,
    });
    return false;
  }

  const hasPermission
    = whiteList.includes(removeQueryString(path)) || isLogin();

  if (!hasPermission) {
    // 传递用户的目标路径(redirect)，若不需要可以去掉
    uni.redirectTo({
      url: `${LOGIN_PATH}?redirect=${encodeURIComponent(path)}`,
    });
  }
  return hasPermission;
}

// 对某些特殊场景需要在页面 onShow 生命周期中校验权限:
// 1. 微信小程序端点击 tabbar 的底层逻辑不触发 uni.switchTab
// 2. h5 在浏览器地址栏输入 url 后跳转不触发 uni 的路由 api
// 3. 首次启动加载的页面不触发 uni 的路由 api
export function getCurrentRoutePermission() {
  return hasPerm(getCurrentRoute());
};
