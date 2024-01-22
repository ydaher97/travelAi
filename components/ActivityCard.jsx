import { getGooglePhotoUrl } from '@/lib/utils';
import React from 'react';

const ActivityCard = ({ activity }) => {
  const {
    name,
    // formatted_address,
    // photoPath,
    // rating,
    // types,
  } = activity;

  return (
    <div className="max-w-md mx-auto my-5 bg-white rounded-xl overflow-hidden shadow-md md:max-w-2xl">
      <div className="md:flex">
        {/* <img
          className="h-48 w-full object-cover md:w-48"
          src={getGooglePhotoUrl(photoPath)}  
          alt={name}
        /> */}
        <div className="p-8">
          <h2 className="text-2xl font-bold">{name}</h2>
          {/* <p className="text-gray-500">{formatted_address}</p>
          <p className="text-yellow-500">{rating}</p>
          <div className="mt-4 flex flex-wrap">
            {types.map((type, index) => (
              <span
                key={index}
                className="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded-full text-gray-700 text-sm"
              >
                {type}
              </span>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
