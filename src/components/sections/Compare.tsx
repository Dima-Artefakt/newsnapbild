'use client'

import { useEffect, useRef } from 'react'
import '../../styles/components/compare.css'
import Image from 'next/image'

const compareData = {
  headers: ['Особенности', 'снэпбилд', 'Claude + Figma MCP', 'No-code платформы', 'Cursor', 'Традиционный'],
  rows: [
    { label: 'Time-to-market', values: ['5 минут', '30–60 мин', '2–3 дня', '1–2 дня', '3–5 недель'] },
    { label: 'Дизайн-система', values: ['100% точность', 'Частично, из Figma', 'Шаблоны', 'Вручную в коде', 'Вручную, через ревью'] },
    { label: 'Визуальный редактор', values: ['✅ + ИИ', '—', '✅', '—', '—'] },
    { label: 'Требуемые навыки', values: ['Нет', 'Промпты + код', 'Дизайн', 'Разработка', 'Полная команда'] },
  ],
}

export const Compare = () => {
  const rootRef = useRef<HTMLElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const table = tableRef.current
    if (!root || !table) return

    const sync = () => {
      const tracks = getComputedStyle(table).gridTemplateColumns
      let n = tracks && tracks.trim() && tracks !== 'none'
        ? tracks.trim().split(/\s+/).length
        : 0

      if (!n) {
        const head = root.querySelector('.sds-compare-row--head')
        if (head) n = head.children.length
      }

      if (n) root.style.setProperty('--dds-benefit-cols', String(n))
    }

    sync()

    if (window.MutationObserver) {
      new MutationObserver(sync).observe(table, {
        attributes: true,
        attributeFilter: ['style'],
        childList: true,
        subtree: true
      })
    }

    return () => {
      // cleanup
    }
  }, [])

  return (
    <section id="compare" className="dds-benefit dds-reveal" ref={rootRef}>
      <div className="dds-benefit-header">
        <h2 className="dds-benefit-title">Почему команды выбирают Снэпбилд</h2>
        <p className="dds-benefit-subtitle">Вы получаете не редактор, а результат: готовые маркетинговые материалы без проблем с настройками</p>
      </div>
      <div className="dds-benefit-scroll">
        <div className="sds-compare-table" role="table" ref={tableRef}>
          <div className="sds-compare-brand-border" aria-hidden="true" />
          <div className="sds-compare-row sds-compare-row--head" role="row">
            <div className="sds-compare-cell sds-compare-cell--label">Особенности</div>
            <div className="sds-compare-cell"><span className="sds-compare-brandname">снэпбилд</span></div>
            <div className="sds-compare-cell">Claude + Figma MCP</div>
            <div className="sds-compare-cell sds-compare-cell--narrow">No-code платформы</div>
            <div className="sds-compare-cell">Cursor</div>
            <div className="sds-compare-cell">Традиционный</div>
          </div>
          {compareData.rows.map((row, ri) => (
            <div key={ri} className="sds-compare-row" role="row">
              <div className="sds-compare-cell sds-compare-cell--label">{row.label}</div>
              {row.values.map((val, vi) => (
                <div key={vi} className="sds-compare-cell">
                  {val.includes('✅') ? (
                    <span className="sds-check">
                      <Image  src="/check.svg" alt="✓" width="24" height="24" />
                    </span>
                  ) : val.includes('—') ? (
                    <span>—</span>
                  ) : (
                    <span>{val}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}