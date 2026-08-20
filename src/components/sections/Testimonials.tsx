'use client'

import { useState, useEffect, useRef } from 'react'
import '../../styles/components/testimonials.css'
import { AppImage } from '@/src/components/AppImage'

const testimonials = [
  {
    id: 1,
    name: 'Анна Иванова',
    role: 'Руководитель маркетинга',
    company: 'OZON',
    text: 'Снэпбилд позволил нам сократить время создания маркетинговых материалов с недель до часов. Теперь любые изменения в дизайне применяются автоматически ко всем материалам.',
    rating: 5,
    avatar: 'placeholder-avatar.svg',
  },
  {
    id: 2,
    name: 'Михаил Петров',
    role: 'Продукт-менеджер',
    company: 'Avito',
    text: 'Мы подключили дизайн-систему к Снэпбилду и теперь вся команда создаёт контент в едином стиле. Никаких больше расхождений и ручных правок.',
    rating: 5,
    avatar: 'placeholder-avatar.svg',
  },
  {
    id: 3,
    name: 'Екатерина Смирнова',
    role: 'Арт-директор',
    company: 'Циан',
    text: 'Интеграция с нашей дизайн-системой прошла за один день. Теперь баннеры, презентации и видео генерируются автоматически в нужных форматах.',
    rating: 5,
    avatar: 'placeholder-avatar.svg',
  },
  {
    id: 4,
    name: 'Дмитрий Козлов',
    role: 'Директор по маркетингу',
    company: 'Лента',
    text: 'Снэпбилд — это не просто инструмент, это платформа, которая изменила наш подход к созданию контента. Результаты превосходят ожидания.',
    rating: 4,
    avatar: 'placeholder-avatar.svg',
  },
  {
    id: 5,
    name: 'Ольга Соколова',
    role: 'CEO',
    company: 'BrandLab',
    text: 'Снэпбилд изменил наш workflow. Теперь мы создаём материалы в 10 раз быстрее, сохраняя полный контроль над брендом.',
    rating: 5,
    avatar: 'placeholder-avatar.svg',
  },
  {
    id: 6,
    name: 'Алексей Иванов',
    role: 'Маркетолог',
    company: 'OZON',
    text: 'Очень удобный инструмент для создания контента в едином стиле. Экономит кучу времени!',
    rating: 5,
    avatar: 'placeholder-avatar.svg',
  },
  {
    id: 7,
    name: 'Алексей Иванов',
    role: 'Маркетолог',
    company: 'OZON',
    text: 'Очень удобный инструмент для создания контента в едином стиле. Экономит кучу времени!',
    rating: 5,
    avatar: 'placeholder-avatar.svg',
  },
  {
    id: 8,
    name: 'Алексей Иванов',
    role: 'Маркетолог',
    company: 'OZON',
    text: 'Очень удобный инструмент для создания контента в едином стиле. Экономит кучу времени!',
    rating: 5,
    avatar: 'placeholder-avatar.svg',
  },
]

export const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [activeId, setActiveId] = useState<number | null>(null)

  const clampScroll = () => {
    const scroll = scrollRef.current
    if (!scroll) return

    const maxScroll = scroll.scrollWidth - scroll.clientWidth
    if (scroll.scrollLeft < 0) {
      scroll.scrollLeft = 0
    } else if (scroll.scrollLeft > maxScroll) {
      scroll.scrollLeft = maxScroll
    }
  }

  const handleScroll = () => {
    clampScroll()
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
    let newScrollLeft = scrollLeft - dx // Так правильно для drag

    // Ограничиваем скролл
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

  const handleCardClick = (id: number) => {
    setActiveId(activeId === id ? null : id)
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

        let newScrollLeft = scrollLeftTouch - dx // Так правильно для свайпа

        // Ограничиваем скролл
        const maxScroll = scroll.scrollWidth - scroll.clientWidth
        newScrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll))

        scroll.scrollLeft = newScrollLeft
      }
    }

    const handleTouchEnd = () => {
      if (isSwiping) {
        setTimeout(clampScroll, 0)
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

  useEffect(() => {
    const handleResize = () => {
      clampScroll()
    }
    
    window.addEventListener('resize', handleResize)
    setTimeout(clampScroll, 100)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <section id="testimonials" className="dds-testimonials dds-reveal">
      <div className="dds-testimonials-header">
        <h2 className="dds-testimonials-title">
          Что говорят клиенты
        </h2>
        <p className="dds-testimonials-subtitle">
          Реальные отзывы команд, которые уже используют Снэпбилд для создания контента в едином фирменном стиле
        </p>
      </div>

      <div
        className="dds-testimonials-scroll"
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="dds-testimonials-track">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className={`dds-testimonials-card ${activeId === item.id ? 'dds-testimonials-card--active' : ''}`}
              onClick={() => handleCardClick(item.id)}
            >
              <div className="dds-testimonials-card-rating">
                {renderStars(item.rating)}
              </div>
              <blockquote className="dds-testimonials-card-text">
                "{item.text}"
              </blockquote>
              <div className="dds-testimonials-card-author">
                {item.avatar && (
                  <AppImage
                    className="dds-testimonials-card-avatar"
                    src={item.avatar}
                    alt={item.name}
                  />
                )}
                <div className="dds-testimonials-card-info">
                  <div className="dds-testimonials-card-name">{item.name}</div>
                  <div className="dds-testimonials-card-role">{item.role}, {item.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}