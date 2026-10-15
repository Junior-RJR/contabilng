import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import Logo from './Logo.jsx'
import { contact, nav, services } from '../data/content.js'
import { Facebook, Instagram, Linkedin } from './icons.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo />
          <p>Contabilidade estratégica e moderna a serviço do seu negócio.</p>
          <div className="footer__social">
            <a href={contact.social.facebook} aria-label="Facebook"><Facebook /></a>
            <a href={contact.social.linkedin} aria-label="LinkedIn"><Linkedin /></a>
            <a href={contact.social.instagram} aria-label="Instagram"><Instagram /></a>
          </div>
        </div>
        <div>
          <h4>Navegação</h4>
          {nav.map((n) => <a key={n.label} href={n.href}>{n.label}</a>)}
        </div>
        <div>
          <h4>Serviços</h4>
          {services.map((s) => <a key={s.title} href="#servicos">{s.title}</a>)}
        </div>
        <div>
          <h4>Contato</h4>
          <a href={contact.phoneHref}>{contact.phoneLabel}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <span>{contact.hours}</span>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Contábil NG — Negócios e Gestão Contábil. Todos os direitos reservados.</span>
        <motion.a href="#home" className="to-top" whileHover={{ y: -4 }} aria-label="Voltar ao topo"><ArrowUp size={18} /></motion.a>
      </div>
    </footer>
  )
}
