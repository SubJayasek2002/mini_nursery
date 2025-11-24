// src/components/Banner.tsx
import React from 'react';

interface BannerProps {
  children: React.ReactNode;
}

const Banner: React.FC<BannerProps> = ({ children }) => {
  return (
    <div className="container mt-4">
      <div className="p-4 bg-light rounded text-center">
        {children}
      </div>
    </div>
  );
};

export default Banner;
