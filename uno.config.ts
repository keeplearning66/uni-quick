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
import { getConversionValue } from './config';

const env = loadEnv('', fileURLToPath(new URL('./env', import.meta.url)));
const { VITE_ENABLE_UNIT_CONVERSION, VITE_UI_SIZE, VITE_UNIT_PRECISION } = env;
const enableUnitConversion = JSON.parse(VITE_ENABLE_UNIT_CONVERSION);
let size = +VITE_UI_SIZE;
const precision = +VITE_UNIT_PRECISION;
const unit = enableUnitConversion ? 'rpx' : 'px';
if (!enableUnitConversion) {
  // 单位转换系数将会是 1, 即不转换
  size = 750;
}

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
  rules: [
    // ========== Margin 外边距 ==========
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^ml-(\d+)$/, ([, d]) => ({ 'margin-left': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^mr-(\d+)$/, ([, d]) => ({ 'margin-right': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^mx-(\d+)$/, ([, d]) => ({
      'margin-left': `${getConversionValue(+d, size, precision)}${unit}`,
      'margin-right': `${getConversionValue(+d, size, precision)}${unit}`,
    })],
    [/^my-(\d+)$/, ([, d]) => ({
      'margin-top': `${getConversionValue(+d, size, precision)}${unit}`,
      'margin-bottom': `${getConversionValue(+d, size, precision)}${unit}`,
    })],
    // ========== Padding 内边距 ==========
    [/^p-(\d+)$/, ([, d]) => ({ padding: `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^pt-(\d+)$/, ([, d]) => ({ 'padding-top': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^pb-(\d+)$/, ([, d]) => ({ 'padding-bottom': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^pl-(\d+)$/, ([, d]) => ({ 'padding-left': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^pr-(\d+)$/, ([, d]) => ({ 'padding-right': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^px-(\d+)$/, ([, d]) => ({
      'padding-left': `${getConversionValue(+d, size, precision)}${unit}`,
      'padding-right': `${getConversionValue(+d, size, precision)}${unit}`,
    })],
    [/^py-(\d+)$/, ([, d]) => ({
      'padding-top': `${getConversionValue(+d, size, precision)}${unit}`,
      'padding-bottom': `${getConversionValue(+d, size, precision)}${unit}`,
    })],
    // ========== Width/Height 宽高 ==========
    [/^w-(\d+)$/, ([, d]) => ({ width: `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^h-(\d+)$/, ([, d]) => ({ height: `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^min-w-(\d+)$/, ([, d]) => ({ 'min-width': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^min-h-(\d+)$/, ([, d]) => ({ 'min-height': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^max-w-(\d+)$/, ([, d]) => ({ 'max-width': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^max-h-(\d+)$/, ([, d]) => ({ 'max-height': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^w-full$/, () => ({ width: '100%' })],
    [/^h-full$/, () => ({ height: '100%' })],
    // ========== Position 定位 ==========
    [/^top-(\d+)$/, ([, d]) => ({ top: `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^right-(\d+)$/, ([, d]) => ({ right: `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^bottom-(\d+)$/, ([, d]) => ({ bottom: `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^left-(\d+)$/, ([, d]) => ({ left: `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^inset-(\d+)$/, ([, d]) => ({
      top: `${getConversionValue(+d, size, precision)}${unit}`,
      right: `${getConversionValue(+d, size, precision)}${unit}`,
      bottom: `${getConversionValue(+d, size, precision)}${unit}`,
      left: `${getConversionValue(+d, size, precision)}${unit}`,
    })],
    // ========== Text 文本 ==========
    [/^text-(\d+)$/, ([, d]) => ({ 'font-size': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^leading-(\d+)$/, ([, d]) => ({ 'line-height': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^tracking-(\d+)$/, ([, d]) => ({ 'letter-spacing': `${getConversionValue(+d, size, precision)}${unit}` })],
    // ========== Border 边框 ==========
    [/^rounded-(\d+)$/, ([, d]) => ({ 'border-radius': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^border-(\d+)$/, ([, d]) => ({ 'border-width': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^border-t-(\d+)$/, ([, d]) => ({ 'border-top-width': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^border-b-(\d+)$/, ([, d]) => ({ 'border-bottom-width': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^border-l-(\d+)$/, ([, d]) => ({ 'border-left-width': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^border-r-(\d+)$/, ([, d]) => ({ 'border-right-width': `${getConversionValue(+d, size, precision)}${unit}` })],
    // ========== Gap 间距 ==========
    [/^gap-(\d+)$/, ([, d]) => ({ gap: `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^gap-x-(\d+)$/, ([, d]) => ({ 'column-gap': `${getConversionValue(+d, size, precision)}${unit}` })],
    [/^gap-y-(\d+)$/, ([, d]) => ({ 'row-gap': `${getConversionValue(+d, size, precision)}${unit}` })],
  ],
});
