"use client"
import React, { useEffect,useState } from 'react';
import { MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

const CustomMarker = ({ text }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
      {isMobile ? (
        <MapPin width={20} height={20} color='#FF0000' />
      ) : (
        <Card className="flex flex-col items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="w-full">
          <div className="flex flex-col items-start mb-4">
            <h2 className="text-s font-semibold text-gray-900">{text}</h2>
            {/* <p className="text-sm text-gray-500">{placeData.formatted_address}</p>
            <div className="flex items-center space-x-2">
              <Image
                src={placeData.icon}
                alt={placeData.name}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">{placeData.rating} stars</span>
            </div>
            <p className="text-sm text-gray-500 mb-2">Opening Hours: {placeData.opening_hours.open_now ? 'Open Now' : 'Closed'}</p>
            <p className="text-sm text-gray-500">{placeData.user_ratings_total} reviews</p> */}
          </div>
        
        </div>
      </Card>
      )}
    </div>
  );
};

export default CustomMarker;
