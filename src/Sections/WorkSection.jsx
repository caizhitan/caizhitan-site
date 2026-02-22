import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from '../Components/ProjectCard';
import img1 from '../assets/img_1.jpg';
import img2 from '../assets/img_2.jpg';
import img3 from '../assets/img_3.jpg';
import img4 from '../assets/img_4.jpg';

gsap.registerPlugin(ScrollTrigger);


const projectData = [
  { id: 'card-1', subtitle: 'IES Prestigious Awards 2023', title: 'eNutri', description: 'A nutrition app that helps users track their daily intake and get personalized recommendations.', images: [img1, img2, img3, img4], bgColor: '#3d2fa9' },
  { id: 'card-2', subtitle: 'Fluid Structures', title: 'Skyline Drift', images: [img2], bgColor: '#ff7722' },
  { id: 'card-3', subtitle: 'Wired Thought', title: 'Neural Assembly', images: [img3, img4], bgColor: '#ff3d33' },
  { id: 'card-4', subtitle: 'Silent Repetition', title: 'Learning Loop', images: [img1, img2, img3, img4], bgColor: '#785f47' },
];

export default function WorkSection() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length === 0) return;

      const totalCards = cards.length;
      const segmentSize = totalCards > 1 ? 1 / (totalCards - 1) : 1;
      const cardYOffset = 5;
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
        end: `+=${window.innerHeight * 6}px`, // 6 screens of scrolling; adjust for speed of scrolling
        pin: true,
        pinSpacing: true,
        pinType: ScrollTrigger.isTouch === 1 ? 'fixed' : 'transform', // Forces reliable hardware-pinned positioning on mobile devices
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
    });

    return () => ctx.revert();
  }, []);

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
      <div ref={containerRef} className="relative w-full h-screen overflow-hidden" style={{ perspective: '1000px' }}>
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