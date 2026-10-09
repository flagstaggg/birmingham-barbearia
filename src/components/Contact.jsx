import { MapPin, Clock, Phone, Instagram, Navigation } from 'lucide-react'

import SectionTitle from './SectionTitle'
import Reveal from './Reveal'
import Button from './Button'
import Ornament from './Ornament'
import MapEmbed from './MapEmbed'
import ContactForm from './ContactForm'
import { business } from '../data/siteData'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { scrollToSection } from '../lib/smoothScroll'

/** Linha de informação (ícone + rótulo + valor). */
function InfoRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-5 py-5">
      <Icon size={18} strokeWidth={1.25} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
      <div>
        <p className="font-sans text-[10px] uppercase tracking-widest text-muted">{label}</p>
        <div className="mt-2 text-sm font-light text-text">{children}</div>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contato" className="section-y relative bg-surface">
      <div className="container-lux">
        <SectionTitle eyebrow="Contato" title="Onde estamos" />

        {/* Informations + mapa */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal from="left" duration={0.9}>
            <div className="divide-y divide-line/70 border-y border-line/70">
              <InfoRow icon={MapPin} label="Endereço">
                <address className="not-italic leading-relaxed">
                  {business.address.street}
                  <br />
                  {business.address.city} — {business.address.state} · {business.address.zip}
                </address>
                <a
                  href={business.mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-accent"
                >
                  <Navigation size={13} strokeWidth={1.25} aria-hidden="true" />
                  Como chegar
                </a>
              </InfoRow>

              <InfoRow icon={Clock} label="Horário de funcionamento">
                <ul className="space-y-1">
                  {business.hours.map((row) => (
                    <li key={row.days} className="flex justify-between gap-4 sm:max-w-xs">
                      <span className="text-muted">{row.days}</span>
                      <span>{row.time}</span>
                    </li>
                  ))}
                </ul>
              </InfoRow>

              <InfoRow icon={Phone} label="Telefone e WhatsApp">
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-400 hover:text-accent"
                >
                  {business.phoneDisplay}
                </a>
                <a
                  href={`tel:${business.phoneDisplay.replace(/\D/g, '')}`}
                  className="ml-4 font-sans text-[10px] uppercase tracking-widest text-accent transition-colors duration-400 hover:text-text"
                >
                  Ligar
                </a>
              </InfoRow>

              <InfoRow icon={Instagram} label="Instagram">
                <a
                  href={business.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-400 hover:text-accent"
                >
                  {business.instagramHandle}
                </a>
              </InfoRow>
            </div>
          </Reveal>

          <Reveal from="right" duration={0.9} delay={0.1} className="min-h-[320px]">
            <MapEmbed />
          </Reveal>
        </div>

        {/* Formulário */}
        <div className="mt-24 lg:mt-32">
          <Reveal from="up" duration={0.9}>
            <Ornament className="mx-auto" width="w-20" />
          </Reveal>

          <div className="mx-auto mt-12 max-w-3xl">
            <Reveal from="up" duration={0.9}>
              <div className="text-center">
                <h3 className="font-display text-3xl font-light text-text sm:text-4xl">
                  Prefere falar com a gente?
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-sm font-light text-muted">
                  Preencha os campos ao lado — ou abaixo, se estiver no celular — e enviaremos sua
                  solicitação direto pelo WhatsApp.
                </p>
              </div>
            </Reveal>

            <Reveal from="up" delay={0.12} duration={0.9}>
              <div className="mt-12 border-t border-line pt-12">
                <ContactForm />
              </div>
            </Reveal>

            <Reveal from="up" delay={0.2} duration={0.9}>
              <div className="mt-14 flex justify-center">
                <Button variant="link" onClick={() => scrollToSection('#agendar')}>
                  Preferir reservar pela agenda online
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
