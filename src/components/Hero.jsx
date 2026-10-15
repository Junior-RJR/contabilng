import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react'
import { contact, heroImage, rotatingWords } from '../data/content.js'
import { Magnetic, ease } from './ui.jsx'

const lines = [
  { text: 'Contábil NG', cls: 'hero__l1' },
  { text: 'Estratégica & Moderna', cls: 'hero__l2 gold' },
  { text: 'a serviço do seu negócio', cls: 'hero__l3' },
]

function RotatingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % rotatingWords.length), 2600)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="rotator">
      <span className="rotator__bar" />
      <span className="rotator__prefix">Cuidamos de</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[i]}
          className="rotator__word"
          initial={{ y: 30, opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -30, opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease }}
        >
          {rotatingWords[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Inclinação 3D da imagem acompanhando o mouse.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 20 })
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 20 })
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const go = ready ? 'show' : 'hidden'

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <motion.div className="hero__glow" animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="hero__glow hero__glow--2" animate={{ x: [0, -60, 30, 0], y: [0, 50, -30, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />
      </div>

      <div className="container hero__inner">
        <motion.div className="hero__content" style={{ y: textY, opacity: fade }}>
          <h1>
            {lines.map((l, li) => (
              <span key={l.text} className={`hero__line ${l.cls}`}>
                {l.text.split(' ').map((w, wi) => (
                  <span className="mask" key={wi}>
                    <motion.span
                      variants={{ hidden: { y: '115%', rotate: 4 }, show: { y: '0%', rotate: 0 } }}
                      initial="hidden"
                      animate={go}
                      transition={{ duration: 0.9, ease, delay: 0.1 + li * 0.18 + wi * 0.06 }}
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            className="hero__text"
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.8, ease }}
          >
            Somos uma equipe de profissionais especialistas dedicados a apoiar empresas e empresários na realização de suas
            metas de crescimento e expansão. Utilizamos <strong>contabilidade estratégica</strong>, combinada com tecnologia
            avançada e atendimento personalizado, para garantir resultados eficazes e satisfatórios.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1, ease }}
          >
            <Magnetic>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="btn btn--gold btn--shine">
                Falar com especialista <ArrowRight size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contato" className="btn btn--outline-light">
                Abrir minha empresa
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          onMouseMove={onMove}
          onMouseLeave={() => { mx.set(0); my.set(0) }}
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={ready ? { clipPath: 'inset(0% 0 0 0)' } : {}}
          transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        >
          <motion.div className="hero__frame" style={{ rotateX: rotX, rotateY: rotY }}>
            <motion.img src={heroImage} onError={(e) => (e.currentTarget.style.visibility = 'hidden')} alt="Consultor contábil analisando relatórios" style={{ y: imgY, scale: 1.15 }} />
            <div className="hero__shade" />
            <RotatingWord />
          </motion.div>

          <motion.div
            className="float-card float-card--a"
            initial={{ opacity: 0, x: -40 }}
            animate={ready ? { opacity: 1, x: 0, y: [0, -10, 0] } : {}}
            transition={{ opacity: { delay: 1.3 }, x: { delay: 1.3, duration: 0.8 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <span className="float-card__icon"><TrendingUp size={20} /></span>
            <div>
              <strong>+500</strong>
              <small>empresas atendidas</small>
            </div>
          </motion.div>

          <motion.div
            className="float-card float-card--b"
            initial={{ opacity: 0, x: 40 }}
            animate={ready ? { opacity: 1, x: 0, y: [0, 10, 0] } : {}}
            transition={{ opacity: { delay: 1.5 }, x: { delay: 1.5, duration: 0.8 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <span className="float-card__icon"><ShieldCheck size={20} /></span>
            <div>
              <strong>100%</strong>
              <small>em conformidade</small>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a href="#empresa" className="scroll-cue" aria-label="Rolar para baixo" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.8 }}>
        <span><motion.i animate={{ y: [0, 14, 0] }} transition={{ duration: 1.6, repeat: Infinity }} /></span>
      </motion.a>
    </section>
  )
}
