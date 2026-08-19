'use client'

import { useEffect } from 'react'
import { loadAllScripts } from '@/src/lib/scripts'

export const Scripts = () => {
  useEffect(() => {
    const loadScripts = async () => {
      try {
        await loadAllScripts()
      } catch (error) {
        console.warn('Failed to load scripts:', error)
      }
    }

    if (document.readyState === 'complete') {
      loadScripts()
    } else {
      window.addEventListener('load', loadScripts)
      return () => window.removeEventListener('load', loadScripts)
    }
  }, [])

  return null
}