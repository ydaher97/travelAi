import React from 'react'
import Image from 'next/image'
import { Star   } from 'lucide-react';

const PlaceDetails = ({place}) => {
  return (
    <div className="text-center h-40 w-full relative overflow-hidden">
      <Image
        src={place?.photo?.images.medium.url}
        alt=""
        className="h-20 w-full object-cover md:w-48"
        width={200}
        height={150}

      />
      <div className='overflow-hidden'>
      <h2 className="text-m ">{place.name}</h2>

      </div>
          <p className="text-yellow-500 flex my-1 items-end text-sm"><Star/> {place.rating}</p>
    </div>
  );
};


export default PlaceDetails