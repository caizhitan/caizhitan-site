import React, { useRef } from 'react';
import TP from '../assets/TP.svg'
import LTA from '../assets/LTA.svg'
import NTU from '../assets/NTU.svg'
import ExperienceCard from '../Components/ExperienceCard'
import DescriptionText from '../Components/DescriptionText'
import { experienceData } from '../Content/ExperienceSectionContent'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ExperienceSection() {
  const experienceRef = useRef(null)
  const cardRefs = useRef([]);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray('.experience-card')

      // Ensure we have cards to animate
      if (cards.length === 0) return

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: experienceRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        }
      })

      // Animate Card 2
      if (cardRefs.current[1]) {
        cardRefs.current[1].addToTimeline(tl);
      }

      // Animate Card 3
      if (cardRefs.current[2]) {
        cardRefs.current[2].addToTimeline(tl);
      }
    });

  }, { scope: experienceRef })

  return (
    <section id="experience" className="bg-zinc-900 text-white">
      <div ref={experienceRef} className="flex flex-col md:flex-row w-full min-h-screen md:h-screen md:overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-16 relative z-10">
          <DescriptionText 
            title={experienceData.title}
            mainText={experienceData.mainText}
            subText={experienceData.subText}
          />
        </div>

        <div className="w-full min-h-screen md:w-1/2 flex flex-col justify-center items-center">
          <ExperienceCard ref={el => cardRefs.current[0] = el} img={NTU} startYear="2026" endYear="NOW" role="EEE Student" />
          <ExperienceCard ref={el => cardRefs.current[1] = el} img={LTA} startYear="2023" endYear="2024" role="Software Eng Intern" />
          <ExperienceCard ref={el => cardRefs.current[2] = el} img={TP} startYear="2021" endYear="2024" role="Dip. Computer Eng" />
        </div>
      </div>
    </section>
  )
}
