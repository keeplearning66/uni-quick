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

export function getCurrentRoutePermission() {
  return hasPerm(getCurrentRoute());
};
