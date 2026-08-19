'use client'

import { useRef, useState, useEffect, RefObject } from 'react'

interface UseScrollRevealReturn {
  ref: RefObject<HTMLDivElement | null>
  isVisible: boolean
}

export const useScrollReveal = (threshold = 0.12): UseScrollRevealReturn => {
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

  return { ref, isVisible }
}