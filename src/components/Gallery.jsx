import { useCallback, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Keyboard, Pagination } from 'swiper/modules'
import { Lightbox } from 'yet-another-react-lightbox'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

// Estilos do Swiper
import 'swiper/css'
import 'swiper/css/pagination'
// Estilos do Lightbox
import 'yet-another-react-lightbox/styles.css'

import SectionTitle from './SectionTitle'
import Reveal from './Reveal'
import { gallery } from '../data/siteData'

/**
 * Carrossel de galeria com Swiper + ampliação em lightbox.
 * Clique (ou Enter) na foto abre o lightbox; setas do teclado navegam.
 */
export default function Gallery() {
  const [index, setIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const swiperRef = useRef(null)

  // Slides do lightbox, no mesmo formato esperado pela biblioteca.
  const slides = gallery.items.map((item) => ({
    src: item.src,
    alt: item.alt,
    title: item.caption,
  }))

  const openLightbox = useCallback((slideIndex) => {
    setIndex(slideIndex)
    setLightboxOpen(true)
  }, [])

  // Botões de navegação (mantidos fora do estado para evitar re-render)
  const navButton =
    'flex h-12 w-12 items-center justify-center border border-line text-text transition-colors duration-400 hover:border-accent hover:bg-accent hover:text-bg'

  return (
    <section id="galeria" className="section-y relative bg-surface">
      <div className="container-lux">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionTitle eyebrow={gallery.eyebrow} title={gallery.title} intro={gallery.intro} />

          <Reveal from="right" delay={0.2} duration={0.9} className="hidden sm:block">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Foto anterior"
                className={navButton}
              >
                <ChevronLeft size={18} strokeWidth={1.25} />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Próxima foto"
                className={navButton}
              >
                <ChevronRight size={18} strokeWidth={1.25} />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal from="up" delay={0.1} duration={1}>
        <div className="relative mt-14">
          <Swiper
            modules={[Pagination, Keyboard, A11y]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onSlideChange={(swiper) => setIndex(swiper.realIndex)}
            spaceBetween={16}
            slidesPerView={1.15}
            centeredSlides
            grabCursor
            keyboard={{ enabled: true }}
            a11y={{
              prevSlideMessage: 'Foto anterior',
              nextSlideMessage: 'Próxima foto',
              containerRoleDescriptionMessage: 'Carrossel de fotos da barbearia',
            }}
            pagination={{ clickable: true, el: '.gallery-pagination' }}
            breakpoints={{
              640: { slidesPerView: 1.8, spaceBetween: 20 },
              1024: { slidesPerView: 2.4, spaceBetween: 24 },
              1440: { slidesPerView: 3, spaceBetween: 28 },
            }}
          >
            {gallery.items.map((item, slideIndex) => (
              <SwiperSlide key={item.src}>
                <button
                  type="button"
                  onClick={() => openLightbox(slideIndex)}
                  className="group relative block w-full cursor-zoom-in overflow-hidden bg-bg"
                  aria-label={`Ampliar foto: ${item.caption}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    width={1400}
                    height={933}
                    className="img-lux aspect-[3/2] w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <span
                    className="absolute inset-0 bg-bg/30 transition-opacity duration-700 group-hover:opacity-60"
                    aria-hidden="true"
                  />

                  {/* Legenda + ícone de ampliar */}
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                    <span className="text-left font-sans text-[10px] uppercase tracking-widest text-text opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {item.caption}
                    </span>
                    <Maximize2
                      size={16}
                      strokeWidth={1.25}
                      className="shrink-0 text-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Reveal>

      {/* Paginação (bolinhas) */}
      <div className="container-lux">
        <div
          className="gallery-pagination relative mt-10 flex items-center justify-center gap-2"
          aria-hidden="true"
        />
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={index}
        animation={{ fade: 220, swipe: 320 }}
        styles={{
          container: { backgroundColor: '#0D0D0D' },
          thumbnailsContainer: { display: 'none' },
          button: { color: '#C9A961', backgroundColor: 'rgba(13,13,13,0.6)', borderRadius: 0 },
          buttonPrev: { insetInlineEnd: 'auto', left: '16px' },
          buttonNext: { insetInlineStart: 'auto', right: '16px' },
          caption: {
            color: '#F5F1E8',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            backgroundColor: 'transparent',
          },
        }}
      />
    </section>
  )
}
