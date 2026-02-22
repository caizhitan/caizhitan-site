import React from 'react';

const ScrollableImageStack = ({ images }) => {
  return (
    <div className="w-full md:w-1/2 flex flex-col gap-0 ">
      {images.map((img, index) => (
        <div key={index} className="h-screen w-full sticky top-0 flex items-center justify-center">
          <img
            src={img}
            alt={`About Me ${index + 1}`}
            className="w-[80%] h-[60%] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      ))}
    </div>
  );
};

export default ScrollableImageStack;
