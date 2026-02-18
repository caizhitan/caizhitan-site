import React, { useRef } from 'react';
import img1 from '../assets/img_1.jpg'
import img2 from '../assets/img_2.jpg'
import img3 from '../assets/img_3.jpg'
import TP from '../assets/TP.svg'
import LTA from '../assets/LTA.svg'
import NTU from '../assets/NTU.svg'
import ExperienceCard from '../Components/ExperienceCard'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const images = [img1, img2, img3]

  const experienceRef = useRef(null)

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
          scrub: 0.5,
          anticipatePin: 1,
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

  const cardRefs = useRef([]);

  return (
    <section id="about" className="bg-zinc-900 text-white min-h-screen">
      <div className="flex flex-col md:flex-row w-full relative">
        <div className="w-full min-h-screen md:w-1/2 md:h-screen md:sticky md:top-0 flex flex-col justify-center px-8 py-16 z-10 bg-zinc-900">
          <div className="max-w-3xl text-left pb-8">
            <p className="text-base font-medium font-secondary text-grey pb-4">
              [ABOUT ME]
            </p>
            <h2 className="text-5xl font-primary">Engineer,</h2>
            <h2 className="text-5xl font-primary">Lifelong Learner</h2>
            <h2 className="text-5xl font-cursive">and</h2>
            <h2 className="text-5xl font-primary">Coffee Lover</h2>
          </div>
          <div className="max-w-3xs text-left" >
            <p className="text-base font-medium font-secondary text-grey">
              <span className="font-bold">EEE Student</span> @ Nanyang Technology University
            </p>
            <p className="text-base font-medium font-secondary pt-2 text-grey">
              BASED IN SINGAPORE
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-0 ">
          {images.map((img, index) => (
            <div key={index} className="h-screen w-full sticky top-0 flex items-center justify-center">
              <img
                src={img}
                alt={`About Me ${index + 1}`}
                className="w-[80%] h-[60%] object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

          ))}
        </div>
      </div>

      {/* Experience Section - Wrapped for Pinning */}
      <div ref={experienceRef} className="flex flex-col md:flex-row w-full min-h-screen md:h-screen md:overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-16 relative z-10">
          <p className="text-base font-medium font-secondary text-grey pb-4">
            [MY EXPERIENCE]
          </p>
          <h2 className="text-5xl font-primary">The</h2>
          <h2 className="text-5xl font-cursive pb-2">journey</h2>
          <h2 className="text-5xl font-primary">Till Today</h2>
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

