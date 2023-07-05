interface Language {
  code: string
  name: string
  flag: string
  i18nKey: string
}

export const languages: Language[] = [
  { code: 'es-VE', name: 'Spanish', flag: '🇻🇪', i18nKey: 'settings.spanish' },
  { code: 'en-US', name: 'English', flag: '🇺🇸', i18nKey: 'settings.english' },
]