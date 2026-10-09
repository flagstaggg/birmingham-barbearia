import Reveal from './Reveal'
import Ornament from './Ornament'
import SectionTitle from './SectionTitle'
import { about, business } from '../data/siteData'

/** Seção Sobre: filosofia da casa, imagem do ambiente e números de destaque. */
export default function About() {
  return (
    <section id="sobre" className="section-y relative bg-bg">
      <div className="container-lux">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Imagem do ambiente */}
          <Reveal from="left" duration={1} className="order-2 lg:order-1">
            <div className="relative">
              <div className="group relative overflow-hidden">
                <img
                  src={about.image}
                  alt={about.imageAlt}
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={1400}
                  className="img-lux aspect-[4/5] w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-bg/45 transition-opacity duration-1000 group-hover:bg-bg/25" />
              </div>

              {/* Moldura dourada deslocada */}
              <div
                className="pointer-events-none absolute -bottom-5 -left-5 h-32 w-32 border-b border-l border-accent/30 sm:-bottom-6 sm:-left-6 sm:h-40 sm:w-40"
                aria-hidden="true"
              />
            </div>
          </Reveal>

          {/* Texto */}
          <div className="order-1 lg:order-2">
            <SectionTitle eyebrow={about.eyebrow} title={about.title} />

            <div className="mt-8 space-y-6">
              {about.paragraphs.map((text, index) => (
                <Reveal key={index} from="up" delay={0.1 + index * 0.08} duration={0.9}>
                  <p className="max-w-xl text-base font-light leading-relaxed text-muted">
                    {text}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal from="up" delay={0.4} duration={0.9}>
              <Ornament className="my-10 !w-24" width="w-24" />
            </Reveal>

            {/* Números de destaque */}
            <div className="grid grid-cols-3 gap-4 border-t border-line pt-8 sm:gap-6">
              {business.highlights.map((item, index) => (
                <Reveal key={item.label} from="up" delay={0.15 + index * 0.1} duration={0.8}>
                  <div>
                    <p className="font-display text-3xl font-light text-accent sm:text-4xl">
                      {item.value}
                    </p>
                    <p className="mt-2 font-sans text-[9px] uppercase leading-relaxed tracking-[0.1em] text-muted sm:text-[10px] sm:tracking-[0.12em]">
                      {item.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
