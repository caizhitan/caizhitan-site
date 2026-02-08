import React from 'react';
import Header from '../Header';
import Button from '../Button';

export default function LandingContent() {
    return (
        <>
            {/* Header / Post-Load Content */}
            <div className="fade-in-content opacity-0 pointer-events-none absolute top-0 left-0 w-full h-full z-60 flex flex-col justify-between">
                <Header />
            </div>

            {/* Hero Header (Big Text) */}
            <div className="hero-header absolute bottom-8 w-full z-20">
                <h1 className="uppercase text-center text-[15vw] font-medium leading-[0.85] font-primary">CAI ZHI TAN</h1>
            </div>

            {/* Chinese Text
            <div className="fade-in-content opacity-0 pointer-events-none absolute bottom-32 right-8 z-20">
                <p className="text-4xl font-chinese text-black">
                    [陈才智]
                </p>
            </div> */}
        </>
    );
}
