import Lenis from 'lenis'

/**
 * Scroll suave com Lenis (instância única compartilhada por todo o site).
 * A navegação por âncoras usa `scrollToSection`, que respeita o Lenis quando
 * ele está ativo e cai para o scroll nativo caso contrário.
 */

let lenis = null
let rafId = null

// Altura do header fixo, usada como compensação nas âncoras.
export const SCROLL_OFFSET = 84

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Inicia o Lenis. Não faz nada se o usuário pedir menos movimento. */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return () => {}

  lenis = new Lenis({
    duration: 1.15, // rolagem lenta e elegante
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
  })

  const raf = (time) => {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  return destroySmoothScroll
}

export function destroySmoothScroll() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = null
  lenis?.destroy()
  lenis = null
}

/** Rola até uma seção (por id, ex.: '#sobre'). */
export function scrollToSection(id) {
  const element = document.querySelector(id)
  if (!element) return

  if (lenis) {
    // offset: 0 — o Lenis já desconta o `scroll-padding-top` definido no CSS,
    // que por sua vez equivale à altura do header. Passar o offset aqui
    // duplicaria a compensação.
    lenis.scrollTo(element, { duration: 1.4 })
    return
  }

  // Fallback: scroll nativo do navegador.
  const top = element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

/** Trava/destrava o scroll (usado pelo menu mobile em tela cheia). */
export function lockScroll(locked) {
  const html = document.documentElement
  if (locked) {
    lenis?.stop()
    html.classList.add('overflow-hidden')
  } else {
    lenis?.start()
    html.classList.remove('overflow-hidden')
  }
}
