// src/lib/scripts.ts

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const loadScript = (src: string, async = true): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = async
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.head.appendChild(script)
  })
}

export const loadPhonoTag = () => {
  return loadScript(`${basePath}/js/tag_phono.js`, true);
}

export const loadTag = () => {
  return loadScript(`${basePath}/js/tag.js`, true)
}

export const loadAllScripts = () => {
  return Promise.all([
    loadPhonoTag(),
    loadTag()
  ]).catch((error) => {
    console.warn('Failed to load some scripts:', error)
  })
}