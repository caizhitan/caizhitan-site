import React, { useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

// Register standard GSAP plugins
gsap.registerPlugin(SplitText);

/**
 * A reusable component that applies a rolling text animation effect using GSAP SplitText.
 * Triggers on hover.
 */
const RollingTextAnimation = ({ 
  text = "Rolling Text", 
  repeatCount = 8, 
  duration = 4, 
  ease = "power4.inOut",
  className = "",
}) => {
  const containerRef = useRef(null);
  const tl = useRef(null);

  const { contextSafe } = useGSAP(() => {
    if (!containerRef.current) return;

    // Create the master timeline that controls the progress of all character tweens
    tl.current = gsap.timeline({ paused: true });
    
    const split = new SplitText(containerRef.current, { type: "chars" });

    split.chars.forEach((obj, i) => {
      const charText = obj.innerText;
      
      // Clear and rebuild the character's internal structure
      const originalText = document.createElement('div');
      originalText.className = 'originalText';
      originalText.innerText = charText;
      originalText.style.display = 'inline-block';
      
      const cloneText = document.createElement('div');
      cloneText.className = 'cloneText';
      cloneText.innerText = charText;
      cloneText.style.position = 'absolute';
      cloneText.style.top = '0';
      cloneText.style.left = '0';
      cloneText.style.width = '100%';
      cloneText.style.height = '100%';
      cloneText.style.display = 'inline-block';

      gsap.set(obj, { 
        position: 'relative', 
        overflow: 'hidden', 
        display: 'inline-block',
        verticalAlign: 'bottom' 
      });
      
      obj.innerHTML = '';
      obj.appendChild(originalText);
      obj.appendChild(cloneText);
      
      const elements = [originalText, cloneText];

      // Initial state of the clone
      gsap.set(elements[1], {
        yPercent: i % 2 === 0 ? -100 : 100
      });

      // Individual character rolling tween
      const charTween = gsap.to(elements, {
        repeat: repeatCount,
        ease: "none",
        yPercent: i % 2 === 0 ? "+=100" : "-=100"
      });
      
      // Add and spread them slightly for a wave effect if desired, 
      // but keeping them at 0 for a synchronized "scramble" start
      tl.current.add(charTween, 0);
    });

    return () => {
      split.revert();
    };
  }, { scope: containerRef, dependencies: [text, repeatCount] });

  // Hover handlers using contextSafe for GSAP scoping
  const handleMouseEnter = contextSafe(() => {
    // Only trigger if the timeline exists and is NOT currently being animated
    if (tl.current && !gsap.isTweening(tl.current)) {
      tl.current.progress(0);
      gsap.to(tl.current, { 
        progress: 1, 
        duration: duration, 
        ease: ease
      });
    }
  });


  return (
    <div 
      ref={containerRef} 
      className={`rolling-text-container cursor-pointer inline-block overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {text}
    </div>
  );
};

export default RollingTextAnimation;