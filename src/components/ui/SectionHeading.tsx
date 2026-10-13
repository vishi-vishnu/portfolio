import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, inView, stagger } from '../../lib/motion'

interface Props {
  index: string
  label: string
  title: ReactNode
  subtitle?: string
  center?: boolean
}

export function SectionHeading({ index, label, title, subtitle, center }: Props) {
  return (
    <motion.header className={`section-head${center ? ' center' : ''}`} variants={stagger(0.1)} {...inView}>
      <motion.p className="eyebrow" variants={fadeUp}>
        <span className="num">{index}</span> {label}
      </motion.p>
      <motion.h2 className="section-title" variants={fadeUp}>
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p className="section-sub" variants={fadeUp}>
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  )
}
