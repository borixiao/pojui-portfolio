import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ClickSpark from './components/ClickSpark'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import ProcessingProjects from './components/ProcessingProjects'
import GraphicDesign from './components/GraphicDesign'
import Contact from './components/Contact'

export default function App() {
  return (
    <ClickSpark
      sparkColor="#c9a96e"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={8}
      duration={400}
      easing="ease-out"
    >
      <Navbar />
      <main>
        <Hero />
        <div className="zigzag-divider" aria-hidden="true" />
        <About />
        <div className="zigzag-divider" aria-hidden="true" />
        <Skills />
        <div className="zigzag-divider" aria-hidden="true" />
        <Projects />
        <div className="zigzag-divider" aria-hidden="true" />
        <ProcessingProjects />
        <div className="zigzag-divider" aria-hidden="true" />
        <GraphicDesign />
        <Contact />
      </main>
    </ClickSpark>
  )
}
