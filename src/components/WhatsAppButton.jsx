import { motion } from 'framer-motion'
import { contact } from '../data/content.js'
import { WhatsApp } from './icons.jsx'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={contact.whatsapp}
      target="_blank"
      rel="noreferrer"
      className="wpp"
      aria-label="Falar no WhatsApp"
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 2.4, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="wpp__ring" />
      <span className="wpp__ring wpp__ring--2" />
      <WhatsApp />
      <span className="wpp__tip">Fale com um contador</span>
    </motion.a>
  )
}
