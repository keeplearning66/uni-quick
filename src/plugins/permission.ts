import { hasPerm } from '@/utils';

function setupPermission() {
  // 注意：拦截 uni.switchTab 本身没有问题。但是在微信小程序端点击 tabbar 的底层逻辑并不是触发 uni.switchTab。
  // 所以误认为拦截无效，此类场景的解决方案是在 tabbar 页面的页面生命周期 onShow 中处理。
  ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'].forEach((item) => {
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
