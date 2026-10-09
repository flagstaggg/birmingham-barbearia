import { useEffect, useRef } from 'react'
import { initSmoothScroll, destroySmoothScroll } from '../lib/smoothScroll'

/**
 * Ativa o scroll suave (Lenis) ao montar a aplicação.
 * Lenis é desativado automaticamente quando o usuário prefere menos movimento.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const cleanup = initSmoothScroll()
    return () => {
      cleanup?.()
      destroySmoothScroll()
    }
  }, [])
}

/** Mantém a referência da âncora atual com base na posição do scroll. */
export function useScrollToTopOnMount() {
  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current && window.scrollY > 0) window.scrollTo(0, 0)
    mounted.current = true
  }, [])
}
