import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Band from '../ThreeJS/Band'
import Navigation from '../Components/Navigation'
import ScrollLockToggle from '../Components/ScrollLockToggle'


export default function HeroSection() {
  const [isLocked, setIsLocked] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect if device is mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth <= 1024
      setIsMobile(isTouchDevice && isSmallScreen)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section id="home" className="relative h-screen w-full">
      {/* Three.js Canvas - Full viewport */}
      {/* On mobile: pointer-events disabled until scroll is locked */}
      <Canvas
        camera={{ position: [0, 0, 13], fov: 25 }}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: isMobile && !isLocked ? 'none' : 'auto' }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Environment background blur={0.75}>
          <color attach="background" args={['black']} />
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>

      <Navigation />

      {/* Instruction text and lock toggle */}
      <ScrollLockToggle
        isLocked={isLocked}
        setIsLocked={setIsLocked}
        isMobile={isMobile}
      />

    </section>
  )
}
