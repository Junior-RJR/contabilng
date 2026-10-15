import { useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Building2, Calculator, Landmark, Receipt, TrendingUp, Users } from 'lucide-react'
import { contact, services } from '../data/content.js'
import { SectionTitle, ease } from './ui.jsx'

const icons = { Calculator, Receipt, Landmark, Users, Building2, TrendingUp }

function ServiceCard({ service, index }) {
  const [open, setOpen] = useState(false)
  const Icon = icons[service.icon]

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 150, damping: 18 })
  const gx = useTransform(mx, (v) => `${v * 100}%`)
  const gy = useTransform(my, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(400px circle at ${gx} ${gy}, rgba(201,162,39,0.18), transparent 60%)`

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => { mx.set(0.5); my.set(0.5) }

  const short = service.text.split('. ')[0] + '.'

  return (
    <motion.article
      className="service"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease, delay: (index % 3) * 0.12 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <div className="service__media">
        <img src={service.image} alt={service.title} loading="lazy" onError={(e) => (e.currentTarget.style.visibility = 'hidden')} />
        <span className="service__num">0{index + 1}</span>
      </div>

      <div className="service__body">
        <motion.div className="service__glare" style={{ background: glare }} />
        <span className="service__bar" />
        <span className="service__icon"><Icon size={26} /></span>
        <h3>{service.title}</h3>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={open ? 'full' : 'short'}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            {open ? service.text : short}
          </motion.p>
        </AnimatePresence>
        <div className="service__actions">
          <button className="btn btn--dark btn--sm btn--arrow" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? 'Ver menos' : 'Saiba mais'} <ArrowRight size={16} style={{ transform: open ? 'rotate(-90deg)' : 'none', transition: 'transform .3s' }} />
          </button>
          <a className="service__link" href={`${contact.whatsapp}?text=${encodeURIComponent(`Olá! Tenho interesse em ${service.title}.`)}`} target="_blank" rel="noreferrer">
            Contratar
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Services() {
  return (
    <section id="servicos" className="services">
      <div className="pattern" aria-hidden="true" />
      <div className="container">
        <SectionTitle eyebrow="O que fazemos" before="Nossos serviços" gold="qualidade" after="em primeiro lugar" />
        <div className="services__grid">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
