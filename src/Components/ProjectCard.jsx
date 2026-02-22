import React, { forwardRef } from 'react';

const ProjectCard = forwardRef(({ id, subtitle, title, description, images = [], imgSrc, bgColor, zIndex }, ref) => {
  // Support both single `imgSrc` and an array of `images`
  const displayImages = images.length > 0 ? images : (imgSrc ? [imgSrc] : []);

  return (
    <div
      ref={ref}
      id={id}
      className="absolute top-1/2 left-1/2 w-[90%] h-[80vh] max-w-7xl max-h-[800px] 2xl:h-[85vh] flex flex-col justify-start p-6 md:p-10 rounded-3xl text-white origin-bottom will-change-transform shadow-2xl"
      style={{ backgroundColor: bgColor, zIndex }}
    >
      <div className="w-full h-full flex flex-col items-start overflow-hidden">
        <div className="w-max max-w-full mx-auto flex items-center overflow-x-auto gap-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {displayImages.length > 0 ? (
            displayImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${title} - image ${index + 1}`}
                // Best sizing for landscape: a fixed height combined with aspect-video (16:9)
                // This ensures images never stretch vertically but maintain a cinematic wide shape.
                 className="h-44 md:h-64  w-auto aspect-3/2 object-cover rounded-2xl shrink-0 snap-center"
              />
            ))
          ) : (
            <div className="h-44 md:h-64">
            </div>
          )}
        </div>
        <div className='max-w-2xl'>
        <p className="uppercase font-secondary text-sm md:text-lg mt-4 opacity-80 font-medium">{description}</p>
        </div>
      </div>
      <div className="w-full flex flex-col flex-shrink-0">
        <h1 className="font-secondary text-4xl md:text-5xl font-bold leading-none tracking-tight">{title}</h1>
        <p className="uppercase font-secondary text-sm md:text-lg mt-2 opacity-80 font-medium">{subtitle}</p>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
