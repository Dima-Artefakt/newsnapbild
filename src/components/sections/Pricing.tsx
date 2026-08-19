'use client'

import { useState, useRef, useEffect } from 'react'
import '../../styles/components/pricing.css'

const plans = [
  {
    id: 'starter',
    name: 'Старт',
    price: 0,
    period: 'месяц',
    description: 'Для пробного использования',
    features: [
      'До 10 проектов',
      'Базовые шаблоны',
      'Экспорт в PNG',
      'Поддержка чат',
    ],
    cta: 'Начать бесплатно',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Про',
    price: 29,
    period: 'месяц',
    description: 'Для профессиональных команд',
    features: [
      'Неограниченно проектов',
      'Все шаблоны',
      'Экспорт в PDF, MP4',
      'Приоритетная поддержка',
      'API доступ',
    ],
    cta: 'Попробовать 14 дней',
    popular: true,
  },
  {
    id: 'business',
    name: 'Бизнес',
    price: 99,
    period: 'месяц',
    description: 'Для крупных компаний',
    features: [
      'Всё из Про',
      'Собственный брендинг',
      'Самые быстрые генерации',
      'Персональный менеджер',
      'Кастомные интеграции',
    ],
    cta: 'Связаться с нами',
    popular: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    period: 'месяц',
    description: 'Для корпораций',
    features: [
      'Всё из Бизнес',
      'Выделенный сервер',
      'SLA 99.9%',
      'Команда поддержки 24/7',
      'Обучение сотрудников',
    ],
    cta: 'Связаться с нами',
    popular: false,
  },
  {
    id: 'agency',
    name: 'Агентство',
    price: 149,
    period: 'месяц',
    description: 'Для агентств и студий',
    features: [
      'До 50 проектов',
      'Белые этикетки',
      'Клиентский портал',
      'API доступ',
      'Приоритетная поддержка',
    ],
    cta: 'Попробовать 14 дней',
    popular: false,
  },
]

export const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const toggleAnnual = () => {
    setIsAnnual(!isAnnual)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const scroll = scrollRef.current
    if (!scroll) return
    setIsDragging(true)
    setStartX(e.pageX)
    setScrollLeft(scroll.scrollLeft)
    scroll.style.cursor = 'grabbing'
    scroll.style.userSelect = 'none'
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const scroll = scrollRef.current
    if (!scroll) return
    e.preventDefault()
    
    const dx = e.pageX - startX
    let newScrollLeft = scrollLeft - dx

    const maxScroll = scroll.scrollWidth - scroll.clientWidth
    newScrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll))

    scroll.scrollLeft = newScrollLeft
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    const scroll = scrollRef.current
    if (scroll) {
      scroll.style.cursor = 'grab'
      scroll.style.userSelect = ''
    }
  }

  useEffect(() => {
    const scroll = scrollRef.current
    if (!scroll) return

    let startXTouch = 0
    let startYTouch = 0
    let scrollLeftTouch = 0
    let isSwiping = false

    const handleTouchStart = (e: TouchEvent) => {
      startXTouch = e.touches[0].pageX
      startYTouch = e.touches[0].pageY
      scrollLeftTouch = scroll.scrollLeft
      isSwiping = false
    }

    const handleTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].pageX - startXTouch
      const dy = e.touches[0].pageY - startYTouch

      if (Math.abs(dx) > 5 && Math.abs(dx) > Math.abs(dy)) {
        isSwiping = true
        e.preventDefault()

        let newScrollLeft = scrollLeftTouch - dx

        const maxScroll = scroll.scrollWidth - scroll.clientWidth
        newScrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll))

        scroll.scrollLeft = newScrollLeft
      }
    }

    const handleTouchEnd = () => {
      if (isSwiping) {
        // Небольшая задержка для инерции
      }
    }

    scroll.addEventListener('touchstart', handleTouchStart, { passive: true })
    scroll.addEventListener('touchmove', handleTouchMove, { passive: false })
    scroll.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      scroll.removeEventListener('touchstart', handleTouchStart)
      scroll.removeEventListener('touchmove', handleTouchMove)
      scroll.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <section className="dds-pricing dds-reveal" id="pricing">
      <div className="dds-pricing-header">
        <h2 className="dds-pricing-section-title">
          Выберите подходящий <br />тариф
        </h2>
        <p className="dds-pricing-subtitle">
          Начните бесплатно, масштабируйтесь с ростом вашего бизнеса
        </p>

        <div className="dds-pricing-toggle">
          <span 
            className={`dds-pricing-toggle-label ${!isAnnual ? 'dds-pricing-toggle-label--active' : ''}`}
            onClick={toggleAnnual}
            style={{ cursor: 'pointer' }}
          >
            Месяц
          </span>
          <button
            className={`dds-pricing-toggle-switch ${isAnnual ? 'dds-pricing-toggle-switch--active' : ''}`}
            onClick={toggleAnnual}
            type="button"
            aria-label="Переключить тариф"
          >
            <span className="dds-pricing-toggle-switch-handle" />
          </button>
          <span 
            className={`dds-pricing-toggle-label ${isAnnual ? 'dds-pricing-toggle-label--active' : ''}`}
            onClick={toggleAnnual}
            style={{ cursor: 'pointer' }}
          >
            Год
            <span className="dds-pricing-toggle-discount">-20%</span>
          </span>
        </div>
      </div>

      <div
        className="dds-pricing-scroll"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="dds-pricing-track">
          {plans.map((plan) => {
            const finalPrice = isAnnual ? Number((plan.price * 0.8).toFixed(2)) : plan.price
            const isFree = plan.price === 0
            const displayPrice = isFree ? 'Бесплатно' : `$${finalPrice}`

            return (
              <div
                key={plan.id}
                className={`dds-pricing-card ${plan.popular ? 'dds-pricing-card--popular' : ''}`}
              >
                {plan.popular && (
                  <div className="dds-pricing-card-badge">Популярный</div>
                )}
                <div className="dds-pricing-card-top">
                  <h3 className="dds-pricing-card-name">{plan.name}</h3>
                  <div className="dds-pricing-card-price">
                    {displayPrice}
                    {!isFree && (
                      <span className="dds-pricing-card-period">/{plan.period}</span>
                    )}
                  </div>
                  <p className="dds-pricing-card-description">{plan.description}</p>
                </div>
                <ul className="dds-pricing-card-features">
                  {plan.features.map((feature, index) => (
                    <li key={index}>
                      <span className="dds-pricing-card-feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`dds-pricing-card-btn ${plan.popular ? 'dds-pricing-card-btn--primary' : 'dds-pricing-card-btn--outline'}`}>
                  {plan.cta}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="dds-pricing-bottom">
        <p className="dds-pricing-bottom-text">
          Все тарифы включают базовую поддержку и обновления.
          <br />
          <a href="#" className="dds-pricing-link">Сравнить все возможности →</a>
        </p>
      </div>
    </section>
  )
}