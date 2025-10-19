import { fileURLToPath, URL } from 'node:url';
import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { presetWeapp } from 'unocss-preset-weapp';
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer';
import { loadEnv } from 'vite';
import { getUnitConversionMultiple } from './build/config/index';

const env = loadEnv('', fileURLToPath(new URL('./env', import.meta.url)));
const enableUnitConversion = JSON.parse(env.VITE_ENABLE_UNIT_CONVERSION);
const unitConversionMultiple = getUnitConversionMultiple(env);

const { presetWeappAttributify, transformerAttributify } = extractorAttributify();

export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
    // attributify autocomplete
    presetWeappAttributify() as any,
    // https://unocss.dev/presets/icons
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  /**
   * 自定义快捷语句
   * @see https://github.com/unocss/unocss#shortcuts
   */
  shortcuts: {
    center: 'flex justify-center items-center',
  },
  transformers: [
    // 启用 @apply 功能
    transformerDirectives({
      enforce: 'pre',
    }),
    // https://unocss.dev/transformers/variant-group
    // 启用 () 分组功能
    transformerVariantGroup(),
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify() as any,
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
  rules: enableUnitConversion
    ? [
        // ========== Margin 外边距 ==========
        [/^m-(\d+)$/, ([, d]) => ({ margin: `${+d * unitConversionMultiple}rpx` })],
        [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${+d * unitConversionMultiple}rpx` })],
        [/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${+d * unitConversionMultiple}rpx` })],
        [/^ml-(\d+)$/, ([, d]) => ({ 'margin-left': `${+d * unitConversionMultiple}rpx` })],
        [/^mr-(\d+)$/, ([, d]) => ({ 'margin-right': `${+d * unitConversionMultiple}rpx` })],
        [/^mx-(\d+)$/, ([, d]) => ({ 'margin-left': `${+d * unitConversionMultiple}rpx`, 'margin-right': `${+d * unitConversionMultiple}rpx` })],
        [/^my-(\d+)$/, ([, d]) => ({ 'margin-top': `${+d * unitConversionMultiple}rpx`, 'margin-bottom': `${+d * unitConversionMultiple}rpx` })],
        // ========== Padding 内边距 ==========
        [/^p-(\d+)$/, ([, d]) => ({ padding: `${+d * unitConversionMultiple}rpx` })],
        [/^pt-(\d+)$/, ([, d]) => ({ 'padding-top': `${+d * unitConversionMultiple}rpx` })],
        [/^pb-(\d+)$/, ([, d]) => ({ 'padding-bottom': `${+d * unitConversionMultiple}rpx` })],
        [/^pl-(\d+)$/, ([, d]) => ({ 'padding-left': `${+d * unitConversionMultiple}rpx` })],
        [/^pr-(\d+)$/, ([, d]) => ({ 'padding-right': `${+d * unitConversionMultiple}rpx` })],
        [/^px-(\d+)$/, ([, d]) => ({ 'padding-left': `${+d * unitConversionMultiple}rpx`, 'padding-right': `${+d * unitConversionMultiple}rpx` })],
        [/^py-(\d+)$/, ([, d]) => ({ 'padding-top': `${+d * unitConversionMultiple}rpx`, 'padding-bottom': `${+d * unitConversionMultiple}rpx` })],
        // ========== Width/Height 宽高 ==========
        [/^w-(\d+)$/, ([, d]) => ({ width: `${+d * unitConversionMultiple}rpx` })],
        [/^h-(\d+)$/, ([, d]) => ({ height: `${+d * unitConversionMultiple}rpx` })],
        [/^min-w-(\d+)$/, ([, d]) => ({ 'min-width': `${+d * unitConversionMultiple}rpx` })],
        [/^min-h-(\d+)$/, ([, d]) => ({ 'min-height': `${+d * unitConversionMultiple}rpx` })],
        [/^max-w-(\d+)$/, ([, d]) => ({ 'max-width': `${+d * unitConversionMultiple}rpx` })],
        [/^max-h-(\d+)$/, ([, d]) => ({ 'max-height': `${+d * unitConversionMultiple}rpx` })],
        [/^w-full$/, () => ({ width: '100%' })],
        [/^h-full$/, () => ({ height: '100%' })],
        // ========== Position 定位 ==========
        [/^top-(\d+)$/, ([, d]) => ({ top: `${+d * unitConversionMultiple}rpx` })],
        [/^right-(\d+)$/, ([, d]) => ({ right: `${+d * unitConversionMultiple}rpx` })],
        [/^bottom-(\d+)$/, ([, d]) => ({ bottom: `${+d * unitConversionMultiple}rpx` })],
        [/^left-(\d+)$/, ([, d]) => ({ left: `${+d * unitConversionMultiple}rpx` })],
        [/^inset-(\d+)$/, ([, d]) => ({ top: `${+d * unitConversionMultiple}rpx`, right: `${+d * unitConversionMultiple}rpx`, bottom: `${+d * unitConversionMultiple}rpx`, left: `${+d * unitConversionMultiple}rpx` })],
        // ========== Text 文本 ==========
        [/^text-(\d+)$/, ([, d]) => ({ 'font-size': `${+d * unitConversionMultiple}rpx` })],
        [/^leading-(\d+)$/, ([, d]) => ({ 'line-height': `${+d * unitConversionMultiple}rpx` })],
        [/^tracking-(\d+)$/, ([, d]) => ({ 'letter-spacing': `${+d * unitConversionMultiple}rpx` })],
        // ========== Border 边框 ==========
        [/^rounded-(\d+)$/, ([, d]) => ({ 'border-radius': `${+d * unitConversionMultiple}rpx` })],
        [/^border-(\d+)$/, ([, d]) => ({ 'border-width': `${+d * unitConversionMultiple}rpx` })],
        [/^border-t-(\d+)$/, ([, d]) => ({ 'border-top-width': `${+d * unitConversionMultiple}rpx` })],
        [/^border-b-(\d+)$/, ([, d]) => ({ 'border-bottom-width': `${+d * unitConversionMultiple}rpx` })],
        [/^border-l-(\d+)$/, ([, d]) => ({ 'border-left-width': `${+d * unitConversionMultiple}rpx` })],
        [/^border-r-(\d+)$/, ([, d]) => ({ 'border-right-width': `${+d * unitConversionMultiple}rpx` })],
        // ========== Gap 间距 ==========
        [/^gap-(\d+)$/, ([, d]) => ({ gap: `${+d * unitConversionMultiple}rpx` })],
        [/^gap-x-(\d+)$/, ([, d]) => ({ 'column-gap': `${+d * unitConversionMultiple}rpx` })],
        [/^gap-y-(\d+)$/, ([, d]) => ({ 'row-gap': `${+d * unitConversionMultiple}rpx` })],
      ]
    : [],
});
