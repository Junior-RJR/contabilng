import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowRight, Building2, Repeat } from 'lucide-react'
import Logo from './Logo.jsx'
import { contact, nav } from '../data/content.js'

const spring = { type: 'spring', stiffness: 400, damping: 32 }

export default function Header() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(null)
  const [active, setActive] = useState('#home')

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 500 && !open)
    setScrolled(y > 60)
  })

  // Destaca o link da seção visível.
  useEffect(() => {
    const ids = [...new Set(nav.map((n) => n.href).filter((h) => h.length > 1))]
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.querySelector(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <motion.header
      className={`header ${scrolled ? 'header--scrolled' : ''} ${open ? 'header--open' : ''}`}
      animate={{ y: hidden ? '-120%' : '0%' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="container header__inner">
        <Logo compact={scrolled} />

        <nav className="nav" onMouseLeave={() => setHover(null)}>
          {nav.map((item) => {
            const isActive = active === item.href
            return (
              <a
                key={item.label}
                href={item.href}
                className={isActive ? 'is-active' : ''}
                onMouseEnter={() => setHover(item.label)}
                aria-current={isActive ? 'page' : undefined}
              >
                {hover === item.label && <motion.span layoutId="nav-hover" className="nav__hover" transition={spring} />}
                <span className="nav__label">{item.label}</span>
                {isActive && <motion.span layoutId="nav-active" className="nav__active" transition={spring} />}
              </a>
            )
          })}
        </nav>

        <div className="header__cta">
          <a href="#contato" className="hbtn hbtn--ghost">
            <Repeat size={16} /> Trazer empresa
          </a>
          <a href="#contato" className="hbtn hbtn--gold">
            <Building2 size={16} /> Abrir empresa
            <ArrowRight size={16} className="hbtn__arrow" />
          </a>
        </div>

        <button className={`burger ${open ? 'burger--open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {nav.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
              >
                <small>0{i + 1}</small> {item.label}
              </motion.a>
            ))}
            <motion.div className="mobile-menu__cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <a href="#contato" className="btn btn--gold" onClick={() => setOpen(false)}>Abrir empresa</a>
              <a href="#contato" className="btn btn--outline-light" onClick={() => setOpen(false)}>Trazer empresa</a>
              <a href={contact.whatsapp} className="mobile-menu__wpp" target="_blank" rel="noreferrer">Falar no WhatsApp · {contact.phoneLabel}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
