import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Clock, Mail, Phone, Send } from 'lucide-react'
import { contact, services } from '../data/content.js'
import { SectionTitle, ease } from './ui.jsx'

const info = [
  { icon: Phone, label: 'Telefone / WhatsApp', value: contact.phoneLabel, href: contact.phoneHref },
  { icon: Mail, label: 'E-mail', value: contact.email, href: `mailto:${contact.email}` },
  { icon: Clock, label: 'Atendimento', value: contact.hours },
]

export default function Contact() {
  const [form, setForm] = useState({ nome: '', telefone: '', servico: services[0].title, mensagem: '' })
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  // Envia o formulário direto para o WhatsApp do escritório.
  const submit = (e) => {
    e.preventDefault()
    const msg = `Olá! Meu nome é ${form.nome}.\nTelefone: ${form.telefone}\nInteresse: ${form.servico}\n${form.mensagem}`
    window.open(`${contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contato" className="contact">
      <div className="container">
        <SectionTitle light eyebrow="Contato" before="Fale com" gold="especialista" after="estamos pertinho de você" />

        <div className="contact__grid">
          <div className="contact__info">
            {info.map(({ icon: Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                className="info-card"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: i * 0.12 }}
                whileHover={{ x: 10 }}
              >
                <span className="info-card__icon"><Icon size={22} /></span>
                <div>
                  <small>{label}</small>
                  <strong>{value}</strong>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.form
            className="form"
            onSubmit={submit}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="form__row">
              <label className="field">
                <input required value={form.nome} onChange={set('nome')} placeholder=" " />
                <span>Seu nome</span>
              </label>
              <label className="field">
                <input required type="tel" value={form.telefone} onChange={set('telefone')} placeholder=" " />
                <span>Telefone / WhatsApp</span>
              </label>
            </div>
            <label className="field field--select">
              <select value={form.servico} onChange={set('servico')}>
                {services.map((s) => <option key={s.title}>{s.title}</option>)}
              </select>
              <span>Serviço de interesse</span>
            </label>
            <label className="field">
              <textarea rows={4} value={form.mensagem} onChange={set('mensagem')} placeholder=" " />
              <span>Como podemos ajudar?</span>
            </label>
            <motion.button className="btn btn--gold btn--block btn--shine" whileTap={{ scale: 0.97 }}>
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
        </div>
      </div>
    </section>
  )
}
