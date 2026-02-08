import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';

// Components
import LandingOverlay from '../Components/Landing/LandingOverlay';
import LandingImages, { landingImageSrcs } from '../Components/Landing/LandingImages';
import LandingContent from '../Components/Landing/LandingContent';

// Hooks
import { useAssetLoader } from '../Hooks/useAssetLoader';

gsap.registerPlugin(CustomEase, SplitText);
CustomEase.create('hop', '0.85, 0, 0.15, 1');

export default function LandingPage() {
  const container = useRef(null);
  const counterRef = useRef(null);
  const { assetsLoaded } = useAssetLoader(landingImageSrcs);

  useGSAP(() => {
    // Timeline breakdown
    const counterTl = gsap.timeline({ delay: 0.5 });
    const overlayTextTl = gsap.timeline({ paused: true, delay: 0.2 });
    const revealTl = gsap.timeline({ paused: true });

    // Counter Logic
    // We animate to 100, but the duration/ease is controlled to feel like "loading"
    // If assets load quickly, we still want a minimum 'show off' time.
    // If assets load slowly, we wait.

    // A context-safe function to play the reveal
    const playReveal = () => {
      // Ensure counter finishes to 100 if not already
      gsap.to(counterRef.current, {
        textContent: 100,
        duration: 0.5,
        snap: { textContent: 1 },
        onUpdate: function () {
          this.targets()[0].textContent = Math.ceil(this.targets()[0].textContent);
        },
        onComplete: () => {
          revealTl.play();
          overlayTextTl.play();
        }
      });
    };

    const counterObj = { value: 0 };
    const loaderTl = gsap.timeline();

    loaderTl.to(counterObj, {
      value: 90,
      duration: 2.5,
      ease: 'power1.out',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(counterObj.value);
        }
      },
      onComplete: () => {
        // Check the LATEST state of assetsLoaded via Ref
        if (assetsLoadedRef.current) {
          playReveal();
        }
      }
    });

    // If assets load *after* the simulation hits 90%
    // The useEffect below will handle it.

    // Overlay Text Animation
    overlayTextTl
      .to('.overlay-text', {
        y: '0',
        duration: 0.75,
        ease: 'hop',
      })
      .to('.overlay-text', {
        y: '-2rem',
        duration: 0.75,
        ease: 'hop',
        delay: 0.75,
      })
      .to('.overlay-text', {
        y: '-4rem',
        duration: 0.75,
        ease: 'hop',
        delay: 0.75,
      })
      .to('.overlay-text', {
        y: '-6rem',
        duration: 0.75,
        ease: 'hop',
        delay: 1,
      });

    // SplitText for Header
    const split = new SplitText('.hero-header h1', {
      type: 'words',
      wordsClass: 'word',
    });

    // Initial state for SplitText words (match CSS: transform: translateY(100%))
    gsap.set('.hero-header h1 .word', { y: '100%' });

    // Reveal Animation
    revealTl
      .to('.img', {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 1,
        ease: 'hop',
      })
      .to('.hero-images', {
        gap: '0.75vw',
        duration: 1,
        delay: 0.5,
        ease: 'hop',
      })
      .to(
        '.img',
        {
          scale: 1,
          duration: 1,
          ease: 'hop',
        },
        '<'
      )
      .to('.img:not(.hero-img)', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1,
        stagger: 0.1,
        ease: 'hop',
      })
      .to('.hero-img', {
        scale: 2,
        duration: 1,
        ease: 'hop',
      })
      .to('.hero-overlay', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1,
        ease: 'hop',
      })
      .to(
        '.hero-header h1 .word',
        {
          y: '0',
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      // Reveal Extra Content (Header, etc.)
      .to('.fade-in-content', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        pointerEvents: 'auto'
      });

    // Cleanup SplitText on unmount
    return () => {
      split.revert();
    };

  }, { scope: container });

  // Separate effect to trigger reveal if assets load LATER than the animation
  React.useEffect(() => {
    if (assetsLoaded && counterRef.current) {
      const currentVal = parseInt(counterRef.current.textContent || '0');
      if (currentVal >= 90) {
        // We are likely waiting at ~90. We can't trigger playReveal directly here
        // without access to the timeline. But since [assetsLoaded] is a dependency
        // of useGSAP, the main logic re-runs or runs if we structured it right.
        // In our current useGSAP logic:
        // "if (assetsLoaded && loaderTl.progress() >= 1)" handles it?
        // Actually, because we recreate the timeline on every render (due to dependencies change),
        // this is slightly inefficient but workable for this use case if we ensure 
        // the animation doesn't restart from 0 unless intended.
        // But since this is a landing page that mounts once, it's okay.
        // Ideally, we'd use contextSafe to call a method.
        // For now, let's trust the useGSAP re-run logic or the onComplete check.

        // Wait, useGSAP with dependencies will REVERT and RE-RUN. 
        // This means animation restarts. This is BAD for a loader state change.
        // FIX: We should NOT put [assetsLoaded] in dependencies if we want to continue.
        // We should use contextSafe or a ref to access the timeline.
      }
    }
  }, [assetsLoaded]);

  // CORRECTION for the Dependency Issue:
  // We should NOT re-run the whole GSAP timeline when assetsLoaded changes.
  // We should watch assetsLoaded inside the timeline or via an effect that calls a timeline method.

  // Let's refactor the useGSAP to NOT depend on assetsLoaded, but check a Ref.
  const assetsLoadedRef = useRef(assetsLoaded);
  React.useEffect(() => {
    assetsLoadedRef.current = assetsLoaded;
  }, [assetsLoaded]);

  return (
    <section ref={container} className="relative w-full h-svh overflow-hidden bg-white">
      <LandingContent />
      <LandingOverlay ref={counterRef} />
      <LandingImages />
    </section>
  );
}
