'use client';

import { useState, useEffect } from 'react';

const ads = [
  {
    image: '/ad1.jpg',
    phoneNumber: '+250784798564',
  },
  {
    image: '/logo.png',
    phoneNumber: '+0987654321',
  },
  {
    image: '/vercel.svg',
    phoneNumber: '+1122334455',
  },
];

const AdRotator = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" w-[90rem] max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-40">
        {ads.map((ad, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentAdIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={ad.image}
              alt={`Ad ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="p-4 text-center">
        <p className="text-lg font-semibold">Call Us: {ads[currentAdIndex].phoneNumber}</p>
      </div>
    </div>
  );
};

export default AdRotator;
