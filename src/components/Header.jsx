import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import Logo from './Logo'
import Button from './Button'
import { navLinks, business } from '../data/siteData'
import { scrollToSection, lockScroll } from '../lib/smoothScroll'
import { useScrolled } from '../hooks/useScrolled'
import { useScrollSpy } from '../hooks/useScrollSpy'

/**
 * Header fixo: transparente no topo, ganha fundo escuro com blur ao rolar.
 * Menu âncoras no desktop + menu em tela cheia no mobile.
 */
export default function Header() {
  const scrolled = useScrolled(40)
  const activeId = useScrollSpy()
  const [menuOpen, setMenuOpen] = useState(false)
  const [pendingAnchor, setPendingAnchor] = useState(null)
  const reduceMotion = useReducedMotion()

  // Fecha o menu mobile ao redimensionar para desktop.
  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Trava o scroll e permite fechar com Esc quando o menu mobile está aberto.
  useEffect(() => {
    lockScroll(menuOpen)
    const onKeyDown = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      lockScroll(false)
    }
  }, [menuOpen])

  const go = (href) => {
    // Guarda a âncora e fecha o menu. O scroll acontece no efeito abaixo,
    // depois que o Lenis é destravado (lockScroll(false)).
    setPendingAnchor(href)
    setMenuOpen(false)
  }

  // Executa a navegação pendente assim que o menu estiver fechado.
  useEffect(() => {
    if (menuOpen || !pendingAnchor) return
    const id = pendingAnchor
    setPendingAnchor(null)
    // Dois frames: um para o React aplicar a remoção do overlay,
    // outro para o Lenis voltar a aceitar comandos de scroll.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)))
  }, [menuOpen, pendingAnchor])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
          scrolled || menuOpen
            ? 'border-b border-line bg-bg/85 py-3 backdrop-blur-md'
            : 'border-b border-transparent py-5'
        }`}
      >
        <div className="container-lux flex items-center justify-between gap-6">
          {/* Logo — clicável leva ao topo */}
          <a
            href="#topo"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#topo')
            }}
            className="shrink-0 transition-opacity duration-400 hover:opacity-80"
            aria-label="Birmingham Barbearia — voltar ao topo"
          >
            <Logo size="sm" />
          </a>

          {/* Navegação desktop */}
          <nav className="hidden lg:block" aria-label="Navegação principal">
            <ul className="flex items-center gap-9">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    aria-current={activeId === link.href ? 'true' : undefined}
                    className={`group relative block py-2 font-sans text-[11px] uppercase tracking-widest transition-colors duration-400 ${
                      activeId === link.href ? 'text-accent' : 'text-text hover:text-accent'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-400 ease-out ${
                        activeId === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              className="hidden lg:inline-flex"
              onClick={() => scrollToSection('#agendar')}
              aria-label="Agendar um horário"
            >
              Agendar
            </Button>

            {/* Botão do menu mobile */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center border border-line text-text transition-colors duration-400 hover:border-accent hover:text-accent lg:hidden"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
            >
              {menuOpen ? <X size={20} strokeWidth={1.25} /> : <Menu size={20} strokeWidth={1.25} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile em tela cheia */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-40 flex flex-col bg-bg lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Rola se a tela for muito baixa, para o primeiro item nunca ficar cortado */}
            <div className="container-lux flex h-full flex-col justify-center overflow-y-auto pb-16 pt-24 sm:pb-20 sm:pt-28">
              <nav aria-label="Navegação principal (mobile)">
                <ul>
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduceMotion ? 0.15 : 0.6,
                        delay: reduceMotion ? 0 : 0.12 + index * 0.07,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="border-b border-line/60"
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault()
                          go(link.href)
                        }}
                        className="flex items-baseline justify-between py-3.5 font-display text-[26px] font-light text-text transition-colors duration-400 hover:text-accent min-[380px]:py-4 min-[380px]:text-3xl"
                      >
                        {link.label}
                        <span className="font-sans text-[10px] tracking-widest text-accent/70">
                          0{index + 1}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0.15 : 0.6,
                  delay: reduceMotion ? 0 : 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-8 flex shrink-0 flex-col items-start gap-5 sm:mt-10 sm:gap-6"
              >
                <Button className="w-full" onClick={() => go('#agendar')}>
                  Agendar horário
                </Button>
                <p className="font-sans text-[11px] uppercase tracking-wides text-muted">
                  {business.address.city} — {business.address.state}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
