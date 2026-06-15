import { useState } from 'react'
import '../../css/hero.css'
import AppleLogo from '../illustrations/AppleLogo'
import TextType from '../ui/TextType'
import Pencil from '../illustrations/Pencil'
import Kirby from '../illustrations/Kirby'

const workspaceObjects = [
  { className: 'hero__object hero__object--notebook', label: 'Notebook' },
  { className: 'hero__object hero__object--disk', label: 'Portable drive' },
  { className: 'hero__object hero__object--card', label: 'Reference card' },
]

export default function Hero() {
  const [nameDone, setNameDone] = useState(false)

  return (
    <section className="hero" id="home">
      <div className="hero__objects" aria-hidden="true">
        {workspaceObjects.map(item => (
          <span key={item.label} className={item.className} />
        ))}
        <Pencil className="hero__pencil" size={130} />
        <Kirby className="hero__kirby" size={148} />
      </div>

      {/* MacBook with stickers */}
      <div className="hero__macbook" aria-hidden="true">
        <div className="hero__macbook-lid">
          <AppleLogo className="hero__macbook-apple" color="rgba(26,23,20,0.5)" />
          <div className="hero__sticker hero__sticker--heart">♥<span>be kind</span></div>
          <div className="hero__sticker hero__sticker--star">keep going ★</div>
          <div className="hero__sticker hero__sticker--coffee">☕ good days</div>
          <div className="hero__sticker hero__sticker--plant">🌿</div>
          <div className="hero__sticker hero__sticker--camera">📷</div>
          <div className="hero__sticker hero__sticker--vibes">good vibes</div>
        </div>
      </div>

      <div className="hero__content">
        <TextType
          as="p"
          className="hero__eyebrow"
          text={["Creative technology portfolio"]}
          typingSpeed={55}
          initialDelay={300}
          loop={false}
          showCursor={false}
        />

        <h1 className="hero__name">
          <TextType
            as="span"
            text={["Pojui"]}
            typingSpeed={120}
            initialDelay={1400}
            loop={false}
            showCursor={false}
            onDone={() => setNameDone(true)}
          /><span className="hero__name-dot" style={{ opacity: nameDone ? 1 : 0, transition: 'opacity 0.3s ease' }}>.</span>
        </h1>

        <TextType
          as="p"
          className="hero__tagline"
          text={[
            "Interactive Digital Media student designing refined web experiences, AI experiments, and creative technology systems."
          ]}
          typingSpeed={18}
          initialDelay={2600}
          loop={false}
          showCursor={false}
        />

        <div className="hero__cta">
          <a href="#projects" className="btn btn-primary">
            View Projects ↓
          </a>
          <a href="#contact" className="btn">
            Contact Me
          </a>
        </div>
      </div>

      <div className="hero__meta hero__meta--left">
        <span>Based in Dublin</span>
        <span>TCD / IDM</span>
      </div>

      <div className="hero__meta hero__meta--right">
        <span>Web</span>
        <span>AI</span>
        <span>VR</span>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
