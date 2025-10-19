import type { UserConfig } from 'vite';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import postcssUnitProcessor from 'postcss-unit-processor';
import { defineConfig, loadEnv } from 'vite';
import { createViteProxy, getUnitConversionMultiple } from './build/config/index';
import createVitePlugins from './build/plugins/index';

export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, fileURLToPath(new URL('./env', import.meta.url)));
  const unitConversionMultiple = getUnitConversionMultiple(env);
  const isBuild = process.env.NODE_ENV === 'production';
  return {
    envDir: './env',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: Number.parseInt(env.VITE_APP_PORT, 10),
      hmr: true,
      host: true,
      open: true,
      proxy: createViteProxy(env),
    },
    css: {
      postcss: {
        plugins: [
          postcssUnitProcessor({
            processor: (value: number, unit: string) => {
              if (!JSON.parse(env.VITE_ENABLE_UNIT_CONVERSION)) {
                return { value, unit };
              }
              if (unit === 'px') {
                value *= unitConversionMultiple;
                unit = 'rpx';
              }
              else if (unit === 'mpx') {
                unit = 'px';
              }
              return { value, unit };
            },
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            exclude: /node_modules/i,
            customUnitList: ['mpx'],
          }),
        ],
      },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    plugins: [createVitePlugins(isBuild)],
    esbuild: {
      drop: JSON.parse(env.VITE_DROP_CONSOLE) ? ['console', 'debugger'] : [],
    },
  };
});
