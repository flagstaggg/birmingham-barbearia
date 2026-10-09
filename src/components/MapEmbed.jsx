import { MapPin, ExternalLink } from 'lucide-react'
import { business } from '../data/siteData'

/**
 * Mapa do Google Maps via iframe, com filtro CSS (grayscale + invert)
 * para combinar com o tema escuro do site.
 */
export default function MapEmbed() {
  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden border border-line bg-surface">
      <iframe
        src={business.mapEmbedUrl}
        title="Mapa da localização da Birmingham Barbearia em Criciúma, SC"
        className="map-dark absolute inset-0 h-full w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen=""
      />

      {/* Selo discreto com o endereço */}
      <a
        href={business.mapLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-3 border-t border-line bg-bg/85 px-5 py-4 backdrop-blur-sm transition-colors duration-400 hover:bg-bg"
      >
        <span className="flex items-center gap-3">
          <MapPin size={16} strokeWidth={1.25} className="shrink-0 text-accent" aria-hidden="true" />
          <span className="font-sans text-[11px] uppercase tracking-widest text-text">
            {business.address.street} · {business.address.city} — {business.address.state}
          </span>
        </span>
        <ExternalLink size={15} strokeWidth={1.25} className="shrink-0 text-accent" aria-hidden="true" />
      </a>
    </div>
  )
}
