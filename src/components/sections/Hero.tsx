'use client'

import { useEffect } from 'react'

export const Hero = () => {
  useEffect(() => {
    // Добавляем класс hero-motion-ready для анимации
    requestAnimationFrame(() => {
      document.documentElement.classList.add('hero-motion-ready')
    })

    // Логотипы - анимация появления
    const logos = document.querySelector('#logos')
    if (logos) {
      // Устанавливаем индексы для логотипов
      logos.querySelectorAll('.dds-marquee-item').forEach((item, index) => {
        ;(item as HTMLElement).style.setProperty('--logo-index', String(index))
      })

      const revealLogos = () => {
        logos.classList.add('is-logos-revealed')
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
        observer.observe(logos)
      } else {
        revealLogos()
      }
    }

    return () => {
      // Очистка при размонтировании
      document.documentElement.classList.remove('hero-motion-ready')
    }
  }, [])

  return (
    <section id="hero" className="dds-app-preview dds-reveal is-visible">
      <div className="dds-app-preview-card">
        <div className="dds-app-preview-inner">
          <div className="dds-app-preview-intro">
            <div className="dds-app-preview-heading">
              <h1 className="dds-app-preview-title">
                Платформа, где все создается в рамках вашего бренда и дизайн-системы
              </h1>
              <p className="dds-app-preview-subtitle">
                Подключите дизайн-систему к Снэпбилду, чтобы каждый участник команды мог создавать
                профессиональные материалы в фирменном стиле за минуты, а не дни.
              </p>
            </div>
            <a className="dds-app-preview-cta" href="https://builder.snapbuild.ru/" target="_blank" rel="noopener noreferrer">
              <span className="dds-app-preview-cta-text">Начать сейчас</span>
            </a>
          </div>
          <div className="dds-app-preview-media">
            <img 
              className="dds-app-preview-shot" 
              src="/hero-snapbuild-2026-08-07-v2.webp" 
              alt="Снэпбилд интерфейс" 
            />
          </div>
        </div>
      </div>
    </section>
  )
}