import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ExternalLink, Mail, MapPin, PhoneCall, Send } from 'lucide-react'
import { contact } from '../data/content.js'
import { Blog, Facebook, Instagram, Linkedin } from './icons.jsx'
import { SectionTitle, ease } from './ui.jsx'

const info = [
  { icon: MapPin, label: contact.address.title, value: contact.address.lines, href: contact.address.mapLink, external: true },
  { icon: PhoneCall, label: 'Telefone e WhatsApp', value: [contact.phoneLabel], href: contact.phoneHref },
  { icon: Mail, label: 'E-mail', value: [contact.email], href: `mailto:${contact.email}` },
]

const socials = [
  { icon: Facebook, href: contact.social.facebook, label: 'Facebook' },
  { icon: Linkedin, href: contact.social.linkedin, label: 'LinkedIn' },
  { icon: Instagram, href: contact.social.instagram, label: 'Instagram' },
  { icon: Blog, href: contact.social.blog, label: 'Blog' },
]

const prefs = ['WhatsApp', 'Telefone', 'E-mail']

export default function Contact() {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', mensagem: '' })
  const [pref, setPref] = useState(['WhatsApp'])
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const toggle = (p) => setPref((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]))

  // Envia o formulário direto para o WhatsApp do escritório.
  const submit = (e) => {
    e.preventDefault()
    const msg = [
      `Olá! Meu nome é ${form.nome}.`,
      `E-mail: ${form.email}`,
      `Telefone: ${form.telefone}`,
      pref.length ? `Prefiro contato por: ${pref.join(', ')}` : '',
      '',
      form.mensagem,
    ].filter((l, i) => l || i === 4).join('\n')
    window.open(`${contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contato" className="contact">
      <div className="container">
        <SectionTitle light eyebrow="Contato" before="Fale com" gold="especialista" after="estamos pertinho de você" />

        <div className="contact__grid">
          <motion.form
            className="form"
            onSubmit={submit}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <h3 className="form__title">
              Nosso time pode <strong>fazer a diferença</strong> no seu negócio
            </h3>
            <label className="field">
              <input required value={form.nome} onChange={set('nome')} placeholder=" " autoComplete="name" />
              <span>Nome *</span>
            </label>
            <div className="form__row">
              <label className="field">
                <input required type="email" value={form.email} onChange={set('email')} placeholder=" " autoComplete="email" />
                <span>E-mail *</span>
              </label>
              <label className="field">
                <input required type="tel" value={form.telefone} onChange={set('telefone')} placeholder=" " autoComplete="tel" />
                <span>Telefone *</span>
              </label>
            </div>

            <fieldset className="prefs">
              <legend>Como prefere receber um contato</legend>
              {prefs.map((p) => {
                const on = pref.includes(p)
                return (
                  <motion.button
                    type="button"
                    key={p}
                    className={`chip ${on ? 'chip--on' : ''}`}
                    onClick={() => toggle(p)}
                    whileTap={{ scale: 0.92 }}
                    aria-pressed={on}
                  >
                    <span className="chip__box">
                      <AnimatePresence>
                        {on && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check size={13} strokeWidth={3} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    {p}
                  </motion.button>
                )
              })}
            </fieldset>

            <label className="field">
              <textarea required rows={5} value={form.mensagem} onChange={set('mensagem')} placeholder=" " />
              <span>Deixe sua mensagem *</span>
            </label>
            <motion.button className="btn btn--dark btn--block" whileTap={{ scale: 0.97 }}>
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.span key="ok" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
                    <Check size={18} /> Abrindo WhatsApp…
                  </motion.span>
                ) : (
                  <motion.span key="send" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
                    Enviar mensagem <Send size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>

          <div className="contact__side">
            {info.map(({ icon: Icon, label, value, href, external }, i) => (
              <motion.a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="info-card"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: i * 0.12 }}
                whileHover={{ x: -6 }}
              >
                <span className="info-card__icon"><Icon size={24} /></span>
                <div>
                  <strong>{label}</strong>
                  {value.map((v) => <small key={v}>{v}</small>)}
                </div>
              </motion.a>
            ))}

            <motion.div className="socials" initial="hidden" whileInView="show" viewport={{ once: true }}>
              {socials.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  variants={{ hidden: { opacity: 0, y: 20, rotate: -20 }, show: { opacity: 1, y: 0, rotate: 0, transition: { delay: 0.3 + i * 0.08 } } }}
                  whileHover={{ y: -5, rotate: 8 }}
                >
                  <Icon width={20} height={20} />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              className="map"
              initial={{ clipPath: 'inset(0 0 100% 0 round 16px)' }}
              whileInView={{ clipPath: 'inset(0 0 0% 0 round 16px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            >
              <iframe title="Localização Contábil NG" src={contact.address.map} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <a href={contact.address.mapLink} target="_blank" rel="noreferrer" className="map__open">
                Abrir no Maps <ExternalLink size={14} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
