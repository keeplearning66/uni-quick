import { hasPerm } from '@/plugins/permission';
import { currentRoute } from '@/router';
import { TOKEN_KEY } from '../const';
import getStorageHandler from '../storage';

// 对某些特殊场景需要在页面 onShow 生命周期中校验权限:
// 1.微信小程序端点击 tabbar 的底层逻辑不触发 uni.switchTab
// 2.h5在浏览器地址栏输入 url 后跳转不触发 uni 的路由 api
// 3.首次启动加载的页面不触发 uni 的路由 api
const getCurrentRoutePermission = () => {
  return hasPerm(currentRoute());
};

const getTokenByStorage = () => {
  const storage = getStorageHandler();
  const user = storage.getJSON('user');
  return user ? user[TOKEN_KEY] : null;
};

const isLogin = () => {
  return !!getTokenByStorage();
};

export { getCurrentRoutePermission, getTokenByStorage, isLogin };
