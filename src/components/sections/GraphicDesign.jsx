import '../../css/design.css'
import { designProjects } from '../../data/projects.js'

export default function GraphicDesign() {
  return (
    <section className="design" id="design">
      <div className="design__inner">
        <div className="design__header">
          <div>
            <p className="section-label">Graphic Design</p>
            <h2>Visual<br /><em style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>work</em></h2>
          </div>
          <span className="design__subtext">branding & visual identity ↓</span>
        </div>

        <div className="design__grid">
          {designProjects.map(p => (
            <div key={p.id} className="design-card">
              <div className="design-card__main-img">
                <img src={p.image} alt={p.title} />
                <span className="design-card__year">{p.year}</span>
              </div>

              <div className="design-card__body">
                <div className="design-card__meta">
                  <p className="design-card__label">{p.category}</p>
                  <h3 className="design-card__title">{p.title}</h3>
                  <p className="design-card__desc">{p.description}</p>

                  {p.collaborators && p.collaborators.length > 0 && (
                    <p className="design-card__collab">
                      <span>w/</span> {p.collaborators.join(', ')}
                    </p>
                  )}

                  <div className="design-card__tags">
                    {p.tags.map(t => (
                      <span key={t} className="design-card__tag">{t}</span>
                    ))}
                  </div>
                </div>

                {p.gallery && p.gallery.length > 0 && (
                  <div className={`design-card__gallery design-card__gallery--${p.gallery.length}`}>
                    {p.gallery.map((img, i) => (
                      <div key={i} className="design-card__gallery-img">
                        <img src={img} alt={`${p.title} detail ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
