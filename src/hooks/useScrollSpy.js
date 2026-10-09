import { useEffect, useState } from 'react'
import { navLinks } from '../data/siteData'

/**
 * Destaca o item de menu da seção atualmente visível.
 * Usa IntersectionObserver para não pesar na thread principal.
 */
export function useScrollSpy() {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // A seção mais visível no topo da viewport é a ativa.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveId(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return activeId
}
