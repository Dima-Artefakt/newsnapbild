'use client'

import { useState } from 'react'
import '../../styles/components/сontact.css'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const reasons = [
  { value: 'question', label: 'Задать вопрос' },
  { value: 'demo', label: 'Запросить демо' },
  { value: 'support', label: 'Техническая поддержка' },
  { value: 'feedback', label: 'Оставить отзыв' },
  { value: 'partnership', label: 'Сотрудничество' },
]

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: 'question',
    message: '',
    agree: false,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handlePhoneChange = (value: string | undefined) => {
    setFormData(prev => ({
      ...prev,
      phone: value || '',
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        reason: 'question',
        message: '',
        agree: false,
      })
    }, 1500)
  }

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'support@snapbuild.com',
      link: 'mailto:support@snapbuild.com',
    },
    {
      icon: '📞',
      title: 'Телефон',
      value: '+7 (999) 123-45-67',
      link: 'tel:+79991234567',
    },
    {
      icon: '💬',
      title: 'Telegram',
      value: '@snapbuild_support',
      link: 'https://t.me/snapbuild',
    },
  ]

  return (
    <section className="dds-contact dds-reveal" id="contact">
      <h2 className="dds-contact-section-title">
        Остались вопросы? <br />Мы ответим
      </h2>
      <div className="dds-contact-grid">
        {/* Левая колонка — контактная информация */}
        <div className="dds-contact-info">
          <p className="dds-contact-info-text">
            Заполните форму, и наш менеджер свяжется с вами 
            в ближайшее время. Мы всегда рады помочь!
          </p>

          <div className="dds-contact-info-items">
            {contactInfo.map((item) => (
              <a
                key={item.title}
                href={item.link}
                className="dds-contact-info-item"
                target={item.title === 'Telegram' ? '_blank' : undefined}
                rel={item.title === 'Telegram' ? 'noopener noreferrer' : undefined}
              >
                <div className="dds-contact-info-item-icon">
                  {item.icon}
                </div>
                <div>
                  <div className="dds-contact-info-item-label">{item.title}</div>
                  <div className="dds-contact-info-item-value">{item.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Правая колонка — форма */}
        <div className="dds-contact-form-wrapper">
          {isSubmitted ? (
            <div className="dds-contact-success">
              <div className="dds-contact-success-icon">✅</div>
              <h3 className="dds-contact-success-title">Сообщение отправлено!</h3>
              <p className="dds-contact-success-text">
                Спасибо! Наш менеджер свяжется с вами в ближайшее время.
              </p>
              <button 
                className="dds-contact-success-btn"
                onClick={() => setIsSubmitted(false)}
              >
                Отправить ещё
              </button>
            </div>
          ) : (
            <form className="dds-contact-form" onSubmit={handleSubmit}>
              <div className="dds-contact-form-row">
                <div className="dds-contact-form-group">
                  <label className="dds-contact-form-label">Ваше имя *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="dds-contact-form-input"
                    placeholder="Иван Иванов"
                    required
                  />
                </div>
                <div className="dds-contact-form-group">
                  <label className="dds-contact-form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="dds-contact-form-input"
                    placeholder="ivan@example.com"
                    required
                  />
                </div>
              </div>

              <div className="dds-contact-form-group">
                <label className="dds-contact-form-label">Телефон</label>
                <PhoneInput
                  international
                  defaultCountry="RU"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="dds-contact-form-phone"
                  placeholder="Введите номер телефона"
                />
              </div>

              <div className="dds-contact-form-group dds-contact-form-group--full">
                <label className="dds-contact-form-label">Сообщение *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="dds-contact-form-textarea"
                  placeholder="Расскажите, чем мы можем вам помочь..."
                  rows={4}
                  required
                />
              </div>

              <div className="dds-contact-form-checkbox">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  id="agree"
                  required
                />
                <label htmlFor="agree" className="dds-contact-form-checkbox-label">
                  Я соглашаюсь с <a href="#" className="dds-contact-link">условиями обработки данных</a>
                </label>
              </div>

              <button
                type="submit"
                className="dds-contact-form-submit"
                disabled={isLoading}
              >
                {isLoading ? 'Отправка...' : 'Отправить сообщение →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}