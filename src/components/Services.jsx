import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import SectionTitle from './SectionTitle'
import { services } from '../data/siteData'

/**
 * Lista de serviços em formato de cardápio de restaurante:
 * nome à esquerda, linha pontilhada dourada no meio, duração e preço à direita.
 * Sem cards coloridos — apenas linhas e respiro.
 */
function ServiceRow({ item, index, inView, reduceMotion }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{
        duration: reduceMotion ? 0.2 : 0.7,
        delay: reduceMotion ? 0 : index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group py-7"
    >
      {/* Linha: nome · pontilhado · duração · preço */}
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h3 className="font-display text-2xl font-normal text-text transition-colors duration-400 group-hover:text-accent sm:text-[28px]">
          {item.name}
        </h3>

        {item.featured && (
          <span className="border border-accent/50 px-2 py-0.5 font-sans text-[9px] uppercase tracking-widest text-accent">
            Completo
          </span>
        )}

        <span
          className="hidden h-px min-w-[24px] flex-1 border-b border-dashed border-line transition-colors duration-400 group-hover:border-accent/50 sm:block"
          aria-hidden="true"
        />

        <span className="ml-auto font-sans text-[10px] uppercase tracking-widest text-muted sm:ml-0">
          {item.duration}
        </span>
        <span className="font-display text-xl text-accent sm:text-2xl">{item.price}</span>
      </div>

      <p className="mt-2 max-w-lg text-sm font-light leading-relaxed text-muted">
        {item.description}
      </p>
    </motion.li>
  )
}

export default function Services() {
  const reduceMotion = useReducedMotion()
  const [setRef, inView] = useInView({ triggerOnce: true, threshold: 0.12 })

  return (
    <section id="servicos" className="section-y relative bg-surface">
      <div className="container-lux">
        <SectionTitle
          eyebrow={services.eyebrow}
          title={services.title}
          intro={services.intro}
          align="center"
          className="mx-auto"
        />

        <div ref={setRef} className="mx-auto mt-16 w-full max-w-3xl">
          <ul className="border-t border-line">
            {services.items.map((item, index) => (
              <ServiceRow
                key={item.name}
                item={item}
                index={index}
                inView={inView}
                reduceMotion={reduceMotion}
              />
            ))}
          </ul>

          <p className="mt-12 text-center font-sans text-[10px] uppercase tracking-widest text-muted">
            Valores de referência · Condições especiais para grupos e pacotes
          </p>
        </div>
      </div>
    </section>
  )
}
