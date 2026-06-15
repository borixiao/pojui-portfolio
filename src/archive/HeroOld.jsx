import '../css/hero.css'

const marqueeItems = [
  'Interactive Digital Media',
  '✦',
  'Trinity College Dublin',
  '✦',
  'Front-End Development',
  '✦',
  'Creative Technology',
  '✦',
  'VR / Unity',
  '✦',
  'AI Research',
  '✦',
  'Narrative Design',
  '✦',
]

export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Background decoration */}
      <div className="hero__bg-circle" aria-hidden="true" />
      <div className="halftone-dot hero__halftone-1" aria-hidden="true" />
      <div className="halftone-dot hero__halftone-2" aria-hidden="true" />

      {/* Corner annotation */}
      <div className="hero__corner-tag" aria-hidden="true">
        TCD 2024–25<br />
        <span>IDM ✦</span>
      </div>

      {/* Main content */}
      <div className="hero__content">
        <p className="hero__eyebrow">Portfolio — 2025</p>

        <h1 className="hero__name">
          Pojui
          <span className="hero__name-last">Hsiao</span>
        </h1>

        <p className="hero__tagline">
          Interactive Digital Media student exploring web,<br />
          AI and creative technology.
        </p>

        <div className="hero__cta">
          <a href="#projects" className="btn btn-primary">
            View Projects ↓
          </a>
          <a href="#contact" className="btn">
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </div>

      {/* Marquee ticker */}
      <div className="hero__marquee-wrap" aria-hidden="true">
        <div className="hero__marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className={item === '✦' ? 'dot' : ''}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
