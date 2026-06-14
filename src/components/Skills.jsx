import '../css/skills.css'

const skillCategories = [
  {
    id: 'frontend',
    className: 'frontend',
    label: 'Frontend',
    title: 'Web Dev',
    items: ['HTML & CSS', 'JavaScript (ES6+)', 'React', 'Vite', 'Responsive Design'],
  },
  {
    id: 'backend',
    className: 'backend',
    label: 'Backend',
    title: 'Server Side',
    items: ['Node.js', 'Express', 'MySQL', 'REST APIs', 'Git / GitHub'],
  },
  {
    id: 'creative',
    className: 'creative',
    label: 'Creative Tools',
    title: 'Making',
    items: ['Unity & C#', 'VR Development', 'Figma', 'Prototyping', 'Digital Illustration'],
  },
  {
    id: 'research',
    className: 'research',
    label: 'Research',
    title: 'Thinking',
    items: ['AI / GenAI', 'Digital Marketing', 'Consumer Perception', 'Thematic Analysis', 'Academic Writing'],
  },
]

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills__inner">
        <div className="skills__header">
          <div>
            <p className="section-label">Skills</p>
            <h2>What I work<br /><em style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>with</em></h2>
          </div>
          <span className="skills__subtext">tools & disciplines ↓</span>
        </div>

        <div className="skills__grid">
          {skillCategories.map(cat => (
            <div key={cat.id} className={`skills__card ${cat.className}`}>
              <p className="skills__card-label">{cat.label}</p>
              <h3 className="skills__card-title">{cat.title}</h3>
              <div className="skills__items">
                {cat.items.map(item => (
                  <span key={item} className="skills__item">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
