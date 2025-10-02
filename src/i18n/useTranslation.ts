import { useState, useCallback, useEffect } from 'react'
import { translations, type Translations } from './translations'

type Language = 'en' | 'ru'

const STORAGE_KEY = 'silksong-analyzer-language'

export function useTranslation() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return (saved === 'en' || saved === 'ru') ? saved : 'ru'
  })

  const changeLanguage = useCallback((newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem(STORAGE_KEY, newLanguage)
  }, [])

  const t = useCallback((key: keyof Translations): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }, [language])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return {
    language,
    changeLanguage,
    t
  }
}
