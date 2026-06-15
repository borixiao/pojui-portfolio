import '../../css/about.css'
import photo from '../../assets/Brian.png'
const tags = [
  { label: 'Trinity College Dublin', color: '' },
  { label: 'Interactive Digital Media', color: 'red' },
  { label: 'Front-End Dev', color: 'green' },
  { label: 'Creative Coder', color: 'purple' },
  { label: 'VR / Unity', color: 'gold' },
  { label: 'AI Researcher', color: 'purple' },
  { label: 'Based in Dublin', color: '' },
]

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__grid">
        {/* Left: photo frame */}
        <div className="about__left">
          <div className="about__photo-frame">
            <div className="about__tape" aria-hidden="true" />
            {/* <div className="about__photo-placeholder">
              📷<br />Your photo here<br />
              <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Replace with &lt;img&gt;</span>
            </div> */}
            <img
              src={photo}
              alt="Pojui Hsiao"
              className="about__photo"
            />
          </div>
          <span className="about__caption">Pojui Hsiao, Dublin '25</span>
        </div>

        {/* Right: text */}
        <div className="about__right">
          <p className="section-label">About Me</p>

          <h2 className="about__heading">
            Hi, I'm Pojui —<br />
            <em>designer, developer,</em><br />
            and curious maker.
          </h2>

          <p className="about__text">
            I'm a master's student in Interactive Digital Media at Trinity College Dublin,
            where I spend most of my time sitting at the intersection of code, design,
            and storytelling. I'm drawn to projects that make people feel something —
            whether that's a web app, a VR environment, or a piece of research that asks
            uncomfortable questions.
          </p>

          <p className="about__text">
            My work spans front-end development, interactive narrative, speculative design,
            and AI/GenAI research. I like working with ambiguity, iterating quickly, and
            finding the most interesting version of any brief.
          </p>

          <p className="about__text">
            When I'm not building things, I'm probably reading about the things I should
            be building, or sketching ideas that may or may not ever become real projects.
          </p>

          <div className="about__tags">
            {tags.map(t => (
              <span key={t.label} className={`about__tag ${t.color}`}>{t.label}</span>
            ))}
          </div>

          <span className="about__annotation">Let's make something together ↗</span>
        </div>
      </div>
    </section>
  )
}
