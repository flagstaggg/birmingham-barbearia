import { Instagram, MapPin, Phone, MessageCircle, ArrowUpRight } from 'lucide-react'

import Logo from './Logo'
import Button from './Button'
import { business, navLinks } from '../data/siteData'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { scrollToSection } from '../lib/smoothScroll'

export default function Footer({ className = '' }) {
  const year = new Date().getFullYear()

  return (
    <footer className={`border-t border-line bg-bg ${className}`}>
      <div className="container-lux py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          {/* Logo + frase */}
          <div>
            <Logo size="md" />
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-muted">
              Barbearia premium em {business.address.city}, {business.address.state}. Precision,
              ritual e tempo reservado para você.
            </p>
          </div>

          {/* Links rápidos */}
          <nav aria-label="Links do rodapé">
            <h2 className="font-sans text-[10px] uppercase tracking-widest text-accent">
              Navegação
            </h2>
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="text-sm font-light text-muted transition-colors duration-400 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h2 className="font-sans text-[10px] uppercase tracking-widest text-accent">
              Contato
            </h2>
            <ul className="mt-6 space-y-4 text-sm font-light text-muted">
              <li className="flex items-start gap-3">
                <MapPin size={15} strokeWidth={1.25} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  {business.address.street}
                  <br />
                  {business.address.city} — {business.address.state}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} strokeWidth={1.25} className="shrink-0 text-accent" aria-hidden="true" />
                <a
                  href={`tel:${business.phoneDisplay.replace(/\D/g, '')}`}
                  className="transition-colors duration-400 hover:text-accent"
                >
                  {business.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={15} strokeWidth={1.25} className="shrink-0 text-accent" aria-hidden="true" />
                <a
                  href={business.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-400 hover:text-accent"
                >
                  {business.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 sm:flex-row sm:items-center">
          <p className="font-display text-2xl font-light text-text sm:text-3xl">
            Seu horário está esperando.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              as="a"
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              icon={MessageCircle}
            >
              Agendar no WhatsApp
            </Button>
            <Button
              variant="outline"
              icon={ArrowUpRight}
              onClick={() => scrollToSection('#agendar')}
            >
              Agenda online
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="font-sans text-[10px] uppercase tracking-widest text-muted">
            © {year} {business.name}. Todos os direitos reservados.
          </p>
          <p className="font-sans text-[10px] uppercase tracking-widest text-muted">
            {business.tagline} · {business.address.city} — {business.address.state}
          </p>
        </div>
      </div>
    </footer>
  )
}
