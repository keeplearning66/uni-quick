import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import { Locale } from 'wot-design-uni';
import enUS from 'wot-design-uni/locale/lang/en-US';
import en from './lang/en';
import zhHans from './lang/zh-Hans';

const locale = uni.getLocale();
const WOT_UI_LOCALE_MAP = { en: enUS };

const i18n = createI18n({
  legacy: false, // 必须设置false才能使用Composition API
  globalInjection: true, // 为每个组件注入$为前缀的全局属性和函数
  locale,
  messages: {
    en,
    'zh-Hans': zhHans,
  },
});

function setupI18n(app: App) {
  app.use(i18n);
  if (locale !== 'zh-Hans') {
    Locale.use(locale, WOT_UI_LOCALE_MAP[locale as keyof typeof WOT_UI_LOCALE_MAP]);
  }
}

export { i18n };
export default setupI18n;
