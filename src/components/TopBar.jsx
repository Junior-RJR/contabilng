import { Clock, Mail, Phone } from 'lucide-react'
import { contact } from '../data/content.js'
import { Facebook, Instagram, Linkedin } from './icons.jsx'

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__group">
          <a href={contact.phoneHref}>
            <Phone size={14} /> Falar com contador {contact.phoneLabel}
          </a>
          <a href={`mailto:${contact.email}`} className="hide-sm">
            <Mail size={14} /> {contact.email}
          </a>
        </div>
        <div className="topbar__group">
          <span className="hide-sm">
            <Clock size={14} /> {contact.hours}
          </span>
          <a href={contact.social.facebook} aria-label="Facebook"><Facebook /></a>
          <a href={contact.social.linkedin} aria-label="LinkedIn"><Linkedin /></a>
          <a href={contact.social.instagram} aria-label="Instagram"><Instagram /></a>
        </div>
      </div>
    </div>
  )
}
