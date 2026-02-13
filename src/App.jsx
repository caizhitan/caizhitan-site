import React, { useState, useEffect, useLayoutEffect, Suspense, lazy } from 'react';
import Lenis from 'lenis'
import { useGLTF, useTexture } from '@react-three/drei'
import LoadingScreen from './Components/LoadingScreen'

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
  // Preload assets in parallel with the timer
  useEffect(() => {
    // 3D Assets
    useGLTF.preload('/assets/lanyard.glb')
    useTexture.preload('/assets/lanyard_band.jpg')
  }, [])

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
