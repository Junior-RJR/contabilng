import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, ChevronRight, Phone, Send } from 'lucide-react'
import Logo from './Logo.jsx'
import { clients, contact, services } from '../data/content.js'
import { Facebook, Instagram, Linkedin } from './icons.jsx'
import { Magnetic, ease } from './ui.jsx'

const links = [
  { label: 'Fale com a gente', href: '#contato' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Planos', href: '#processo' },
  { label: 'Blog', href: '#blog' },
  { label: 'Faqs', href: '#' },
]

const col = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: i * 0.1 } }),
}

function QuickMessage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const submit = (e) => {
    e.preventDefault()
    const msg = `Olá! Meu nome é ${nome} (${email}). Gostaria de falar com um especialista.`
    window.open(`${contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }
  return (
    <form className="quick" onSubmit={submit}>
      <input required placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} aria-label="Nome" />
      <input required type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="E-mail" />
      <motion.button className="btn btn--gold btn--sm" whileTap={{ scale: 0.95 }}>
        Enviar <Send size={15} />
      </motion.button>
    </form>
  )
}

export default function Footer() {
  const row = [...clients, ...clients]
  return (
    <footer className="footer">
      <div className="container footer__band">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
          <h3>Nosso time pode fazer a diferença no seu negócio</h3>
          <p>Nós te ajudamos a sanar suas dúvidas e encontrar o melhor plano para o seu negócio!</p>
        </motion.div>
        <motion.div className="footer__band-cta" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
          <Magnetic>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="btn btn--gold btn--shine">Falar com especialista</a>
          </Magnetic>
          <a href={contact.phoneHref} className="footer__phone"><Phone size={15} /> {contact.phoneLabel}</a>
        </motion.div>
      </div>

      <div className="clients" aria-label="Alguns de nossos clientes">
        <motion.div className="clients__track" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
          {row.map((c, i) => (
            <span key={i} className="clients__item">{c}</span>
          ))}
        </motion.div>
      </div>

      <motion.div className="container footer__grid" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}>
        <motion.div variants={col} custom={0}>
          <Logo />
          <p>Contabilidade estratégica e moderna a serviço do seu negócio.</p>
          <div className="footer__social">
            <a href={contact.social.facebook} aria-label="Facebook"><Facebook /></a>
            <a href={contact.social.linkedin} aria-label="LinkedIn"><Linkedin /></a>
            <a href={contact.social.instagram} aria-label="Instagram"><Instagram /></a>
          </div>
        </motion.div>
        <motion.div variants={col} custom={1}>
          <h4>Serviços</h4>
          {services.map((s) => <a key={s.title} href="#servicos"><ChevronRight size={14} /> {s.title}</a>)}
        </motion.div>
        <motion.div variants={col} custom={2}>
          <h4>Links</h4>
          {links.map((l) => <a key={l.label} href={l.href}><ChevronRight size={14} /> {l.label}</a>)}
        </motion.div>
        <motion.div variants={col} custom={3}>
          <h4>Envie uma mensagem</h4>
          <QuickMessage />
        </motion.div>
      </motion.div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Contábil NG — Negócios e Gestão Contábil. Todos os direitos reservados.</span>
        <motion.a href="#home" className="to-top" whileHover={{ y: -4 }} aria-label="Voltar ao topo"><ArrowUp size={18} /></motion.a>
      </div>
    </footer>
  )
}
