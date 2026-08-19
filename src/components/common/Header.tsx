'use client'

import { useState, useEffect, useRef } from 'react'

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const menuToggleRef = useRef<HTMLInputElement>(null)
  const menuButtonRef = useRef<HTMLLabelElement>(null)
  const menuRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 1023px)').matches)
    }
    
    checkMobile()
    const mediaQuery = window.matchMedia('(max-width: 1023px)')
    mediaQuery.addEventListener('change', checkMobile)
    
    return () => mediaQuery.removeEventListener('change', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const menuToggle = menuToggleRef.current
    const menuButton = menuButtonRef.current
    const menu = menuRef.current

    if (!menuToggle || !menuButton || !menu) return

    const menuItems = () => Array.from(menu.querySelectorAll('a[href]'))

    const syncMenu = ({ focusFirst = false, restoreFocus = false } = {}) => {
      const isOpen = isMobile && menuToggle.checked
      document.documentElement.classList.toggle('dds-menu-open', isOpen)
      menuButton.setAttribute('aria-expanded', String(isOpen))
      menuButton.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню')
      menu.setAttribute('aria-hidden', String(!isOpen))

      if (isOpen && focusFirst) {
        requestAnimationFrame(() => (menuItems() as HTMLElement[])[0]?.focus())
      } else if (!isOpen && restoreFocus) {
        menuButton.focus()
      }
    }

    const handleChange = () => {
      syncMenu({ focusFirst: menuToggle.checked })
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault()
      menuToggle.checked = !menuToggle.checked
      syncMenu({ focusFirst: menuToggle.checked, restoreFocus: !menuToggle.checked })
    }

    const handleMenuClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('a')) return
      menuToggle.checked = false
      syncMenu()
    }

    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (!menuToggle.checked || !isMobile) return

      if (event.key === 'Escape') {
        event.preventDefault()
        menuToggle.checked = false
        syncMenu({ restoreFocus: true })
        return
      }

       if (event.key !== 'Tab') return
      const focusable = [menuButton, ...menuItems()]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        ;(last as HTMLElement)?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        ;(first as HTMLElement)?.focus()
      }
    }

    menuToggle.addEventListener('change', handleChange)
    menuButton.addEventListener('keydown', handleKeyDown)
    menu.addEventListener('click', handleMenuClick)
    document.addEventListener('keydown', handleDocumentKeyDown)

    syncMenu()

    return () => {
      menuToggle.removeEventListener('change', handleChange)
      menuButton.removeEventListener('keydown', handleKeyDown)
      menu.removeEventListener('click', handleMenuClick)
      document.removeEventListener('keydown', handleDocumentKeyDown)
    }
  }, [isMobile])

  return (
    <header id="header" className={`dds-header ${scrolled ? 'is-scrolled' : ''}`}>
      <input
        className="dds-main-toggle"
        id="dds-main-toggle"
        type="checkbox"
        aria-hidden="true"
        ref={menuToggleRef}
      />
      <div className="dds-main-bar">
        <a className="dds-main-logo" href="/" aria-label="Снэпбилд">
          <img src="/logo.svg" alt="Снэпбилд" width="153" height="22" />
        </a>
        <nav className="dds-main-nav" aria-label="Основная навигация">
          <a className="dds-main-link" href="#process"><span>Продукт</span></a>
          <a className="dds-main-link" href="#use-cases"><span>Возможности</span></a>
          <a className="dds-main-link" href="#features"><span>Безопасность</span></a>
          <a className="dds-main-link" href="#faq"><span>FAQ</span></a>
          <a className="dds-main-link" href="#testimonials"><span>Отзывы</span></a>
        </nav>
        <div className="dds-main-actions">
          <a className="dds-btn dds-btn--l dds-btn--secondary dds-main-demo" href="https://builder.snapbuild.ru/">
            <span>Начать сейчас</span>
          </a>
          <label
            className="dds-main-burger"
            htmlFor="dds-main-toggle"
            role="button"
            tabIndex={0}
            aria-controls="dds-main-menu"
            aria-expanded="false"
            aria-label="Открыть меню"
            ref={menuButtonRef}
          >
            <span className="dds-main-burger-icon" />
          </label>
        </div>
      </div>
      <nav className="dds-main-menu" id="dds-main-menu" aria-label="Мобильная навигация" aria-hidden="true" ref={menuRef}>
        <a className="dds-main-menu-link" href="#use-cases"><span>Возможности</span></a>
        <a className="dds-main-menu-link" href="#process"><span>Продукт</span></a>
        <a className="dds-main-menu-link" href="#features"><span>Безопасность</span></a>
        <a className="dds-main-menu-link" href="#faq"><span>FAQ</span></a>
        <a className="dds-btn dds-btn--l dds-btn--secondary" href="https://builder.snapbuild.ru/">
          <span>Начать сейчас</span>
        </a>
      </nav>
    </header>
  )
}