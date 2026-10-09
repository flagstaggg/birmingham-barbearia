/**
 * Logotipo em texto: "BIRMINGHAM" em Cormorant Garamond caixa alta
 * e "BARBEARIA" menor, com bastante espaçamento entre letras.
 */
export default function Logo({ size = 'md', className = '', showTagline = false }) {
  const sizes = {
    sm: { title: 'text-lg', sub: 'text-[8px] tracking-[0.42em]' },
    md: { title: 'text-2xl', sub: 'text-[9px] tracking-[0.45em]' },
    lg: { title: 'text-4xl sm:text-5xl', sub: 'text-[11px] tracking-[0.5em]' },
  }[size]

  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span
        className={`font-display font-normal uppercase text-text ${sizes.title}`}
        style={{ letterSpacing: '0.14em' }}
      >
        Birmingham
      </span>
      <span
        className={`mt-1.5 font-sans font-light uppercase text-accent ${sizes.sub}`}
        style={{ letterSpacing: '0.45em' }}
      >
        Barbearia
      </span>
      {showTagline && (
        <span className="mt-2 font-sans text-[9px] uppercase tracking-widest text-muted">
          Desde 2012
        </span>
      )}
    </span>
  )
}
