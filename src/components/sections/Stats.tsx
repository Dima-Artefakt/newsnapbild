'use client'

import { useState, useEffect } from 'react'
import '../../styles/components/stats.css'

const stats = [
  {
    id: 1,
    value: 15000,
    label: 'Активных пользователей',
    suffix: '+',
    icon: '👥',
  },
  {
    id: 2,
    value: 250000,
    label: 'Материалов создано',
    suffix: '+',
    icon: '📄',
  },
  {
    id: 3,
    value: 85,
    label: 'Стран используют',
    suffix: '',
    icon: '🌍',
  },
  {
    id: 4,
    value: 94,
    label: 'Удовлетворённость клиентов',
    suffix: '%',
    icon: '⭐',
  },
  {
    id: 5,
    value: 12,
    label: 'Среднее время от сообщения до решения',
    suffix: ' мин',
    icon: '⚡',
  },
  {
    id: 6,
    value: 98,
    label: 'Сохранение времени на контент',
    suffix: '%',
    icon: '🚀',
  },
]

export const Stats = () => {
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((stat, index) => {
              let start = 0
              const end = stat.value
              const duration = 2000
              const increment = Math.ceil(end / (duration / 16))

              const timer = setInterval(() => {
                start += increment
                if (start >= end) {
                  setCounts((prev) => {
                    const newCounts = [...prev]
                    newCounts[index] = end
                    return newCounts
                  })
                  clearInterval(timer)
                } else {
                  setCounts((prev) => {
                    const newCounts = [...prev]
                    newCounts[index] = start
                    return newCounts
                  })
                }
              }, 16)
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    const section = document.querySelector('.dds-stats')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num
  }

  return (
    <section id="stats" className="dds-stats dds-reveal">
      <h2 className="dds-stats-section-title">
        Снэпбилд в цифрах
      </h2>
      <div className="dds-stats-grid">
        {stats.map((stat, index) => (
          <div key={stat.id} className="dds-stats-card">
            <div className="dds-stats-card-icon">{stat.icon}</div>
            <div className="dds-stats-card-value">
              {formatNumber(counts[index])}
              {stat.suffix}
            </div>
            <div className="dds-stats-card-label">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="dds-stats-bottom">
        <div className="dds-stats-bottom-item">
          <span className="dds-stats-bottom-value">4.9/5</span>
          <span className="dds-stats-bottom-label">Средний рейтинг</span>
          <div className="dds-stats-bottom-stars">
            {'★'.repeat(5)}
          </div>
        </div>
        <div className="dds-stats-bottom-item">
          <span className="dds-stats-bottom-value">500+</span>
          <span className="dds-stats-bottom-label">Компаний доверяют</span>
        </div>
        <div className="dds-stats-bottom-item">
          <span className="dds-stats-bottom-value">24/7</span>
          <span className="dds-stats-bottom-label">Поддержка</span>
        </div>
      </div>
    </section>
  )
}