import React from 'react'
import AnimatedGradientCircle from '../components/AnimatedGradientCircle'

export default function HeroPage() {
  return (
    <div className="relative min-h-dvh w-full overflow-hidden">
       <AnimatedGradientCircle />
      <div className="absolute inset-0 flex flex-row items-center justify-center p-10">
        <h1 className="text-4xl font-bold">Hi</h1>
        
      </div>
    </div>
  )
}
