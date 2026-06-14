export default function ProjectCard({ project }) {
  const { title, category, description, tech, color, accent, github, demo, tag, image } = project

  return (
    <article className="project-card">
      <div className="project-card__image" style={{ background: color }}>
        {image ? (
          <img src={image} alt={title} style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block'
          }} />
        ) : (
          <div className="project-card__img-placeholder" data-label={title} />
        )}
        <span className="project-card__tag">{tag}</span>
      </div>

      <div className="project-card__body">
        <p className="project-card__category">{category}</p>
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{description}</p>

        <div className="project-card__stack">
          {tech.map(t => (
            <span key={t} className="project-card__pill">{t}</span>
          ))}
        </div>

        <div className="project-card__actions">
          {github && (
            <a href={github} className="btn btn-small" target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          )}
          {demo && (
            <a href={demo} className="btn btn-small btn-primary" target="_blank" rel="noopener noreferrer">
              Live Demo ↗
            </a>
          )}
          {!github && !demo && (
            <span className="btn btn-small" style={{ opacity: 0.5, cursor: 'default', pointerEvents: 'none' }}>
              Research Project
            </span>
          )}
        </div>
      </div>
    </article>
  )
}