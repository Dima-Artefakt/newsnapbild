'use client'

import { useEffect, useRef, useState } from 'react'

const roadmapItems = [
  { title: 'Сайты за 5 минут', date: 'Декабрь, 2025', desc: 'Генерация корпоративных сайтов по вашей дизайн-системе — 100% консистентность, без разработчиков' },
  { title: 'Консистентные AI-иллюстрации', date: 'Январь, 2026', desc: 'Настраиваете фирменный стиль один раз — графика для каждой секции сайта в едином виде через стилевые пресеты' },
  { title: 'Дизайн-система из вашего сайта', date: 'Февраль, 2026', desc: 'Сканируем существующие страницы и собираем из них готовую дизайн-систему; AI сам выстраивает структуру' },
  { title: 'Режим изображений', date: 'Март, 2026', desc: 'Брендовая графика в один клик: управление стилями и темами, десятки параметров редактирования' },
  { title: 'Генерация видео', date: 'Апрель, 2026', desc: 'Видео из ваших изображений с ключевыми кадрами; AI точнее на 78%, панель рассуждений и управление правами' },
  { title: 'Ресайзы изображений', date: 'Май, 2026', desc: 'Одна фокус-точка → все форматы (16:9, 9:16, 1:1 и другие) с автоматическим бюджетом веса на экспорт' },
  { title: 'Расширенный редактор, как в Figma', date: 'Июнь, 2026', desc: 'Слои, изменение размеров любого контейнера, превью структуры в чате, версии промптов и ветвление диалогов' },
  { title: 'Канвас, баннеры и презентации', date: 'Июль, 2026', desc: 'Канвас во всех режимах; новые режимы — генерация рекламных баннеров и корпоративных презентаций' },
  { title: 'ИИ-маркетолог', date: 'Август, 2026', desc: 'Следит за данными, сам обновляет ваши материалы и собирает кампанию целиком — от изображений до сайта' },
  { title: 'Компонентный подход', date: 'Сентябрь, 2026', desc: 'AI сам компонует секции сайтов из элементов вашей дизайн-библиотеки' },
  { title: 'Предиктивные рекомендации', date: 'Октябрь, 2026', desc: 'Платформа сама предлагает, что обновить в кампаниях — от секций сайта до баннеров' },
  { title: 'Инфраструктура', date: 'Ноябрь, 2026', desc: 'Развертывание в вашей сети и контуре' },
]

export const Roadmap = () => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startLeft, setStartLeft] = useState(0)

  const progress = (9 / roadmapItems.length) * 100

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    let dragging = false
    let startXLocal = 0
    let startLeftLocal = 0

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      dragging = true
      startXLocal = event.pageX
      startLeftLocal = scroller.scrollLeft
      scroller.classList.add('is-dragging')
      event.preventDefault()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return
      scroller.scrollLeft = startLeftLocal - (event.pageX - startXLocal)
    }

    const onPointerUp = () => {
      if (!dragging) return
      dragging = false
      scroller.classList.remove('is-dragging')
    }

    scroller.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
    window.addEventListener('blur', onPointerUp)

    return () => {
      scroller.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      window.removeEventListener('blur', onPointerUp)
    }
  }, [])

  return (
    <section id="roadmap" className="dds-rmap dds-reveal">
      <div className="dds-rmap-header">
        <h2 className="dds-rmap-title">Каждый день — новый релиз</h2>
        <p className="dds-rmap-subtitle">Приоритизируем бэклог для ваших целей</p>
      </div>
      <div className="dds-rmap-scroller" ref={scrollerRef}>
        <div className="dds-rmap-track" style={{ '--dds-rmap-progress': progress } as React.CSSProperties}>
          {roadmapItems.map((item, i) => (
            <article key={i} className={`dds-rmap-item ${i < 9 ? 'is-reached' : ''}`}>
              <span className="dds-rmap-dot">
                <span className="dds-rmap-dot-halo" />
                <span className="dds-rmap-dot-core" />
              </span>
              <div className="dds-rmap-body">
                <h3 className="dds-rmap-name">{item.title}</h3>
                <p className="dds-rmap-desc">{item.desc}</p>
                <p className="dds-rmap-date">{item.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}