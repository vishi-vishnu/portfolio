import { getTech } from '../../data/techIcons'

/** Brand logo for a technology: full-colour image when available, otherwise a simple icon. */
export function TechIcon({ name, className }: { name: string; className?: string }) {
  const { icon: Icon, color, logo } = getTech(name)
  if (logo) return <img src={logo} alt="" className={`tech-img${className ? ` ${className}` : ''}`} loading="lazy" decoding="async" draggable={false} />
  return <Icon className={className} style={{ color }} aria-hidden="true" focusable="false" />
}

export function TechChip({ name }: { name: string }) {
  return (
    <span className="chip">
      <TechIcon name={name} />
      {name}
    </span>
  )
}
