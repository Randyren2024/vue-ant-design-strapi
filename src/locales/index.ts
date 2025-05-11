import { createI18n } from 'vue-i18n';
import zhCN from './zh-CN';
import enUS from './en-US';
import jaJP from './ja-JP';
import esES from './es-ES';
import frFR from './fr-FR';
import deDE from './de-DE';

const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
    'ja-JP': jaJP,
    'es-ES': esES,
    'fr-FR': frFR,
    'de-DE': deDE
  }
});

export default i18n; 