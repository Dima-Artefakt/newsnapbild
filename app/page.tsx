'use client'

import { Header } from '@/src/components/common/Header'
import { Footer } from '@/src/components/common/Footer'
import { Hero } from '@/src/components/sections/Hero'
import { Logos } from '@/src/components/sections/Logos'
import { Process } from '@/src/components/sections/Process'
import { UseCases } from '@/src/components/sections/UseCases'
import { Compare } from '@/src/components/sections/Compare'
import { Features } from '@/src/components/sections/Features'
import { Roadmap } from '@/src/components/sections/Roadmap'
import { FAQ } from '@/src/components/sections/FAQ'
import { CTA } from '@/src/components/sections/CTA'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Активация анимаций появления
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    document.querySelectorAll('.dds-reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header />
      <Hero />
      <Logos />
      <Process />
      <UseCases />
      <Compare />
      <Features />
      <Roadmap />
      <FAQ />
      <CTA />
      <Footer />
    </>
  )
}