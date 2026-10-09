import Reveal from './Reveal'

/**
 * Cabeçalho padrão de seção: rótulo em caixa alta, título em serifada,
 * linha dourada e (opcionalmente) texto introdutório.
 */
export default function SectionTitle({
  eyebrow,
  title,
  intro,
  align = 'left',
  as: Heading = 'h2',
  className = '',
}) {
  const centered = align === 'center'

  return (
    <div
      className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'} ${className}`}
    >
      {eyebrow && (
        <Reveal from="up" duration={0.7}>
          <p className="eyebrow flex items-center gap-4">
            {!centered && <span className="h-px w-8 bg-accent/60" aria-hidden="true" />}
            {eyebrow}
          </p>
        </Reveal>
      )}

      <Reveal from="up" delay={0.08} duration={0.9}>
        <Heading className="section-title">{title}</Heading>
      </Reveal>

      {intro && (
        <Reveal from="up" delay={0.16} duration={0.9}>
          <p className="section-intro mx-auto">{intro}</p>
        </Reveal>
      )}
    </div>
  )
}
