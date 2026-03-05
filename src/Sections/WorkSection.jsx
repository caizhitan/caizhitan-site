import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ProjectCard from '../Components/ProjectCard';
import { projectData } from '../Content/WorkSectionContent';

gsap.registerPlugin(ScrollTrigger);

export default function WorkSection() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const totalCards = cards.length;
    const segmentSize = totalCards > 1 ? 1 / (totalCards - 1) : 1;
    const cardYOffset = 3;
    const cardScaleStep = 0.075;

    // Cards setup
    cards.forEach((card, i) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50 + i * cardYOffset,
        scale: 1 - i * cardScaleStep,
        rotationX: 0,
      });
    });

    // Pin ONLY the cards container. Let the header scroll away naturally!
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top", // When the cards container fully enters the screen
      end: "+=600%", // 6 screens of scrolling, dynamically measures trigger height on resize
      invalidateOnRefresh: true,
      pin: true,
      pinSpacing: true,
      //pinType: ScrollTrigger.isTouch === 1 ? 'fixed' : 'transform', // Forces reliable hardware-pinned positioning on mobile devices
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;

        const activeIndex = Math.min(
          Math.floor(progress / segmentSize),
          totalCards - 1,
        );
        const segProgress = (progress - activeIndex * segmentSize) / segmentSize;

        cards.forEach((card, i) => {
          if (i < activeIndex) {
            gsap.set(card, {
              yPercent: -250,
              rotationX: 50,
            });
          } else if (i === activeIndex) {
            gsap.set(card, {
              yPercent: gsap.utils.interpolate(-50, -200, segProgress),
              rotationX: gsap.utils.interpolate(0, 50, segProgress),
              scale: 1,
            });
          } else {
            const behindIndex = i - activeIndex;
            const currentYOffset = (behindIndex - segProgress) * cardYOffset;
            const currentScale = 1 - (behindIndex - segProgress) * cardScaleStep;

            gsap.set(card, {
              yPercent: -50 + currentYOffset,
              rotationX: 0,
              scale: currentScale,
            });
          }
        });
      },
    });
  }, { scope: containerRef });

  return (
    <section id="work" className="bg-zinc-800 text-white w-full">
      {/* Scrollable Header */}
      <div className="w-full flex-shrink-0 flex flex-col items-center max-w-5xl px-8 mx-auto z-20 pointer-events-none pt-16">
        <p className="text-base text-center font-medium font-secondary text-grey pb-4">
          [MY PROJECTS]
        </p>
        <h2 className="text-5xl lg:text-7xl text-center font-primary">Featured Engineering <span className="font-cursive">endeavours</span></h2>
      </div>

      {/* Pinned Cards Container */}
      <div 
        ref={containerRef} 
        className="relative w-full h-screen overflow-hidden" 
        style={{ 
          perspective: '1000px', 
          clipPath: 'inset(0)',
          transform: 'translateZ(0)',
          maskImage: 'linear-gradient(white, white)',
          WebkitMaskImage: 'linear-gradient(white, white)'
        }}
      >
        {projectData.map((data, index) => (
          <ProjectCard
            key={data.id}
            ref={(el) => (cardsRef.current[index] = el)}
            id={data.id}
            description={data.description}
            subtitle={data.subtitle}
            title={data.title}
            images={data.images}
            bgColor={data.bgColor}
            zIndex={projectData.length - index}
          />
        ))}
      </div>
    </section>
  )
}