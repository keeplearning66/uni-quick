import { hasPerm } from '@/utils';

// 对某些特殊场景需要在页面 onShow 生命周期中使用 getCurrentRoutePermission 校验权限:
// 1. 微信小程序端点击 tabbar 的底层逻辑不触发 uni.switchTab
// 2. h5 在浏览器地址栏输入 url 后跳转不触发 uni 的路由 api
// 3. 首次启动加载的页面不触发 uni 的路由 api
function setupPermission() {
  ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'].forEach((item) => {
    uni.addInterceptor(item, {
      invoke(args) {
        return hasPerm(args.url);
      },
    });
  });
}

export default setupPermission;
