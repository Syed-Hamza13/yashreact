import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Resume from './components/sections/Resume'
import WorkShowcase from './components/sections/WorkShowcase'
import DesignShowCase from './components/sections/DesignShowcase'
import Journey from './components/sections/JourneyContact'
function App() {
  return (
    // bg-background class lagana zaroori hai taaki dark theme apply ho
    <div className="bg-background min-h-screen text-text-primary font-sans selection:bg-accent selection:text-background">
      <Navbar />
      <Hero />
      <About />
      <Resume />
      <WorkShowcase />
      <DesignShowCase />
      <Journey />
      {/* Baaki sections baad me yahan add honge:
          <About />
          <Experience />
          <Portfolio />
          <Videos />
          <Contact />
      */}
    </div>
  )
}

export default App