import { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
}

export const Section = ({ id, children, className = '' }: SectionProps) => (
  <Reveal>
    <section id={id} className={`py-12 md:py-16 lg:py-24 ${className}`}>
      {children}
    </section>
  </Reveal>
)