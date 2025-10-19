import {
  isPathExists,
  removeQueryString,
  routes,
} from '@/router';
import { isLogin } from '@/utils/auth';
import { ERROR404_PATH, LOGIN_PATH } from '@/utils/const';

// 白名单路由
const whiteList = ['/'];
routes.forEach((item) => {
  if (item.needLogin !== true) {
    whiteList.push(item.path);
  }
});

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

function setupPermission() {
  // 注意：拦截 uni.switchTab 本身没有问题。但是在微信小程序端点击 tabbar 的底层逻辑并不是触发 uni.switchTab。
  // 所以误认为拦截无效，此类场景的解决方案是在 tabbar 页面的页面生命周期 onShow 中处理。
  ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'].forEach((item) => {
    // https://uniapp.dcloud.net.cn/api/interceptor.html
    uni.addInterceptor(item, {
      // 页面跳转前进行拦截, invoke 根据返回值进行判断是否继续执行跳转
      invoke(args) {
        // args 为所拦截 api 中的参数，比如拦截的是 uni.redirectTo(OBJECT)，则 args 对应的是 OBJECT 参数
        return hasPerm(args.url);
      },
    });
  });
}

export default setupPermission;
