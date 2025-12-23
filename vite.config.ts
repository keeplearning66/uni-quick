import type { UserConfig } from 'vite';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import postcssUnitProcessor from 'postcss-unit-processor';
import { defineConfig, loadEnv } from 'vite';
import { createViteProxy, unitConversionProcessor } from './build/config/index';
import createVitePlugins from './build/plugins/index';

export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, fileURLToPath(new URL('./env', import.meta.url)));
  const { VITE_APP_PORT, VITE_ENABLE_UNIT_CONVERSION, VITE_UI_SIZE, VITE_NO_CONVERSION_UNIT, VITE_UNIT_PRECISION, VITE_DROP_CONSOLE } = env;
  const isBuild = process.env.NODE_ENV === 'production';
  return {
    envDir: './env',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: Number.parseInt(VITE_APP_PORT, 10),
      hmr: true,
      host: true,
      open: true,
      proxy: createViteProxy(env),
    },
    css: {
      postcss: {
        plugins: [
          postcssUnitProcessor({
            processor: unitConversionProcessor(JSON.parse(VITE_ENABLE_UNIT_CONVERSION), +VITE_UI_SIZE, VITE_NO_CONVERSION_UNIT, +VITE_UNIT_PRECISION),
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            exclude: /node_modules/i,
            customUnitList: [VITE_NO_CONVERSION_UNIT],
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
      drop: JSON.parse(VITE_DROP_CONSOLE) ? ['console', 'debugger'] : [],
    },
    optimizeDeps: {
      exclude: process.env.UNI_PLATFORM === 'h5' && process.env.NODE_ENV === 'development' ? ['wot-design-uni'] : [],
    },
  };
});
