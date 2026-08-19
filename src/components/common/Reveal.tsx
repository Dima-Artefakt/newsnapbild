'use client'

import { ReactNode, useRef, useState, useEffect } from 'react'

interface RevealProps {
  children: ReactNode
  threshold?: number
}

export const Reveal = ({ children, threshold = 0.12 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      className={`transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  )
}