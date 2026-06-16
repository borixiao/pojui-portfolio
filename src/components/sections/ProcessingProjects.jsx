import '../../css/projects.css'
import { processingProjects } from '../../data/projects.js'
import BirdSilhouette from '../illustrations/BirdSilhouette'

export default function ProcessingProjects() {
  return (
    <section className="processing-section" id="creative-coding">
      <div className="processing-section__inner">
        <div className="processing-section__header">
          <div>
            <p className="section-label">Creative Coding</p>
            <h2>Processing<br /><em style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>&amp; p5.js</em></h2>
          </div>
          <span className="processing-section__subtext">generative experiments ↓</span>
        </div>

        <div className="processing-section__grid processing-section__grid--open">
          {processingProjects.map(p => (
            <div key={p.id} className={`processing-block${p.liveCanvas === 'bird' ? ' processing-block--wide' : ''}`}>

              {p.liveCanvas === 'bird' ? (
                <div className="processing-block__sketch">
                  <BirdSilhouette />
                </div>
              ) : (
                <div className="processing-block__img">
                  {p.image
                    ? <img src={p.image} alt={p.title} />
                    : <div className="processing-block__placeholder"><span>{p.title}</span></div>
                  }
                </div>
              )}

              <p className="processing-block__label">Creative Coding</p>
              <h3 className="processing-block__title">{p.title}</h3>
              <p className="processing-block__desc">{p.description}</p>

              {p.tech && (
                <div className="processing-block__tech">
                  {p.tech.map(t => <span key={t} className="processing-block__tag">{t}</span>)}
                </div>
              )}

              <div className="processing-block__actions">
                {p.sourceCode && (
                  <a href={p.sourceCode} className="btn btn-small" target="_blank" rel="noopener noreferrer">Code ↗</a>
                )}
                {p.demo && (
                  <a href={p.demo} className="btn btn-small btn-primary" target="_blank" rel="noopener noreferrer">Demo ↗</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
