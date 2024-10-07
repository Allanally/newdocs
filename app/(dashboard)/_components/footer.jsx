'use client';

import { useState, useEffect } from 'react';

const ads = [
  {
    image: '/screen.png',
    phoneNumber: '+1234567890',
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

const Footer = () => {

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="py-4">
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
    </footer>
  );
};

export default Footer;
