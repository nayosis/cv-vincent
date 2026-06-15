import { useEffect, useRef } from 'react'
import './Main.css'

function StackTag({ label }) {
  return <span className="exp-tag">{label}</span>
}

function ExperienceCard({ exp, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <article ref={cardRef} className={`exp-card ${exp.current ? 'exp-card--current' : ''}`}>
      <div className="exp-timeline-dot" />
      <div className="exp-content">
        <div className="exp-header">
          <div className="exp-meta">
            <span className="exp-period">{exp.period}</span>
            {exp.current && <span className="exp-badge">Actuel</span>}
          </div>
          <h3 className="exp-title">{exp.title}</h3>
          <div className="exp-company">
            <span className="exp-company-name">{exp.company}</span>
            {exp.group && <span className="exp-group"> — {exp.group}</span>}
          </div>
        </div>
        <p className="exp-desc">{exp.description}</p>
        <div className="exp-stack">
          {exp.stack.map(s => <StackTag key={s} label={s} />)}
        </div>
      </div>
    </article>
  )
}

export default function Main({ experiences, formations, headerTitle, headerSub }) {
  return (
    <main className="main">
      {/* Header */}
      <div className="main-header">
        <span className="main-header-eyebrow">Parcours professionnel</span>
        <h2 className="main-header-title">{headerTitle}</h2>
        <p className="main-header-sub">{headerSub}</p>
      </div>

      {/* Experiences */}
      <section className="section">
        <div className="section-title-row">
          <h2 className="section-title">Expériences</h2>
        </div>
        <div className="timeline">
          <div className="timeline-line" />
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </section>

      {/* Formations */}
      <section className="section">
        <div className="section-title-row">
          <h2 className="section-title">Formation & Certifications</h2>
        </div>
        <div className="formation-grid">
          {formations.map((f, i) => (
            <div key={i} className="formation-item">
              <span className="formation-year">{f.year}</span>
              <div>
                <p className="formation-label">{f.label}</p>
                {f.detail && <p className="formation-detail">{f.detail}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
