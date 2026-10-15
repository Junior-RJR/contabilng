import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo.jsx'
import { contact, nav } from '../data/content.js'

export default function Header() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(null)
  const [active, setActive] = useState('#home')

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 400 && !open)
    setScrolled(y > 60)
  })

  // Destaca o link da seção visível.
  useEffect(() => {
    const ids = nav.map((n) => n.href).filter((h) => h.length > 1)
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

  const current = hover ?? active

  return (
    <motion.header
      className={`header ${scrolled ? 'header--scrolled' : ''}`}
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="container header__inner">
        <Logo compact={scrolled} />

        <nav className="nav" onMouseLeave={() => setHover(null)}>
          {nav.map((item) => (
            <a key={item.label} href={item.href} className={active === item.href ? 'is-active' : ''} onMouseEnter={() => setHover(item.href)}>
              {current === item.href && <motion.span layoutId="nav-pill" className="nav__pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="header__cta">
          <a href="#contato" className="btn btn--dark btn--sm">Abrir empresa</a>
          <a href="#contato" className="btn btn--outline btn--sm">Trazer empresa</a>
        </div>

        <button className="burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
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
                {item.label}
              </motion.a>
            ))}
            <motion.div className="mobile-menu__cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <a href="#contato" className="btn btn--gold" onClick={() => setOpen(false)}>Abrir empresa</a>
              <a href={contact.whatsapp} className="btn btn--outline-light" target="_blank" rel="noreferrer">Falar no WhatsApp</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
