/**
 * Ornamento discreto para separar seções:
 * linha fina + losango dourado centralizado.
 */
export default function Ornament({ className = '', width = 'w-16' }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${width} ${className}`}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-line" />
      <span className="h-[5px] w-[5px] rotate-45 border border-accent/50" />
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}
