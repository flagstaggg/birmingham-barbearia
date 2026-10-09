/**
 * Button reutilizável com três variantes:
 *  - primary: fundo dourado, texto escuro. No hover fica outline.
 *  - outline: borda dourada, texto dourado. No hover preenche.
 *  - link:    texto em caixa alta com sublinhado dourado que cresce da
 *             esquerda para a direita.
 *
 * Todos os botões têm cantos retos (border-radius 0) e foco visível.
 */

const base =
  'group relative inline-flex items-center justify-center gap-2 font-sans uppercase tracking-widest transition-all duration-400 ease-out select-none'

const variants = {
  primary:
    'border border-accent bg-accent px-10 py-4 text-[13px] text-bg hover:bg-transparent hover:text-accent',
  outline:
    'border border-accent bg-transparent px-10 py-4 text-[13px] text-accent hover:bg-accent hover:text-bg',
  // Variante compacta (menu mobile / botões utilitários)
  compact:
    'border border-accent bg-transparent px-6 py-3 text-[11px] text-accent hover:bg-accent hover:text-bg',
  link: 'gap-2 px-0 py-1 text-[12px] text-text hover:text-accent',
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  href,
  className = '',
  children,
  onClick,
  target,
  rel,
  type = 'button',
  icon: Icon,
  iconPosition = 'right',
  ...rest
}) {
  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`
  const isLink = variant === 'link'

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon
          size={15}
          strokeWidth={1.25}
          className="transition-transform duration-400 group-hover:-translate-x-1"
          aria-hidden="true"
        />
      )}
      <span className="relative">
        {children}
        {/* sublinhado dourado que cresce da esquerda para a direita */}
        {isLink && (
          <span
            aria-hidden="true"
            className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-400 ease-out group-hover:scale-x-100"
          />
        )}
      </span>
      {Icon && iconPosition === 'right' && (
        <Icon
          size={15}
          strokeWidth={1.25}
          className="transition-transform duration-400 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  )

  if (Component === 'a' || href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={classes}
        onClick={onClick}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {content}
    </button>
  )
}
