import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import ClickSpark from './components/ui/ClickSpark'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import ProcessingProjects from './components/sections/ProcessingProjects'
import GraphicDesign from './components/sections/GraphicDesign'
import VideoSection from './components/sections/VideoSection'
import Contact from './components/sections/Contact'

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
        <div className="zigzag-divider" aria-hidden="true" />
        <VideoSection />
        <Contact />
      </main>
    </ClickSpark>
  )
}
