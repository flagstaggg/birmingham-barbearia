import { useEffect, useState } from 'react'

/**
 * Indica se a página já foi rolada além de `threshold` pixels.
 * Usado pelo header (para ganhar fundo) e pelo botão flutuante do WhatsApp.
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
