'use client'

import { useEffect } from 'react'
import { loadAllScripts } from '@/src/lib/scripts'

export const Scripts = () => {
  useEffect(() => {
    // Загрузка всех скриптов с задержкой после рендеринга
    const loadScripts = async () => {
      try {
        await loadAllScripts()
      } catch (error) {
        console.warn('Failed to load scripts:', error)
      }
    }

    // Загружаем скрипты после полной загрузки страницы
    if (document.readyState === 'complete') {
      loadScripts()
    } else {
      window.addEventListener('load', loadScripts)
      return () => window.removeEventListener('load', loadScripts)
    }
  }, [])

  return null
}