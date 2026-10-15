import { motion } from 'framer-motion'
import { services } from '../data/content.js'

export default function Marquee() {
  const items = [...services.map((s) => s.title), 'Consultoria', 'BPO Financeiro']
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <motion.div className="marquee__track" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
        {row.map((t, i) => (
          <span key={i}>
            {t} <b>✦</b>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
