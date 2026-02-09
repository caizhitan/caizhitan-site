import React from 'react';

const AnimatedGradientCircle = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div 
        className="absolute inset-0 opacity-40 blur-[100px]"
        style={{
          background: 'linear-gradient(120deg, #ff6ab6, #5281c2, #fe9e68)',
        }}
      />
      <div className="absolute top-1/2 left-1/2 w-[180vmax] h-[180vmax] -translate-x-1/2 -translate-y-1/2 animate-spin-slow origin-center">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[70%] opacity-100 blur-[100px]"
          style={{
            background: 'radial-gradient(circle at 50% 30%, #ff6ab6 0%, rgba(255, 106, 182, 0.9) 40%, transparent 80%)',
          }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[90%] h-[100%] opacity-100 blur-[100px]"
          style={{
            background: 'radial-gradient(circle at 70% 70%, #5281c2 0%, rgba(82, 129, 194, 0.9) 40%, transparent 80%)',
          }}
        />
        <div 
          className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[90%] opacity-100 blur-[100px]"
          style={{
            background: 'radial-gradient(circle at 30% 70%, #fe9e68 0%, rgba(254, 158, 104, 0.9) 40%, transparent 80%)',
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 blur-[100px] opacity-40 mix-blend-overlay"
          style={{
            background: 'conic-gradient(from 0deg, #ff6ab6, #5281c2, #fe9e68, #ff6ab6)',
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedGradientCircle;
