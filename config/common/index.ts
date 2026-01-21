import type { PluginOption } from 'vite';
import uniPlugin from '@dcloudio/vite-plugin-uni';
import ViteRestart from 'vite-plugin-restart';
import { createAutoImport } from './autoImport';
import { createAutoRegistryComponents } from './component';
import { createUnoCSS } from './unocss';

export default function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // UnoCSS配置
    createUnoCSS(),
    // 自动按需引入依赖
    createAutoImport(),
    // 自动按需引入组件(注意：需注册至 uni 之前，否则不会生效)
    createAutoRegistryComponents(),
    // uni支持(兼容性写法，当type为module时，必须要这样写)
    (uniPlugin as any).default(),
    ViteRestart({
      // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
      restart: ['vite.config.ts'],
    }),
  ];

  if (isBuild) {
    const buildPlugins: (PluginOption | PluginOption[])[] = [
      // 打包视图分析
      // VisualizerPlugin(),
    ];
    vitePlugins.push(...buildPlugins);
  }

  return vitePlugins;
}

export * from './autoImport';
export * from './component';
export * from './unit-conversion';
export * from './unocss';
