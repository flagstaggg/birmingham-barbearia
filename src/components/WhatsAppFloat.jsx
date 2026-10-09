import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

import { buildWhatsAppLink } from '../lib/whatsapp'
import { useScrolled } from '../hooks/useScrolled'

/**
 * Botão flutuante de WhatsApp, discreto e na paleta do site
 * (dourado sobre fundo escuro — sem o verde oficial).
 * Aparece suavemente depois que a página é rolada.
 */
export default function WhatsAppFloat() {
  const visible = useScrolled(320)
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com a Birmingham Barbearia pelo WhatsApp"
          className="group fixed bottom-6 right-5 z-30 flex items-center gap-0 border border-accent bg-bg/90 py-3 pl-4 pr-3 backdrop-blur-sm transition-colors duration-400 hover:bg-accent sm:bottom-8 sm:right-8"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.94 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <MessageCircle
            size={20}
            strokeWidth={1.25}
            className="shrink-0 text-accent transition-colors duration-400 group-hover:text-bg"
            aria-hidden="true"
          />
          {/* Rótulo que expande no hover */}
          <span className="max-w-0 overflow-hidden whitespace-nowrap font-sans text-[10px] uppercase tracking-widest text-accent opacity-0 transition-all duration-500 ease-out group-hover:ml-3 group-hover:max-w-[190px] group-hover:opacity-100 group-hover:text-bg">
            Agendar no WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
