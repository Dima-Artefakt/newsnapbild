'use client'

import '../../styles/components/Integrations.css'

const integrations = [
  {
    id: 1,
    name: 'Figma',
    logo: '🎨',
    description: 'Синхронизация дизайн-системы',
  },
  {
    id: 2,
    name: 'Adobe Creative Cloud',
    logo: '🖌️',
    description: 'Экспорт в Photoshop, Illustrator',
  },
  {
    id: 3,
    name: 'Slack',
    logo: '💬',
    description: 'Уведомления и утверждение',
  },
  {
    id: 4,
    name: 'Trello',
    logo: '📋',
    description: 'Управление задачами',
  },
  {
    id: 5,
    name: 'Google Drive',
    logo: '☁️',
    description: 'Хранение и обмен файлами',
  },
  {
    id: 6,
    name: 'Telegram',
    logo: '✈️',
    description: 'Публикация в мессенджерах',
  },
  {
    id: 7,
    name: 'Notion',
    logo: '📝',
    description: 'Документация и wiki',
  },
  {
    id: 8,
    name: 'Webflow',
    logo: '🌐',
    description: 'Публикация на сайтах',
  },
]

export const Integrations = () => {
  return (
    <section className="dds-integrations dds-reveal" id="integrations">
      <h2 className="dds-integrations-section-title">
        Работает с вашими <br />любимыми инструментами
      </h2>
      <p className="dds-integrations-subtitle">
        Снэпбилд легко интегрируется с экосистемой ваших продуктов — 
        подключайте уже готовые решения и экономьте время
      </p>
      <div className="dds-integrations-grid">
        {integrations.map((item) => (
          <div key={item.id} className="dds-integrations-card">
            <div className="dds-integrations-card-content">
              <span className="dds-integrations-card-icon">{item.logo}</span>
              <div>
                <h3 className="dds-integrations-card-name">{item.name}</h3>
                <p className="dds-integrations-card-description">{item.description}</p>
              </div>
            </div>
            <span className="dds-integrations-card-status">✓</span>
          </div>
        ))}
      </div>
      <div className="dds-integrations-bottom">
        <p className="dds-integrations-bottom-text">
          Не нашли свой инструмент? <a href="#" className="dds-integrations-link">Предложите интеграцию</a>
        </p>
        <div className="dds-integrations-bottom-tags">
          <span className="dds-integrations-tag">REST API</span>
          <span className="dds-integrations-tag">Webhooks</span>
          <span className="dds-integrations-tag">OpenAPI</span>
        </div>
      </div>
    </section>
  )
}