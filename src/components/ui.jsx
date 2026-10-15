import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// Texto que sobe palavra por palavra (efeito "máscara").
export function RevealText({ text, as = 'span', className = '', delay = 0, highlight = [] }) {
  const Tag = motion[as]
  const words = text.split(' ')
  // O gatilho fica no elemento pai: os spans internos começam fora da máscara
  // (overflow hidden) e nunca seriam detectados pelo IntersectionObserver.
  return (
    <Tag className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
      {words.map((w, i) => (
        <span className="mask" key={i}>
          <motion.span
            className={highlight.includes(i) ? 'gold' : undefined}
            variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
            transition={{ duration: 0.8, ease, delay: delay + i * 0.06 }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export function SectionTitle({ before, gold, after, light = false, eyebrow }) {
  const text = [before, gold, after].filter(Boolean).join(' ')
  const start = before ? before.split(' ').length : 0
  const goldIdx = gold ? gold.split(' ').map((_, i) => start + i) : []
  return (
    <div className={`section-title ${light ? 'section-title--light' : ''}`}>
      {eyebrow && (
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        >
          {eyebrow}
        </motion.span>
      )}
      <RevealText as="h2" text={text} highlight={goldIdx} />
      <motion.span
        className="section-title__line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease, delay: 0.3 }}
      />
    </div>
  )
}

// Botão que é "atraído" pelo cursor.
export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: 'inline-block' }} onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </motion.div>
  )
}

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: i * 0.12 } }),
}

export { ease }
