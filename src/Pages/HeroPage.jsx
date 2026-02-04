import React from 'react'


export default function HeroPage() {
  return (
    /* min-h-screen fills the height, flex + items-center + justify-center centers everything */
    <div className="flex flex-col h-screen w-full items-start justify-end p-10 bg-zinc-900">
      
        {/* text-7xl is size, font-black is thickest weight, transition makes it feel alive */}
        <h1 className="text-9xl text-white tracking-tighter hover:text-blue-400 transition-colors duration-300 cursor-default">
          hello world
        </h1>

    </div>
  )
}
