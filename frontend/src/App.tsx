import { useState } from 'react'
import Terminal from './components/Terminal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Articles from './components/Articles'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [mode, setMode] = useState<'terminal' | 'gui'>('terminal')

  if (mode === 'terminal') {
    return <Terminal onSwitchToGui={() => setMode('gui')} />
  }

  return (
    <div className="relative min-h-screen">
      <Navbar onSwitchToTerminal={() => setMode('terminal')} />
      <main>
        <Hero />
        <TechStack />
        <Projects />
        <Experience />
        <Articles />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
