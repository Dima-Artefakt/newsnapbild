import '../../styles/components/features.css'
import Image from 'next/image'

export const Features = () => (
  <section id="features" className="dds-why-safe dds-reveal">
    <h2 className="dds-why-safe-section-title">Безопасность без компромиссов</h2>
    <div className="dds-why-safe-points">
      <div className="dds-why-safe-point">
        <picture className="dds-why-safe-image">
          <Image  src="/security-approved-models.webp" alt="Только одобренные модели" />
        </picture>
        <div className="dds-why-safe-point-text">
          <h3 className="dds-why-safe-point-title">Только одобренные модели</h3>
          <p className="dds-why-safe-point-desc">Работаем только с российскими и локализованными моделями, без экспортных ограничений</p>
        </div>
      </div>
      <div className="dds-why-safe-point">
        <picture className="dds-why-safe-image">
          <Image  src="/security-private-cloud.webp" alt="Ваш контур, ваша юрисдикция" />
        </picture>
        <div className="dds-why-safe-point-text">
          <h3 className="dds-why-safe-point-title">Ваш контур, ваша юрисдикция</h3>
          <p className="dds-why-safe-point-desc">Развертывание в частном облаке с полным соответствием 152-ФЗ и внутренними ИБ-требованиями</p>
        </div>
      </div>
      <div className="dds-why-safe-point">
        <picture className="dds-why-safe-image">
          <Image  src="/security-ai-stack.webp" alt="Собственный AI-стек" />
        </picture>
        <div className="dds-why-safe-point-text">
          <h3 className="dds-why-safe-point-title">Собственный AI-стек</h3>
          <p className="dds-why-safe-point-desc">Вы сами определяете модели, хранилища, доступы и цепочки валидации</p>
        </div>
      </div>
    </div>
  </section>
)