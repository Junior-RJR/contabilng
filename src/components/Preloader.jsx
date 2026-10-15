import { motion } from 'framer-motion'
import { LogoMark } from './Logo.jsx'

export default function Preloader() {
  return (
    <motion.div
      className="preloader"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <LogoMark size={110} draw />
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        Contábil <span>NG</span>
      </motion.p>
      <motion.div className="preloader__bar" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.7, ease: 'easeInOut' }} />
    </motion.div>
  )
}
