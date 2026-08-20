'use client'

import { useState, useEffect, useRef } from 'react'
import '../../styles/components/use-cases.css'
import { AppImage } from '@/src/components/AppImage'

const tabs = ['Сайты', 'Изображения', 'Видео', 'Баннеры', 'Презентации']

const tabFileNames: Record<string, string> = {
  'Сайты': 'tab1',
  'Изображения': 'tab2',
  'Видео': 'tab3',
  'Баннеры': 'tab4',
  'Презентации': 'tab5',
}

const itemsData: Record<string, { title: string; desc: string }[]> = {
  'Сайты': [
    { title: 'Результат за один запрос', desc: 'Отправляйте документ или ссылку на описание продукта — платформа собирает структуру' },
    { title: 'Страница за минуту', desc: 'В вашей дизайн-системе, с вашими шрифтами, сеткой и компонентами' },
    { title: 'AI или визуальный редактор', desc: 'Меняйте контент через чат или редактируйте вручную' },
    { title: 'Адаптация под ЦА за один клик', desc: 'Версия сайта под новый сегмент без работы дизайнеров и копирайтеров' },
  ],
  'Изображения': [
    { title: 'В стиле и цвете бренда', desc: 'Изображения по композиционным правилам вашей дизайн-системы' },
    { title: 'Попадание с первой генерации', desc: 'Без часов промптинга и поиска на стоках' },
    { title: 'Редактирование объектов', desc: 'Меняйте композицию и удаляйте элементы прямо на изображении' },
    { title: 'Любой стиль и формат', desc: 'Портреты, иллюстрации, обложки — в нужном соотношении, до 4K' },
  ],
  'Видео': [
    { title: 'Изображения как ключевые кадры', desc: 'Используйте графику из модуля изображений напрямую' },
    { title: 'Контроль качества и формата', desc: 'Длительность, соотношение, качество — под площадку' },
    { title: 'Сохранение стиля и композиции', desc: 'AI удерживает визуальную целостность ролика' },
    { title: 'Один сценарий — десятки адаптаций', desc: 'Версии под популярные форматы соцсетей и рекламные площадки' },
  ],
  'Баннеры': [
    { title: 'Креативы из одной идеи', desc: 'Готовые баннеры в фирменном стиле для любой кампании' },
    { title: 'Все размеры автоматически', desc: 'Выбирайте готовые размеры для популярных площадок или задавайте собственные' },
    { title: 'Текст и графика под контролем', desc: 'Редактируйте оффер, композицию и визуальные акценты' },
    { title: 'Экспорт под площадку', desc: 'Форматы и вес файлов соответствуют требованиям размещения' },
  ],
  'Презентации': [
    { title: 'Презентация из запроса', desc: 'Платформа собирает структуру и черновик слайдов' },
    { title: 'В вашей дизайн-системе', desc: 'Шрифты, сетки и компоненты применяются автоматически' },
    { title: 'Редактирование через AI', desc: 'Меняйте отдельный слайд или всю историю через чат' },
    { title: 'Экспорт в нужном формате', desc: 'Собирайте презентации для встречи, рассылки или публикации' },
  ],
}

export const UseCases = () => {
  const [activeTab, setActiveTab] = useState('Видео')
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const totalTabs = tabs.length
  const totalItems = 4
  const currentItems = itemsData[activeTab] || itemsData['Видео']

  useEffect(() => {
    const startAutoplay = () => {
      let tabIndex = tabs.indexOf(activeTab)
      let pointIndex = activeIndex
      let progressValue = 0

      const interval = setInterval(() => {
        progressValue += 1
        setProgress(progressValue / 100)

        if (progressValue >= 100) {
          progressValue = 0
          pointIndex += 1

          if (pointIndex >= totalItems) {
            pointIndex = 0
            tabIndex = (tabIndex + 1) % totalTabs
            setActiveTab(tabs[tabIndex])
          }

          setActiveIndex(pointIndex)
          setProgress(0)
        }
      }, 80)

      return interval
    }

    autoplayRef.current = startAutoplay()

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [activeTab, activeIndex, totalTabs, totalItems])

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    let startX = 0
    let startY = 0
    let axis: string | null = null
    let swiped = false
    let swipeAnimTimer: NodeJS.Timeout | null = null

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) {
        axis = 'off'
        return
      }
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      axis = null
      swiped = false
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (axis !== null || e.touches.length !== 1) return
      const dx = e.touches[0].clientX - startX
      const dy = e.touches[0].clientY - startY
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (axis !== 'x') return
      const dx = e.changedTouches[0].clientX - startX
      if (Math.abs(dx) < 40) return

      swiped = true
      const direction = dx < 0 ? 1 : -1
      panel.setAttribute('data-swipe', dx < 0 ? 'next' : 'prev')

      const total = totalTabs * totalItems
      const flat = tabs.indexOf(activeTab) * totalItems + activeIndex + direction
      const newFlat = ((flat % total) + total) % total
      const newTabIndex = Math.floor(newFlat / totalItems)
      const newPointIndex = newFlat % totalItems

      setActiveTab(tabs[newTabIndex])
      setActiveIndex(newPointIndex)
      setProgress(0)

      if (swipeAnimTimer) clearTimeout(swipeAnimTimer)
      swipeAnimTimer = setTimeout(() => {
        panel.removeAttribute('data-swipe')
      }, 280)
    }

    const handleClick = (e: MouseEvent) => {
      if (swiped) {
        e.preventDefault()
        e.stopPropagation()
        swiped = false
      }
    }

    panel.addEventListener('touchstart', handleTouchStart, { passive: true })
    panel.addEventListener('touchmove', handleTouchMove, { passive: true })
    panel.addEventListener('touchend', handleTouchEnd, { passive: true })
    panel.addEventListener('click', handleClick, true)

    return () => {
      panel.removeEventListener('touchstart', handleTouchStart)
      panel.removeEventListener('touchmove', handleTouchMove)
      panel.removeEventListener('touchend', handleTouchEnd)
      panel.removeEventListener('click', handleClick)
    }
  }, [activeTab, activeIndex, totalTabs, totalItems])

  return (
    <section id="use-cases" className="dds-tabs dds-reveal">
      <input type="radio" name="uc-tabs" id="uc-tab-1" className="dds-tabs-radio" />
      <input type="radio" name="uc-tabs" id="uc-tab-2" className="dds-tabs-radio" />
      <input type="radio" name="uc-tabs" id="uc-tab-3" className="dds-tabs-radio" defaultChecked />
      <input type="radio" name="uc-tabs" id="uc-tab-4" className="dds-tabs-radio" />
      <input type="radio" name="uc-tabs" id="uc-tab-5" className="dds-tabs-radio" />
      
      <div className="dds-tabs-inner">
        <div className="dds-tabs-header">
          <h2 className="dds-tabs-title">
            <span className="dds-tabs-wide">Любой контент в фирменном стиле за считанные минуты</span>
            <span className="dds-tabs-narrow">Любой контент в фирменном стиле за считанные минуты</span>
          </h2>
          <div className="dds-tabs-group" role="tablist">
            {tabs.map((tab, i) => {
              const isActive = activeTab === tab
              return (
                <label
                  key={i}
                  className={`dds-tabs-tab ${isActive ? 'dds-tabs-tab--active' : ''}`}
                  onClick={() => {
                    setActiveTab(tab)
                    setActiveIndex(0)
                    setProgress(0)
                  }}
                > {tab}
                </label>
              )
            })}
          </div>
        </div>
        
        <div className="dds-tabs-body">
          <div className="dds-tabs-points">
            {Object.entries(itemsData).map(([tabName, items], groupIdx) => {
              const isActiveTab = activeTab === tabName
              return (
                <div
                  key={groupIdx}
                  className={`dds-tabs-points-set ${isActiveTab ? 'dds-tabs-points-set--active' : ''}`}
                  style={{ display: isActiveTab ? 'flex' : 'none' }}
                >
                  {items.map((item, i) => {
                    const isActive = isActiveTab && activeIndex === i
                    return (
                      <article
                        key={i}
                        className={`dds-tabs-card ${isActive ? 'dds-tabs-card--active' : ''}`}
                        onClick={() => {
                          setActiveTab(tabName)
                          setActiveIndex(i)
                          setProgress(0)
                        }}
                      >
                        <h3 className="dds-tabs-card-title">{item.title}</h3>
                        <p className="dds-tabs-card-desc"><span>{item.desc}</span></p>
                        <div className="dds-tabs-card-progress">
                          <div
                            className="dds-tabs-card-progress-fill"
                            style={{
                              transform: isActive ? `scaleX(${progress})` : 'scaleX(0)'
                            }}
                          />
                        </div>
                      </article>
                    )
                  })}
                </div>
              )
            })}
          </div>

          <div className="dds-tabs-panel" ref={panelRef}>
            {currentItems.map((item, i) => {
              const isActive = activeIndex === i
              const filePrefix = tabFileNames[activeTab] || `tab${tabs.indexOf(activeTab) + 1}`
              const imagePath = `/use-cases-${filePrefix}-item${i + 1}.webp`
              
              return (
                <AppImage
                  key={i}
                  className={`dds-tabs-media dds-tabs-media--${filePrefix}-item${i + 1} ${isActive ? 'dds-tabs-media--active' : ''}`}
                  src={imagePath}
                  alt={item.title}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}