import { motion } from 'framer-motion'

// Monograma "NG" desenhado em SVG (traço animável).
export function LogoMark({ size = 56, draw = false }) {
  const anim = draw
    ? { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { duration: 1.1, ease: 'easeInOut' } }
    : {}
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <motion.path d="M10 54V12h8l18 26V12h6" fill="none" stroke="#fff" strokeWidth="6" strokeLinejoin="miter" {...anim} />
      <motion.path
        d="M42 12h14M42 22v6h11v26"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="6"
        {...anim}
        transition={draw ? { duration: 0.9, delay: 0.5, ease: 'easeInOut' } : undefined}
      />
    </svg>
  )
}

export default function Logo({ compact = false }) {
  return (
    <a href="#home" className={`logo ${compact ? 'logo--compact' : ''}`} aria-label="Contábil NG — início">
      <LogoMark size={compact ? 38 : 46} />
      <span className="logo__text">
        <strong>Negócios e Gestão</strong>
        <em>Contábil</em>
      </span>
    </a>
  )
}
