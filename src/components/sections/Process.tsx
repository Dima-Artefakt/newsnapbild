'use client'

const steps = [
  {
    image: '/84a4450b3827bc21.webp',
    name: 'Дизайн-система - ядро платформы',
    desc: 'Ваши компоненты, цвета и шрифты - единственный источник стиля',
    descMobile: 'Ваши компоненты, цвета и шрифты — единственный источник стиля',
  },
  {
    image: '/process-flexible-configuration.webp',
    name: 'Гибкая конфигурация',
    desc: 'Правила бренда задаются один раз — работают в каждой генерации',
    descMobile: 'Правила бренда задаются один раз — работают в каждой генерации',
  },
  {
    image: '/afe03eb4a67d5dfb.webp',
    name: 'Соответствие по умолчанию',
    desc: 'AI не может нарушить бренд: сайты, изображения, видео, баннеры и презентации — строго по вашим правилам',
    descMobile: 'AI не может нарушить бренд: сайты, изображения, видео, баннеры и презентации — строго по вашим правилам',
  },
]

export const Process = () => (
  <section id="process" className="dds-steps dds-reveal">
    <div className="dds-steps-header">
      <h2 className="dds-steps-title">
        <span className="dds-steps-wide">Одна платформа — весь маркетинг</span>
        <span className="dds-steps-narrow">Одна платформа —<br />весь маркетинг</span>
      </h2>
      <p className="dds-steps-subtitle">Сайты, изображения, видео, баннеры и презентации — из одной идеи, в вашем стиле</p>
    </div>
    <div className="dds-steps-grid">
      {steps.map((step, i) => (
        <article key={i} className="dds-steps-card">
          <img src={step.image} className="dds-steps-media" alt={step.name} />
          <div className="dds-steps-overlay">
            <div className="dds-steps-copy">
              <h3 className="dds-steps-name">{step.name}</h3>
              <p className="dds-steps-desc">
                <span className="dds-steps-wide">{step.desc}</span>
                <span className="dds-steps-narrow">{step.descMobile}</span>
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
)