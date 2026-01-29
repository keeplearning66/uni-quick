import type { PluginOption } from 'vite';
import uniPlugin from '@dcloudio/vite-plugin-uni';
import ViteRestart from 'vite-plugin-restart';
import { createAutoImport } from './auto-import';
import { createAutoRegistryComponents } from './component';
import { createUnoCSS } from './unocss';
// import { createVisualizer } from './visualizer';

export default function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    createUnoCSS(),
    createAutoImport(),
    // 自动按需引入组件(注意：需注册至 uni 之前，否则不会生效)
    createAutoRegistryComponents(),
    // uni支持(兼容性写法，当type为module时，必须要这样写)
    (uniPlugin as any).default(),
    ViteRestart({
      restart: ['vite.config.ts'],
    }),
  ];

  if (isBuild) {
    const buildPlugins: (PluginOption | PluginOption[])[] = [
      // 打包视图分析，需要的话将注释取消
      // createVisualizer(),
    ];
    vitePlugins.push(...buildPlugins);
  }

  return vitePlugins;
}

export * from './auto-import';
export * from './component';
export * from './unit-conversion';
export * from './unocss';
