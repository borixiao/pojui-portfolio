import '../css/projects.css'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects.js'

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="projects__inner">
        <div className="projects__header">
          <div>
            <p className="section-label">Projects</p>
            <h2>Selected<br /><em style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>work</em></h2>
          </div>
          <span className="projects__count">{String(projects.length).padStart(2, '0')} projects</span>
        </div>

        <div className="projects__grid">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}