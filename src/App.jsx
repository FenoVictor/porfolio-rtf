import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import ParticlesBackground from './components/ParticlesBackground'
import EasterEgg from './components/EasterEgg'
import ChatButton from './components/ChatButton'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}
      </AnimatePresence>
      <ParticlesBackground />
      <CustomCursor />
      <EasterEgg />
      <ChatButton />
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </div>
  )
}

export default App
