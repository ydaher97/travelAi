import { getGooglePhotoUrl } from '@/lib/utils';
import React from 'react';
import { Star ,Calendar  } from 'lucide-react';
import Image from 'next/image'

const ActivityCard = ({ activity , selectedActivity, onClick}) => {

  const {
    name,
    price,
    time,
    description,
    phone,
    website,
     photoUrl,
    rating,
  } = activity;

  return (
    <div className="max-w-md mx-auto my-5 bg-white rounded-xl overflow-hidden shadow-md md:max-w-2xl" onClick={onClick}>
      <div className="md:flex">
        <Image
          className="h-48 w-full object-cover md:w-48"
          src={photoUrl}  
          alt={name}
          width={200}
           height={150}
                  />
        <div className="p-4">
          <h2 className="text-m font-bold">{name}</h2>
          <p className="text-gray-500 flex my-1 items-end"><Calendar /> {time}</p>
          <p className="text-yellow-500 flex my-1 items-end"><Star/> {rating}</p>
          <div className="mt-4 flex flex-wrap">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
