import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import Button from './Button'
import { hero } from '../data/siteData'
import { scrollToSection } from '../lib/smoothScroll'

/**
 * Tela de abertura em tela cheia.
 * Usa imagem escura de fundo; se `hero.video` for configurado no siteData,
 * toca um vídeo em loop silencioso e cai para a imagem em caso de erro.
 */
export default function Hero() {
  const reduceMotion = useReducedMotion()
  const [videoFailed, setVideoFailed] = useState(false)

  const useVideo = Boolean(hero.video) && !videoFailed && !reduceMotion

  const ease = [0.16, 1, 0.3, 1]

  return (
    <section
      id="topo"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
      aria-label="Birmingham Barbearia"
    >
      {/* Fundo: vídeo (opcional) ou imagem */}
      <div className="absolute inset-0" aria-hidden="true">
        {useVideo ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={hero.image}
            onError={() => setVideoFailed(true)}
          >
            <source src={hero.video} type="video/mp4" />
          </video>
        ) : (
          <img
            src={hero.image}
            alt={hero.imageAlt}
            // Imagem principal: carregamento eager para o LCP
            loading="eager"
            decoding="async"
            width={1920}
            height={1280}
            className="h-full w-full scale-105 object-cover"
          />
        )}

        {/* Overlay escuro em camadas */}
        <div className="absolute inset-0 bg-bg/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/85 via-bg/35 to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(13,13,13,0.75)_100%)]" />
      </div>

      {/* Conteúdo */}
      <div className="container-lux relative z-10 flex flex-col items-center py-32 text-center">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          className="mt-7 max-w-4xl font-display text-[2.75rem] font-light leading-[1.05] text-text sm:text-6xl lg:text-8xl"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease }}
        >
          {hero.title}
        </motion.h1>

        {/* Linha dourada que se abre */}
        <motion.span
          aria-hidden="true"
          className="mt-9 block h-px bg-accent/60"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 140, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease }}
        />

        <motion.p
          className="mt-8 max-w-xl text-base font-light leading-relaxed text-muted sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          className="mt-12 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-5"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.6, ease }}
        >
          <Button className="w-full sm:w-auto" onClick={() => scrollToSection('#agendar')}>
            {hero.primaryCta}
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => scrollToSection('#servicos')}
          >
            {hero.secondaryCta}
          </Button>
        </motion.div>
      </div>

      {/* Indicador de scroll discreto */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('#sobre')}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-muted transition-colors duration-400 hover:text-accent sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
        aria-label="Rolar para a seção Sobre"
      >
        <span className="font-sans text-[9px] uppercase tracking-widest">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-line">
          <span className="absolute inset-0 block animate-scroll-hint bg-accent" />
        </span>
      </motion.button>
    </section>
  )
}
