'use client'

import { useEffect, useRef } from 'react'

const logos = [
  { id: 3, src: '/ozon.svg' },
  { id: 4, src: '/tele2.svg' },
  { id: 7, src: '/logo-avito.svg' },
  { id: 8, src: '/logo-cian.svg' },
  { id: 10, src: '/logo-lenta.svg' },
]

export const Logos = () => {
  const trackRef = useRef<HTMLDivElement>(null)
  const initRef = useRef(false)

  useEffect(() => {
    // Предотвращаем двойную инициализацию
    if (initRef.current) return
    initRef.current = true

    const track = trackRef.current
    if (!track) return

    const mq = window.matchMedia('(max-width: 1023px)')
    // Используем :scope для поиска прямого потомка
    const content = track.querySelector(':scope > .dds-marquee-content') as HTMLElement
    if (!content) return

    // Устанавливаем data-атрибут для запуска анимации
    track.setAttribute('data-marquee-built', '')

    // Устанавливаем индексы для анимации появления
    const items = track.querySelectorAll('.dds-marquee-item')
    items.forEach((item, index) => {
      ;(item as HTMLElement).style.setProperty('--logo-index', String(index))
    })

    // Функция расчёта смещения (точь-в-точь как в оригинале)
    const setLoopOffset = () => {
      if (!mq.matches) return
      requestAnimationFrame(() => {
        const width = content.getBoundingClientRect().width
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0
        if (width > 0) {
          track.style.setProperty('--dds-marquee-loop-offset', '-' + (width + gap) + 'px')
        }
      })
    }

    setLoopOffset()
    mq.addEventListener('change', setLoopOffset)
    window.addEventListener('resize', setLoopOffset, { passive: true })

    if ('ResizeObserver' in window) {
      new ResizeObserver(setLoopOffset).observe(content)
    }

    // Ждём загрузки изображений (как в оригинале)
    content.querySelectorAll('img').forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', setLoopOffset, { once: true })
      }
    })

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(setLoopOffset)
    }

    // Анимация появления логотипов
    const logosSection = document.querySelector('#logos')
    if (logosSection) {
      const revealLogos = () => {
        logosSection.classList.add('is-logos-revealed')
      }

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return
            revealLogos()
            observer.disconnect()
          },
          { threshold: 0.18 }
        )
        observer.observe(logosSection)
      } else {
        revealLogos()
      }
    }

    return () => {
      mq.removeEventListener('change', setLoopOffset)
      window.removeEventListener('resize', setLoopOffset)
    }
  }, [])

  return (
    <section id="logos" className="dds-marquee dds-reveal">
      <p className="dds-marquee-eyebrow">
        С платформой работают команды, для которых бренд — закон
      </p>
      <div className="dds-marquee-track" ref={trackRef}>
        <div className="dds-marquee-content">
          {logos.map((logo) => (
            <div key={logo.id} className={`dds-marquee-item dds-marquee-item-${logo.id}`}>
              <img src={logo.src} alt="" />
            </div>
          ))}
        </div>
        <div className="dds-marquee-content" aria-hidden="true">
          {logos.map((logo) => (
            <div key={logo.id} className={`dds-marquee-item dds-marquee-item-${logo.id}`}>
              <img src={logo.src} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}