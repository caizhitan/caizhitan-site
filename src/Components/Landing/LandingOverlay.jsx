import React, { forwardRef } from 'react';

const LandingOverlay = forwardRef((props,ref) => {
    return (
        <div className="hero-overlay absolute top-0 left-0 w-full h-svh bg-[#0f0f0f] z-40 [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
            <div className="counter absolute right-8 bottom-8 text-white">
                <h1 ref={ref} className="text-[4rem] font-medium font-primary">0</h1>
            </div>

            <div className="overlay-text-container absolute top-8 left-8 h-8 overflow-hidden">
                <div className="overlay-text flex flex-col translate-y-8">
                    <p className="active text-white h-8 flex items-center uppercase font-secondary text-base font-medium leading-tight">Structure</p>
                    <p className="text-white h-8 flex items-center uppercase font-secondary text-base font-medium leading-tight">Designed Identity</p>
                    <p className="text-white h-8 flex items-center uppercase font-secondary text-base font-medium leading-tight">Welcome</p>
                </div>
            </div>
        </div>
    );
});

LandingOverlay.displayName = 'LandingOverlay';
export default LandingOverlay;
