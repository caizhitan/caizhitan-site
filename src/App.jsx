import React, { useEffect } from 'react';
import Lenis from 'lenis'
import LandingPage2 from './Pages/LandingPage2'

function App() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <LandingPage2 />
    </>
  )
}

export default App
