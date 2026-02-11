import { useEffect } from 'react'
import lockIcon from '../assets/icons/square-lock.svg'
import unlockIcon from '../assets/icons/square-unlock.svg'

export default function ScrollLockToggle({ isLocked, setIsLocked, isMobile }) {
    // Listen for unlock event from navigation
    useEffect(() => {
        const handleUnlock = () => setIsLocked(false)
        window.addEventListener('unlock-scroll', handleUnlock)
        return () => window.removeEventListener('unlock-scroll', handleUnlock)
    }, [setIsLocked])

    // Handle scroll locking
    useEffect(() => {
        const preventScroll = (e) => {
            // Only prevent if the target is not the canvas or within it
            const isCanvas = e.target.closest('canvas') || e.target.tagName === 'CANVAS'
            if (!isCanvas) {
                e.preventDefault()
            }
        }

        if (isLocked) {
            // Prevent scrolling via touch events but allow canvas interaction
            document.body.style.overflow = 'hidden'
            document.body.style.touchAction = 'none'

            // Prevent default scroll behavior on touchmove
            document.addEventListener('touchmove', preventScroll, { passive: false })
        } else {
            // Restore scrolling
            document.body.style.overflow = ''
            document.body.style.touchAction = ''
            document.removeEventListener('touchmove', preventScroll)
        }

        return () => {
            // Cleanup on unmount
            document.body.style.overflow = ''
            document.body.style.touchAction = ''
            document.removeEventListener('touchmove', preventScroll)
        }
    }, [isLocked])

    return (
        <>
            {/* Instruction Text - Bottom Left */}
            <div className="absolute bottom-0 left-0 p-6 z-10 pointer-events-none">
                <p className="text-white/80 text-base font-secondary">
                    {isMobile ? '[Lock to play]' : '[Drag to play]'}
                </p>
            </div>

            {/* Lock/Unlock Button - Only show on mobile */}
            {isMobile && (
                <div className="absolute bottom-5 right-6 z-10 pointer-events-none">
                    <button
                        onClick={() => setIsLocked(!isLocked)}
                        className={`
                            group
                            p-4 rounded-full
                            transition-all duration-300 ease-in-out
                            shadow-lg active:scale-95
                            backdrop-blur-md border-2
                            pointer-events-auto
                            ${isLocked
                                ? 'bg-blue-500/90 active:bg-blue-600'
                                : 'bg-white/90 active:bg-white/20'
                            }
                        `}
                        aria-label={isLocked ? 'Unlock scroll' : 'Lock scroll to drag lanyard'}
                    >
                        <div className="relative w-6 h-6 transition-transform duration-300">
                            <img
                                src={isLocked ? lockIcon : unlockIcon}
                                alt={isLocked ? 'Lock' : 'Unlock'}
                                className="w-6 h-6"
                            />
                        </div>
                    </button>
                </div>
            )}
        </>
    )
}
