'use client'

import { useState } from 'react'
import '../../styles/components/faq.css'
import Image from 'next/image'

const faqData = [
  {
    id: 1,
    q: 'Что можно создавать в Снэпбилде?',
    a: 'Все основные форматы маркетинговых материалов — в едином фирменном стиле: Сайты, Изображения, Видео, Баннеры, Презентации. Все создается в рамках вашего бренда — из одной идеи получается полный набор материалов компании.',
  },
  {
    id: 2,
    q: 'Как работает анализ бренда?',
    a: 'Система анализирует существующие интерфейсы, графические материалы и компоненты. Выделяются цветовые схемы, типографика, сетки, отступы и архитектура элементов. На основе этих данных формируется модель дизайн-системы, которая автоматически применяется ко всем новым интерфейсам.',
  },
  {
    id: 3,
    q: 'Можно ли экспортировать решение в существующую инфраструктуру?',
    a: 'Да. Система формирует чистую структуру интерфейса, пригодную для интеграции в текущую среду разработки (React, Vue, Angular, HTML/CSS), интеграции с GitHub, GitLab, CI/CD. Поддерживается прямое подключение к корпоративным системам контроля версий и конвейерам сборки.',
  },
  {
    id: 4,
    q: 'Действительно ли интерфейс полностью соответствует дизайн-системе?',
    a: 'Да. Каждый элемент формируется строго по правилам вашей архитектуры: цвета, типографика, отступы, состояния компонентов. Ручная проверка соответствия не требуется. Контроль встроен на уровне системы.',
  },
  {
    id: 5,
    q: 'В чем отличие от универсальных систем на базе искусственного интеллекта?',
    a: 'Универсальные решения гибкие, но нестабильные в применении бренд-правил. Наша платформа строит интерфейсы в рамках корпоративной архитектуры, с учетом бизнес-логики и требований безопасности. Генерация — управляемая, а не случайная.',
  },
  {
    id: 6,
    q: 'Чем это отличается от конструкторов без программирования?',
    a: 'Конструкторы используют жесткие шаблоны. Здесь применяется компонентная архитектура с гарантированным соблюдением дизайн-системы. Это не набор шаблонов, а управляемая система сборки интерфейсов.',
  },
  {
    id: 7,
    q: 'В чем отличие от популярных AI-инструментов для создания сайтов?',
    a: 'Такие решения ориентированы на скорость и гибкость, но не гарантируют соблюдение корпоративных стандартов: каждая генерация может выглядеть по-новому. Снэпбилд сочетает ту же скорость с автоматическим соблюдением вашей дизайн-системы, интеграцией бизнес-логики и работой в контуре безопасности компании — контроль бренда встроен по умолчанию.',
  },
  {
    id: 8,
    q: 'Возможна ли работа в закрытом корпоративном облаке?',
    a: 'Да. Поддерживается развертывание в изолированной инфраструктуре без доступа к внешней сети. Данные и вычисления остаются внутри вашей корпоративной среды.',
  },
]

export const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(null)
  const toggle = (id: number) => setOpenId(openId === id ? null : id)

  // Разделяем массив на две части
  const mid = Math.ceil(faqData.length / 2)
  const leftCol = faqData.slice(0, mid)
  const rightCol = faqData.slice(mid)

  return (
    <section id="faq" className="dds-accordion dds-reveal">
      <div className="dds-accordion-header">
        <h2 className="dds-accordion-title">Часто задаваемые вопросы</h2>
        <p className="dds-accordion-subtitle">
          Ответы, которые помогут вам принять решение уверенно — без рисков для бренда и безопасности
        </p>
      </div>
      <div className="dds-accordion-list">
        {/* Левая колонка */}
        <div className="dds-accordion-col">
          {leftCol.map((item) => (
            <div key={item.id} className="dds-accordion-item">
              <input
                type="checkbox"
                id={`dds-faq-${item.id}`}
                className="dds-accordion-state"
                checked={openId === item.id}
                onChange={() => toggle(item.id)}
              />
              <label className="dds-accordion-head" htmlFor={`dds-faq-${item.id}`}>
                <p className="dds-accordion-question">{item.q}</p>
                <span className="dds-accordion-icon">
                  <Image  src="/plus-icon.webp" alt="+" width="24" height="24" />
                </span>
              </label>
              <div className="dds-accordion-panel">
                <p className="dds-accordion-answer">{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Правая колонка */}
        <div className="dds-accordion-col">
          {rightCol.map((item) => (
            <div key={item.id} className="dds-accordion-item">
              <input
                type="checkbox"
                id={`dds-faq-${item.id}`}
                className="dds-accordion-state"
                checked={openId === item.id}
                onChange={() => toggle(item.id)}
              />
              <label className="dds-accordion-head" htmlFor={`dds-faq-${item.id}`}>
                <p className="dds-accordion-question">{item.q}</p>
                <span className="dds-accordion-icon">
                  <Image  src="/plus-icon.webp" alt="+" width="24" height="24" />
                </span>
              </label>
              <div className="dds-accordion-panel">
                <p className="dds-accordion-answer">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}