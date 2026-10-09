import { useEffect, useRef, useState } from 'react'
import { InlineWidget } from 'react-calendly'
import { Check, MessageCircle, CalendarDays, TriangleAlert } from 'lucide-react'

import SectionTitle from './SectionTitle'
import Reveal from './Reveal'
import Button from './Button'
import { booking, CALENDLY_URL } from '../data/siteData'
import { buildWhatsAppLink } from '../lib/whatsapp'

/**
 * Tema escuro do Calendly, alinhado à paleta do site.
 * A biblioteca converte estes nomes para background_color / text_color /
 * primary_color na URL do iframe.
 */
const calendlyTheme = {
  backgroundColor: '#0D0D0D', // --bg
  textColor: '#F5F1E8', // --text
  primaryColor: '#C9A961', // --accent
}

// Enquanto o link do Calendly for o de exemplo, mostramos um aviso em vez de
// carregar uma agenda inexistente. A comparação é exata para não confundir um
// link real que happen to mention the slug da barbearia.
const CALENDLY_PLACEHOLDER = 'https://calendly.com/birmingham-barbearia/corte-barba'
const isCalendlyPlaceholder = CALENDLY_URL === CALENDLY_PLACEHOLDER

/** Skeleton mostrado enquanto o calendário carrega. */
function CalendlySkeleton() {
  return (
    <div className="absolute inset-0 flex flex-col gap-5 bg-bg p-8" aria-hidden="true">
      <div className="h-4 w-32 animate-pulse bg-surface" />
      <div className="grid grid-cols-7 gap-3">
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className="h-9 animate-pulse bg-surface" />
        ))}
      </div>
      <div className="mt-2 space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-12 w-full animate-pulse bg-surface" />
        ))}
      </div>
    </div>
  )
}

export default function Booking() {
  const containerRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  /**
   * O react-calendly renderiza um <iframe> dentro do container.
   * Esperamos esse iframe existir e escondemos o skeleton quando ele carregar.
   */
  useEffect(() => {
    if (isCalendlyPlaceholder) return

    const root = containerRef.current
    if (!root) return

    let iframe = null
    const handleLoad = () => setLoaded(true)

    const observer = new MutationObserver(() => {
      const node = root.querySelector('iframe')
      if (node) attach(node)
    })

    function attach(node) {
      iframe = node
      node.addEventListener('load', handleLoad, { once: true })
      // Se já terminou de carregar antes do listener, verificamos o estado.
      try {
        if (node.contentDocument?.readyState === 'complete') setLoaded(true)
      } catch {
        /* conteúdo cross-origin: apenas esperamos o evento load */
      }
      observer.disconnect()
    }

    // Rede de segurança: se algo travar, revela o conteúdo em 8s.
    const timeout = setTimeout(() => setLoaded(true), 8000)

    // O iframe pode já existir no momento do efeito...
    const existing = root.querySelector('iframe')
    if (existing) {
      attach(existing)
    } else {
      // ...ou ser inserido logo depois.
      observer.observe(root, { childList: true, subtree: true })
    }

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
      iframe?.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <section id="agendar" className="section-y relative bg-bg">
      <div className="container-lux">
        <SectionTitle
          eyebrow={booking.eyebrow}
          title={booking.title}
          intro={booking.intro}
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {/* --- Opção A: WhatsApp --- */}
          <Reveal from="left" duration={0.9} className="h-full">
            <div className="flex h-full flex-col justify-between border border-line bg-surface p-8 sm:p-10">
              <div>
                <div className="flex items-center gap-3">
                  <MessageCircle
                    size={20}
                    strokeWidth={1.25}
                    className="shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-2xl font-normal text-text sm:text-3xl">
                    {booking.whatsappCard.title}
                  </h3>
                </div>

                <p className="mt-5 text-sm font-light leading-relaxed text-muted">
                  {booking.whatsappCard.description}
                </p>

                <ul className="mt-8 space-y-4">
                  {booking.whatsappCard.notes.map((note) => (
                    <li
                      key={note}
                      className="flex items-start gap-3 text-sm font-light text-text/85"
                    >
                      <Check
                        size={16}
                        strokeWidth={1.25}
                        className="mt-1 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <Button
                  as="a"
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={MessageCircle}
                  className="w-full"
                  aria-label="Agendar pelo WhatsApp — abre em nova aba"
                >
                  {booking.whatsappCard.buttonLabel}
                </Button>
                <p className="mt-4 text-center font-sans text-[10px] uppercase tracking-widest text-muted">
                  Resposta em poucos minutos
                </p>
              </div>
            </div>
          </Reveal>

          {/* --- Opção B: Calendly --- */}
          <Reveal from="right" duration={0.9} delay={0.1} className="h-full">
            <div className="flex h-full flex-col border border-line bg-surface">
              <div className="border-b border-line px-8 py-6">
                <div className="flex items-center gap-3">
                  <CalendarDays
                    size={20}
                    strokeWidth={1.25}
                    className="shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-2xl font-normal text-text sm:text-3xl">
                    {booking.calendlyCard.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm font-light text-muted">
                  {booking.calendlyCard.description}
                </p>
              </div>

              <div ref={containerRef} className="relative h-[640px] w-full bg-bg">
                {isCalendlyPlaceholder ? (
                  // Estado de configuração: o cliente ainda não trocou o link.
                  <div className="flex h-full flex-col items-center justify-center gap-5 p-10 text-center">
                    <TriangleAlert size={22} strokeWidth={1.25} className="text-accent" aria-hidden="true" />
                    <p className="max-w-sm text-sm font-light leading-relaxed text-muted">
                      A agenda online entra aqui assim que o link do Calendly for configurado.
                      Enquanto isso, fale com a nossa equipe pelo WhatsApp.
                    </p>
                    <Button
                      as="a"
                      href={buildWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      icon={MessageCircle}
                      className="mt-2"
                    >
                      Falar no WhatsApp
                    </Button>
                  </div>
                ) : (
                  <>
                    {!loaded && <CalendlySkeleton />}
                    <InlineWidget
                      url={CALENDLY_URL}
                      styles={{ height: '640px', minWidth: '280px' }}
                      pageSettings={calendlyTheme}
                      utm={{
                        utmSource: 'site',
                        utmMedium: 'birmingham-barbearia',
                        utmCampaign: 'agendamento',
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
