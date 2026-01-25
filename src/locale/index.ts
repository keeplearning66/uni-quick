import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import { Locale } from 'wot-design-uni';
import wotEn from 'wot-design-uni/locale/lang/en-US';
import wotZh from 'wot-design-uni/locale/lang/zh-CN';
import en from './lang/en';
import zhHans from './lang/zh-Hans';

const locale = uni.getLocale();
const WOT_UI_LOCALE_MAP = { 'en': wotEn, 'zh-Hans': wotZh };

const i18n = createI18n({
  legacy: false, // 必须设置 false 才能使用 Composition API
  globalInjection: true, // 为每个组件注入 $ 为前缀的全局属性和函数
  locale,
  messages: {
    en,
    'zh-Hans': zhHans,
  },
});

function setupI18n(app: App) {
  app.use(i18n);
  Locale.use(locale, WOT_UI_LOCALE_MAP[locale as keyof typeof WOT_UI_LOCALE_MAP]);
}

export default setupI18n;
export const t = i18n.global.t;
