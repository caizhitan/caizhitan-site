import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Band from '../ThreeJS/Band'
import Navigation from '../Components/Navigation'

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full">
      {/* Three.js Canvas - Full viewport */}
      <Canvas 
        camera={{ position: [0, 0, 13], fov: 25 }}
        className="absolute inset-0 w-full h-full"
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

      {/* Hero Text - On top of Canvas */}
      <div className="absolute bottom-[10%] left-[5%] z-10 pointer-events-none">
        <h1 className="text-white text-6xl font-bold m-0 drop-shadow-lg">
          Welcome 1
        </h1>
        <p className="text-white/80 text-xl mt-4">
          Scroll down to explore more
        </p>
      </div>
    </section>
  )
}
