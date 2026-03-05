import React, { forwardRef, useState, useRef } from 'react';

const ProjectCard = forwardRef(({ id, subtitle, title, description, images = [], imgSrc, bgColor, zIndex }, ref) => {
  // Support both single `imgSrc` and an array of `images`
  const displayImages = images.length > 0 ? images : (imgSrc ? [imgSrc] : []);
  
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    // Calculate which image is currently mostly in view based on snap points
    const newIndex = Math.round(scrollLeft / (clientWidth + 16)); // w-full + 1rem gap
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <div
      ref={ref}
      id={id}
      className="absolute top-1/2 left-1/2 w-[80%] h-[80vh] max-w-7xl max-h-[800px] 2xl:h-[80vh] flex flex-col justify-start p-6 rounded-2xl text-white origin-bottom will-change-transform shadow-2xl"
      style={{ backgroundColor: bgColor, zIndex }}
    >
      <div className="w-full h-full flex flex-col items-start overflow-hidden">
        
        {/* Carousel Container */}
        <div className="w-full relative">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="w-full flex items-center overflow-x-auto gap-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-4"
          >
            {displayImages.length > 0 ? (
              displayImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${title} - image ${index + 1}`}
                   className="w-full md:w-auto h-auto md:h-56 aspect-[3/2] object-cover shrink-0 snap-start"
                   style={{ borderRadius: 'calc(1rem - 0.25rem)' }}
                />
              ))
            ) : (
              <div className="h-44 md:h-56"></div>
            )}
          </div>

          {/* Dot Indicators (Only show if multiple images) */}
          {displayImages.length > 1 && (
            <div className="w-full flex justify-center gap-2 mb-2 md:hidden">
              {displayImages.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`}
                />
              ))}
            </div>
          )}
        </div>
        <div className='max-w-2xl'>
        <p className="font-secondary font-medium text-sm md:text-lg mt-4 ">{description}</p>
        </div>
      </div>
      <div className="w-full flex flex-col flex-shrink-0">
        <h1 className="font-secondary text-4xl md:text-5xl font-bold leading-none tracking-tight">{title}</h1>
        <p className="uppercase font-secondary text-sm md:text-lg mt-2 font-medium">{subtitle}</p>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
