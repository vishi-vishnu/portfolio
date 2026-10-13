import { getTech } from '../../data/techIcons'

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const { icon: Icon, color } = getTech(name)
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
