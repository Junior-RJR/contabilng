import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { stats } from '../data/content.js'
import Counter from './Counter.jsx'
import { SectionTitle, fadeUp } from './ui.jsx'

const pillars = ['Contabilidade estratégica, não só burocrática', 'Tecnologia e processos 100% digitais', 'Atendimento humano e personalizado', 'Especialistas em cada departamento']

export default function About() {
  return (
    <section id="empresa" className="about">
      <div className="container about__inner">
        <div>
          <SectionTitle eyebrow="Quem somos" before="Muito além de" gold="números" after="e guias" />
          <motion.p className="about__text" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            A Contábil NG nasceu para ser a parceira que o empresário sempre quis ter: próxima, ágil e focada em resultado.
            Transformamos obrigações em informação para você decidir melhor e crescer com segurança.
          </motion.p>
          <ul className="about__list">
            {pillars.map((p, i) => (
              <motion.li key={p} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <CheckCircle2 size={20} /> {p}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="stats">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat"
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <strong><Counter to={s.value} suffix={s.suffix} /></strong>
              <span>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
