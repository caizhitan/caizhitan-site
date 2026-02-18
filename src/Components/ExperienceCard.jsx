import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ExperienceCard = forwardRef(({ img, startYear, endYear, role }, ref) => {
    const containerRef = useRef(null);
    const startYearRef = useRef(null);
    const endYearRef = useRef(null);

    // Reset text on mobile switch
    useGSAP(() => {
        let mm = gsap.matchMedia();
        
        mm.add("(max-width: 767px)", () => {
             // If we switch to mobile, force reset the text to props
             if (startYearRef.current) startYearRef.current.innerText = startYear;
             if (endYearRef.current) endYearRef.current.innerText = endYear;
        });

    }, { scope: containerRef, dependencies: [startYear, endYear] });

    const playCounterAnimation = () => {
        // Guard against running on mobile
        if (window.innerWidth < 768) return;

        if (startYearRef.current && !isNaN(parseInt(startYear))) {
            let proxy = { val: 2000 };
            gsap.to(proxy, {
                val: parseInt(startYear),
                duration: 1.5,
                ease: "power1.out",
                onUpdate: () => {
                    if (startYearRef.current) {
                        startYearRef.current.innerText = Math.floor(proxy.val);
                    }
                }
            });
        }

        if (endYearRef.current && !isNaN(parseInt(endYear))) {
            let proxy = { val: 2000 };
            gsap.to(proxy, {
                val: parseInt(endYear),
                duration: 1.5,
                ease: "power1.out",
                onUpdate: () => {
                    if (endYearRef.current) {
                        endYearRef.current.innerText = Math.floor(proxy.val);
                    }
                }
            });
        }
    };

    useImperativeHandle(ref, () => ({
        addToTimeline(tl, position) {
            tl.from(containerRef.current, {
                yPercent: 100,
                opacity: 0,
                duration: 3,
                ease: "power3.inOut",
            }, position)
            .call(playCounterAnimation, null, "<+=0.2");
        }
    }));

    return (
        <div ref={containerRef} className="experience-card w-full p-6 lg:px-12">
            <div className="flex flex-row border-b justify-between items-center border-grey">
                <div className="w-24 h-24 lg:w-32 lg:h-24 flex justify-start items-center flex-shrink-0">
                    <img
                        src={img}
                        alt=""
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
                <div className="flex flex-col items-end">
                    <h2 className="text-4xl lg:text-5xl font-primary text-white leading-none">
                        <span ref={startYearRef} className="year-start">{startYear}</span> - <span ref={endYearRef} className="year-end">{endYear}</span>
                    </h2>
                    <p className="text-sm lg:text-base font-secondary font-medium text-grey">
                        {role}
                    </p>
                </div>
            </div>
        </div>
    );
});

export default ExperienceCard;