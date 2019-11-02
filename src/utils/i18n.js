import VueI18n from 'vue-i18n';
import langs from '../../i18n';

export async function createI18n(locale) {
  const { default: localeMessages } = await import(
    `../../i18n/locales/${locale}`
  );
  const messages = {
    [locale]: localeMessages
  };
  return new VueI18n({
    locale,
    messages
  });
}

export function getAutoLang() {
  let result = window.navigator.userLanguage || window.navigator.language;
  if (result) {
    result = result.substring(0, 2);
  }
  if (langs.indexOf(result) === -1) {
    return 'en';
  } else {
    return result;
  }
}
