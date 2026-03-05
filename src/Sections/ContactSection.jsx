import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SocialButton from "../Components/SocialButton";
import GithubImg from "../assets/octocat.png"
import LinkedinImg from "../assets/linkedin.png"

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const containerRef = useRef(null);
  const svgPathRef = useRef(null);

  useGSAP(() => {
    const path = svgPathRef.current;
    if (!path) return;

    // 1. Calculate the total length of the SVG path
    const pathLength = path.getTotalLength();

    // 2. Set the stroke dash attributes so the path is hidden initially
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // 3. Animate the strokeDashoffset to 0 to "draw" the SVG on scroll
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none", // Linear animation usually looks best for drawing lines tied to scroll
      scrollTrigger: {
        trigger: containerRef.current, // Use the Section itself
        start: "top top",      
        end: "bottom bottom", 
        scrub: 1,              
      }
    });

    // We can also force a ScrollTrigger refresh on mount/resize to ensure it calculates the new tall SVG size
    ScrollTrigger.refresh();
  }, { scope: containerRef });
return (
    <section id="contact" ref={containerRef} className="bg-zinc-800 text-white w-full flex flex-col items-center pt-24 pb-0 overflow-hidden relative">
      
      {/* Header */}
      <div className="w-full flex-shrink-0 flex flex-col items-center max-w-5xl px-8 z-20 relative">
        <p className="text-base text-center font-medium font-secondary text-grey pb-4">
          [MY CONTACTS]
        </p>
        <h2 className="text-5xl lg:text-7xl text-center font-primary mb-8 md:mb-12 relative z-30">Connect <span className="font-cursive">with me</span></h2>
      </div>

      {/* Wrapping Container for the Layout */}
      <div className="w-full flex flex-col items-center max-w-5xl px-8 mx-auto relative">
        
        {/* Contact Links & Images (Faux Document Flow offset via negative margins/absolutes within the flow to match curve) */}
        <div className="w-full absolute inset-0 z-20 pointer-events-none">
          
          {/* GitHub Container (Left side) */}
          <div className="absolute top-[10%] md:top-[12%] left-0 md:left-16 pointer-events-auto flex flex-row items-center gap-4 group">
            <img src={GithubImg} alt="Octocat" className="w-20 h-20 md:w-32 md:h-32 object-contain group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl" />
            <SocialButton 
              href="https://github.com/caizhitan" 
              label="GitHub" 
              iconPath="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" 
              className="bg-zinc-900 hover:bg-zinc-700 hover:border-zinc-500 shadow-xl" 
            />
          </div>

          {/* LinkedIn Container (Right side) */}
          <div className="absolute top-[65%] md:top-[68%] right-0 md:right-16 pointer-events-auto flex flex-row items-center gap-4 group">
            <SocialButton 
              href="https://www.linkedin.com/in/caizhitan" 
              label="LinkedIn" 
              iconPath="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" 
              className="bg-[#0A66C2] hover:bg-[#004182] text-white shadow-lg shadow-blue-900/20" 
            />
            <img src={LinkedinImg} alt="LinkedIn Logo" className="w-20 h-20 md:w-32 md:h-32 object-contain group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl" />
          </div>
        </div>

        {/* SVG Container in standard document flow to dictate parent section height correctly */}
        <div className="w-[180%] md:w-[70%] max-w-none pt-4 pb-12 z-10 pointer-events-none">
          <svg 
            viewBox="0 0 1040 2540" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            preserveAspectRatio="xMidYMin meet"
            className="w-full h-auto opacity-70"
          >
            <path 
              ref={svgPathRef} 
              d="M566.112 20.0006C566.112 20.0006 574.785 174.967 566.112 272.171C525.915 722.698 -46.3275 467.842 26.3604 904.664C89.9184 1286.62 475.072 1361.86 676.219 1203.34C763.237 1134.76 893.56 987.896 877.136 817.851C862.558 666.928 647.841 664.895 566.112 703.134C412.822 774.855 312.484 969.386 291.412 1255.02C255.451 1742.45 1095.45 1219.88 1014.49 1689.08C962.137 1992.46 546.815 2520 546.815 2520" 
              stroke="white" 
              strokeWidth="30" 
              strokeLinecap="round"
            />
          </svg>
        </div>

      </div>

    </section>
)
}