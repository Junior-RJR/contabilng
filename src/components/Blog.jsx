import { motion } from 'framer-motion'
import { ArrowUpRight, Calendar } from 'lucide-react'
import { posts } from '../data/content.js'
import { SectionTitle, ease } from './ui.jsx'

export default function Blog() {
  return (
    <section id="blog" className="blog">
      <div className="container">
        <SectionTitle eyebrow="Fique por dentro" before="Posts do" gold="blog" />
        <div className="blog__grid">
          {posts.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              className="post"
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease, delay: i * 0.12 }}
              whileHover="hover"
            >
              <div className="post__media">
                <motion.img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  variants={{ hover: { scale: 1.1 } }}
                  transition={{ duration: 0.8, ease }}
                  onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
                />
                <span className="post__tag">{p.tag}</span>
              </div>
              <div className="post__body">
                <span className="post__date"><Calendar size={14} /> {p.date}</span>
                <h3>{p.title}</h3>
                <span className="post__more">
                  Ler artigo
                  <motion.span variants={{ hover: { x: 4, y: -4 } }}><ArrowUpRight size={18} /></motion.span>
                </span>
              </div>
              <motion.span className="post__line" variants={{ hover: { scaleX: 1 } }} initial={{ scaleX: 0 }} transition={{ duration: 0.5, ease }} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
