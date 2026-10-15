import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { contact, ctaImage } from '../data/content.js'
import { Magnetic, SectionTitle, ease } from './ui.jsx'

export default function StartCTA() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])

  return (
    <section className="start" ref={ref}>
      <div className="container">
        <SectionTitle before="E aí, vamos" gold="começar?" />
        <motion.div className="start__card" style={{ scale }}>
          <div className="start__media">
            <motion.img src={ctaImage} alt="" style={{ y }} onError={(e) => (e.currentTarget.style.visibility = 'hidden')} />
            <div className="start__shade" />
          </div>
          <motion.div
            className="start__body"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
          >
            <h3>Inicie agora uma conversa com nossos especialistas</h3>
            <p>Nós te ajudamos a sanar suas dúvidas e encontrar o melhor plano para o seu negócio!</p>
            <Magnetic>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="btn btn--gold btn--shine">
                Começar agora <ArrowRight size={18} />
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
