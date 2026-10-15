import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { testimonials } from '../data/content.js'
import { SectionTitle } from './ui.jsx'

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 120 : -120, opacity: 0, rotate: dir > 0 ? 3 : -3, scale: 0.95 }),
  center: { x: 0, opacity: 1, rotate: 0, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -120 : 120, opacity: 0, rotate: dir > 0 ? -3 : 3, scale: 0.95 }),
}

const initials = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

export default function Testimonials() {
  const [[index, dir], setState] = useState([0, 0])
  const [paused, setPaused] = useState(false)
  const n = testimonials.length

  const paginate = useCallback((d) => setState(([i]) => [(i + d + n) % n, d]), [n])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => paginate(1), 6000)
    return () => clearInterval(t)
  }, [paused, paginate, index])

  const t = testimonials[index]
  const next = testimonials[(index + 1) % n]
  const prev = testimonials[(index - 1 + n) % n]

  return (
    <section className="testimonials" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="pattern" aria-hidden="true" />
      <div className="container">
        <SectionTitle eyebrow="Depoimentos" before="Sua" gold="satisfação" after="é nosso maior patrimônio" />

        <div className="carousel">
          <button className="carousel__ghost carousel__ghost--l" onClick={() => paginate(-1)} aria-label={`Depoimento de ${prev.company}`}>
            <Quote size={22} /> <span>{prev.company}</span>
          </button>

          <div className="carousel__stage">
            <AnimatePresence custom={dir} mode="popLayout" initial={false}>
              <motion.figure
                key={index}
                className="tcard"
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) paginate(1)
                  else if (info.offset.x > 80) paginate(-1)
                }}
              >
                <Quote className="tcard__quote" size={64} />
                <div className="tcard__brand">
                  <span className="tcard__logo">{initials(t.company)}</span>
                  <div>
                    <strong>{t.company}</strong>
                    <small>{t.tagline}</small>
                  </div>
                </div>
                <div className="tcard__stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.07, type: 'spring' }}>
                      <Star size={18} fill="currentColor" />
                    </motion.span>
                  ))}
                </div>
                <blockquote>“{t.text}”</blockquote>
                <figcaption>{t.name}</figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <button className="carousel__ghost carousel__ghost--r" onClick={() => paginate(1)} aria-label={`Depoimento de ${next.company}`}>
            <span>{next.company}</span> <Quote size={22} />
          </button>
        </div>

        <div className="carousel__controls">
          <button onClick={() => paginate(-1)} aria-label="Anterior"><ChevronLeft /></button>
          <div className="dots">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setState([i, i > index ? 1 : -1])} aria-label={`Ir para depoimento ${i + 1}`}>
                {i === index && <motion.span layoutId="dot" className="dots__active" />}
              </button>
            ))}
          </div>
          <button onClick={() => paginate(1)} aria-label="Próximo"><ChevronRight /></button>
        </div>
      </div>
    </section>
  )
}
