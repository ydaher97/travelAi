import React from 'react';
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden bg-cover bg-center">
        <Image src="/12.jpg" alt="landing" width={900}
           height={900} className="w-full h-full object-cover" />
        <div className="bg-black opacity-20 absolute inset-0"></div>
      </div>
      <div className="text-center z-10 text-white">
        <h1 className="text-4xl font-bold">Your Journey Your Story</h1>
        <h3 className="text-lg">Planning your trip was never this easy</h3>
      </div>
    </div>
  );
};

export default Hero;
