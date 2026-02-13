import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function LoadingScreen({ onComplete, canSwipe }) {
    const counterRef = useRef(null)
    const containerRef = useRef(null)
    const [timeDone, setTimeDone] = useState(false)

    useGSAP(() => {
        const tl = gsap.timeline()
        const counterObj = { value: 0 }

        // Counter Animation
        tl.to(counterObj, {
            value: 100,
            duration: 5, // Total load time
            ease: 'power1.out',
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.textContent = Math.floor(counterObj.value)
                }
            },
            onComplete: () => {
                setTimeDone(true)
            }
        })

        // Overlay Text Animation
        const overlayTextTl = gsap.timeline({ delay: 0.2 })
        overlayTextTl
            .to('.overlay-text', {
                y: '0',
                duration: 0.75,
                ease: 'power3.out', // approximated 'hop'
            })
            .to('.overlay-text', {
                y: '-2rem',
                duration: 0.75,
                ease: 'power3.out',
                delay: 0.75,
            })
            .to('.overlay-text', {
                y: '-4rem',
                duration: 0.75,
                ease: 'power3.out',
                delay: 0.75,
            })
            // Ensure final state is clean, though component unlocks via Suspense
            // Ensure final state is clean, though component unlocks via Suspense
    }, [])

    useEffect(() => {
        if (timeDone && canSwipe) {
             gsap.to(containerRef.current, {
                yPercent: -100,
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    if (onComplete) onComplete()
                }
            })
        }
    }, [timeDone, canSwipe, onComplete])

    return (
        <div ref={containerRef} className="fixed inset-0 bg-black z-[9999] flex items-center justify-center pointer-events-none">
            {/* Counter */}
            <div className="absolute right-8 bottom-8 text-white">
                <h1 ref={counterRef} className="text-[4rem] font-medium font-primary">0</h1>
            </div>

            {/* Rolling Text */}
            <div className="absolute top-8 left-8 h-8 overflow-hidden">
                <div className="overlay-text flex flex-col translate-y-8">
                    <p className="text-white h-8 flex items-center uppercase font-secondary text-base font-medium leading-tight">Built in SG</p>
                    <p className="text-white h-8 flex items-center uppercase font-secondary text-base font-medium leading-tight">2026</p>
                    <p className="text-white h-8 flex items-center uppercase font-secondary text-base font-medium leading-tight">Welcome</p>
                </div>
            </div>
        </div>
    )
}
