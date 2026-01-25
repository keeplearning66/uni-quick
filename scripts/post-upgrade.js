import { exec } from 'node:child_process';

// 需要清除的依赖
const dependencies = [
  '@dcloudio/uni-app-harmony',
  '@dcloudio/uni-mp-alipay',
  '@dcloudio/uni-mp-baidu',
  '@dcloudio/uni-mp-jd',
  '@dcloudio/uni-mp-kuaishou',
  '@dcloudio/uni-mp-lark',
  '@dcloudio/uni-mp-qq',
  '@dcloudio/uni-mp-toutiao',
  '@dcloudio/uni-mp-xhs',
  '@dcloudio/uni-quickapp-webview',
  '@dcloudio/uni-mp-harmony',
  // vue 已经内置了 @vue/runtime-core，这里移除掉
  '@vue/runtime-core',
];

exec(`pnpm remove ${dependencies.join(' ')}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行出错: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
