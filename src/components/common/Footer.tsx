import Image from 'next/image'

export const Footer = () => (
  <footer className="dds-footer">
    <div className="dds-footer-top">
      <div className="dds-footer-brand">
        <a className="dds-footer-logo" href="/" aria-label="Снэпбилд">
          <Image src="/logo.svg" alt="Снэпбилд" width="153" height="22" />
        </a>
        <p className="dds-footer-tagline">
          Платформа, где все создается в рамках вашего бренда и дизайн-системы
        </p>
      </div>
      <nav className="dds-footer-links" aria-label="Подвал">
        <div className="dds-footer-col">
          <p className="dds-footer-col-title">Навигация</p>
          <div className="dds-footer-list">
            <a className="dds-footer-link" href="#process">Продукт</a>
            <a className="dds-footer-link" href="#use-cases">Возможности</a>
            <a className="dds-footer-link" href="#compare">Преимущества</a>
            <a className="dds-footer-link" href="#features">Безопасность</a>
            <a className="dds-footer-link" href="#roadmap">Роадмап</a>
            <a className="dds-footer-link" href="#faq">Частые вопросы</a>
          </div>
        </div>
        <div className="dds-footer-col">
          <p className="dds-footer-col-title">Документация</p>
          <div className="dds-footer-list">
            <a className="dds-footer-link" href="/privacy">Политика конфиденциальности</a>
            <a className="dds-footer-link" href="#faq">FAQ</a>
          </div>
        </div>
        <div className="dds-footer-col">
          <p className="dds-footer-col-title">Контакты</p>
          <div className="dds-footer-list">
            <a className="dds-footer-link" href="https://t.me/ochen_darya" target="_blank" rel="noopener noreferrer">Запросить демо</a>
            <a className="dds-footer-link" href="https://t.me/snapbuild" target="_blank" rel="noopener noreferrer">Telegram</a>
            <a className="dds-footer-link dds-footer-email-mobile" href="mailto:hey@snapbuild.ru">hey@snapbuild.ru</a>
          </div>
        </div>
      </nav>
    </div>
    <div className="dds-footer-legal">
      <p className="dds-footer-copyright">© Сгенерировано в Снэпбилде. Все права защищены.</p>
      <a href="mailto:hey@snapbuild.ru">hey@snapbuild.ru</a>
    </div>
  </footer>
)