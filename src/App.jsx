import React, { useState, useEffect, useLayoutEffect, Suspense, lazy } from 'react';
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGLTF, useTexture } from '@react-three/drei'
import LoadingScreen from './Components/LoadingScreen'

gsap.registerPlugin(ScrollTrigger);

// Helper to signal when Suspense is ready
function LoadSignal({ onReady }) {
  useEffect(() => {
    onReady()
  }, [onReady])
  return null
}

const LandingPage = lazy(() => import('./Pages/LandingPage'))

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    useGLTF.preload('/assets/lanyard.glb')
    useTexture.preload('/assets/lanyard_band.jpg')
  }, [])

  useEffect(() => {
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return (
    <>
      {!isLoaded && (
        <LoadingScreen 
          canSwipe={isReady} 
          onComplete={() => setIsLoaded(true)} 
        />
      )}
      <Suspense fallback={null}>
        <LandingPage />
        <LoadSignal onReady={() => setIsReady(true)} />
      </Suspense>
    </>
  )
}

export default App
