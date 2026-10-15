import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { steps } from '../data/content.js'
import { SectionTitle, ease } from './ui.jsx'

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const line = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="processo" className="process" ref={ref}>
      <div className="container">
        <SectionTitle light eyebrow="Como funciona" before="Simples," gold="rápido" after="e sem dor de cabeça" />
        <div className="process__track">
          <div className="process__rail"><motion.span style={{ scaleX: line }} /></div>
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              className="step"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease, delay: i * 0.15 }}
            >
              <motion.span className="step__num" whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}>
                {String(i + 1).padStart(2, '0')}
              </motion.span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
