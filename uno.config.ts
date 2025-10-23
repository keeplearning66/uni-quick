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
const { VITE_ENABLE_UNIT_CONVERSION, VITE_UI_SIZE } = env;
const enableUnitConversion = JSON.parse(VITE_ENABLE_UNIT_CONVERSION);
let unitConversionMultiple = getUnitConversionMultiple(+VITE_UI_SIZE);
const unit = enableUnitConversion ? 'rpx' : 'px';
if (!enableUnitConversion) {
  unitConversionMultiple = 1;
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
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${+d * unitConversionMultiple}${unit}` })],
    [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${+d * unitConversionMultiple}${unit}` })],
    [/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${+d * unitConversionMultiple}${unit}` })],
    [/^ml-(\d+)$/, ([, d]) => ({ 'margin-left': `${+d * unitConversionMultiple}${unit}` })],
    [/^mr-(\d+)$/, ([, d]) => ({ 'margin-right': `${+d * unitConversionMultiple}${unit}` })],
    [/^mx-(\d+)$/, ([, d]) => ({ 'margin-left': `${+d * unitConversionMultiple}${unit}`, 'margin-right': `${+d * unitConversionMultiple}${unit}` })],
    [/^my-(\d+)$/, ([, d]) => ({ 'margin-top': `${+d * unitConversionMultiple}${unit}`, 'margin-bottom': `${+d * unitConversionMultiple}${unit}` })],
    // ========== Padding 内边距 ==========
    [/^p-(\d+)$/, ([, d]) => ({ padding: `${+d * unitConversionMultiple}${unit}` })],
    [/^pt-(\d+)$/, ([, d]) => ({ 'padding-top': `${+d * unitConversionMultiple}${unit}` })],
    [/^pb-(\d+)$/, ([, d]) => ({ 'padding-bottom': `${+d * unitConversionMultiple}${unit}` })],
    [/^pl-(\d+)$/, ([, d]) => ({ 'padding-left': `${+d * unitConversionMultiple}${unit}` })],
    [/^pr-(\d+)$/, ([, d]) => ({ 'padding-right': `${+d * unitConversionMultiple}${unit}` })],
    [/^px-(\d+)$/, ([, d]) => ({ 'padding-left': `${+d * unitConversionMultiple}${unit}`, 'padding-right': `${+d * unitConversionMultiple}${unit}` })],
    [/^py-(\d+)$/, ([, d]) => ({ 'padding-top': `${+d * unitConversionMultiple}${unit}`, 'padding-bottom': `${+d * unitConversionMultiple}${unit}` })],
    // ========== Width/Height 宽高 ==========
    [/^w-(\d+)$/, ([, d]) => ({ width: `${+d * unitConversionMultiple}${unit}` })],
    [/^h-(\d+)$/, ([, d]) => ({ height: `${+d * unitConversionMultiple}${unit}` })],
    [/^min-w-(\d+)$/, ([, d]) => ({ 'min-width': `${+d * unitConversionMultiple}${unit}` })],
    [/^min-h-(\d+)$/, ([, d]) => ({ 'min-height': `${+d * unitConversionMultiple}${unit}` })],
    [/^max-w-(\d+)$/, ([, d]) => ({ 'max-width': `${+d * unitConversionMultiple}${unit}` })],
    [/^max-h-(\d+)$/, ([, d]) => ({ 'max-height': `${+d * unitConversionMultiple}${unit}` })],
    [/^w-full$/, () => ({ width: '100%' })],
    [/^h-full$/, () => ({ height: '100%' })],
    // ========== Position 定位 ==========
    [/^top-(\d+)$/, ([, d]) => ({ top: `${+d * unitConversionMultiple}${unit}` })],
    [/^right-(\d+)$/, ([, d]) => ({ right: `${+d * unitConversionMultiple}${unit}` })],
    [/^bottom-(\d+)$/, ([, d]) => ({ bottom: `${+d * unitConversionMultiple}${unit}` })],
    [/^left-(\d+)$/, ([, d]) => ({ left: `${+d * unitConversionMultiple}${unit}` })],
    [/^inset-(\d+)$/, ([, d]) => ({ top: `${+d * unitConversionMultiple}${unit}`, right: `${+d * unitConversionMultiple}${unit}`, bottom: `${+d * unitConversionMultiple}${unit}`, left: `${+d * unitConversionMultiple}${unit}` })],
    // ========== Text 文本 ==========
    [/^text-(\d+)$/, ([, d]) => ({ 'font-size': `${+d * unitConversionMultiple}${unit}` })],
    [/^leading-(\d+)$/, ([, d]) => ({ 'line-height': `${+d * unitConversionMultiple}${unit}` })],
    [/^tracking-(\d+)$/, ([, d]) => ({ 'letter-spacing': `${+d * unitConversionMultiple}${unit}` })],
    // ========== Border 边框 ==========
    [/^rounded-(\d+)$/, ([, d]) => ({ 'border-radius': `${+d * unitConversionMultiple}${unit}` })],
    [/^border-(\d+)$/, ([, d]) => ({ 'border-width': `${+d * unitConversionMultiple}${unit}` })],
    [/^border-t-(\d+)$/, ([, d]) => ({ 'border-top-width': `${+d * unitConversionMultiple}${unit}` })],
    [/^border-b-(\d+)$/, ([, d]) => ({ 'border-bottom-width': `${+d * unitConversionMultiple}${unit}` })],
    [/^border-l-(\d+)$/, ([, d]) => ({ 'border-left-width': `${+d * unitConversionMultiple}${unit}` })],
    [/^border-r-(\d+)$/, ([, d]) => ({ 'border-right-width': `${+d * unitConversionMultiple}${unit}` })],
    // ========== Gap 间距 ==========
    [/^gap-(\d+)$/, ([, d]) => ({ gap: `${+d * unitConversionMultiple}${unit}` })],
    [/^gap-x-(\d+)$/, ([, d]) => ({ 'column-gap': `${+d * unitConversionMultiple}${unit}` })],
    [/^gap-y-(\d+)$/, ([, d]) => ({ 'row-gap': `${+d * unitConversionMultiple}${unit}` })],
  ],
});
