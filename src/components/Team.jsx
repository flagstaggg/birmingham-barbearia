import Reveal from './Reveal'
import SectionTitle from './SectionTitle'
import Button from './Button'
import { ArrowUpRight } from 'lucide-react'
import { team } from '../data/siteData'
import { scrollToSection } from '../lib/smoothScroll'

/** Cartão de barbeiro: foto em preto e branco que ganha cor no hover. */
function BarberCard({ member, index }) {
  return (
    <Reveal from="up" delay={index * 0.1} duration={0.9} className="group">
      <article>
        <div className="relative overflow-hidden bg-surface">
          <img
            src={member.image}
            alt={`Retrato de ${member.name}, ${member.role}`}
            loading="lazy"
            decoding="async"
            width={800}
            height={1000}
            className="img-lux aspect-[4/5] w-full object-cover grayscale transition-all duration-1000 ease-out group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-bg/45 transition-opacity duration-1000 group-hover:bg-bg/20" />
          {/* Detalhe dourado no rodapé da foto */}
          <div
            className="absolute inset-x-0 bottom-0 h-px bg-accent/50"
            aria-hidden="true"
          />
        </div>

        <div className="pt-6">
          <p className="font-sans text-[10px] uppercase tracking-widest text-accent">
            {member.role}
          </p>
          <h3 className="mt-2 font-display text-2xl font-normal text-text">{member.name}</h3>
          <p className="mt-1 text-sm font-light text-text/80">{member.specialty}</p>
          <p className="mt-3 text-sm font-light leading-relaxed text-muted">{member.bio}</p>
        </div>
      </article>
    </Reveal>
  )
}

export default function Team() {
  return (
    <section id="equipe" className="section-y relative bg-bg">
      <div className="container-lux">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle eyebrow={team.eyebrow} title={team.title} intro={team.intro} />
          <Reveal from="right" delay={0.2} duration={0.9}>
            <Button variant="link" icon={ArrowUpRight} onClick={() => scrollToSection('#agendar')}>
              Agendar com a equipe
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {team.members.map((member, index) => (
            <BarberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
