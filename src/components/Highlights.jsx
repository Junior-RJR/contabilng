import { motion } from 'framer-motion'
import { Headset, LineChart, MonitorSmartphone, Rocket } from 'lucide-react'
import { ease } from './ui.jsx'

const items = [
  { icon: Rocket, title: 'Abertura ágil', text: 'Sua empresa regularizada sem burocracia.' },
  { icon: LineChart, title: 'Economia de impostos', text: 'Planejamento para pagar só o necessário.' },
  { icon: MonitorSmartphone, title: '100% digital', text: 'Documentos e relatórios onde você estiver.' },
  { icon: Headset, title: 'Contador dedicado', text: 'Atendimento humano, direto pelo WhatsApp.' },
]

// Barra de diferenciais que "flutua" sobre o fim do hero.
export default function Highlights() {
  return (
    <div className="container highlights-wrap">
      <motion.div
        className="highlights"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease }}
      >
        {items.map(({ icon: Icon, title, text }, i) => (
          <motion.div
            key={title}
            className="hl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.25 + i * 0.1 }}
          >
            <span className="hl__icon">
              <Icon size={24} />
            </span>
            <div>
              <strong>{title}</strong>
              <small>{text}</small>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
