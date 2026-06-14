import '../css/contact.css'

const socialLinks = [
  {
    name: 'Email',
    handle: 'pojui@example.com',
    href: 'mailto:pojui@example.com',
  },
  {
    name: 'LinkedIn',
    handle: '/in/pojui-hsiao',
    href: 'https://linkedin.com/in/pojui-hsiao',
  },
  {
    name: 'GitHub',
    handle: '@pojui-hsiao',
    href: 'https://github.com/pojui-hsiao',
  },
]

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        {/* Left */}
        <div className="contact__left">
          <p className="section-label">Contact</p>
          <h2 className="contact__heading">
            Let's make<br />
            <em>something</em><br />
            together.
          </h2>
          <p className="contact__subtext">
            Open to collaborations, internships, freelance work, and interesting 
            conversations. I'm especially interested in projects at the edge of 
            design, technology, and storytelling.
          </p>
          <a href="mailto:pojui@example.com" className="contact__email-link">
            pojui@example.com ↗
          </a>
          <div>
            <span className="contact__annotation">Don't be a stranger ☻</span>
          </div>
        </div>

        {/* Right */}
        <div className="contact__right">
          <p className="contact__links-heading">Find me on</p>
          <div className="contact__social-links">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="contact__social-link"
                target={link.name !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                <span className="contact__social-name">{link.name}</span>
                <span className="contact__social-handle">{link.handle}</span>
                <span className="contact__social-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="contact__footer">
        <span className="contact__footer-copy">
          © 2025 Pojui Hsiao — Built with React + Vite
        </span>
        <button
          className="contact__footer-back"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑ Back to top
        </button>
      </div>
    </section>
  )
}
