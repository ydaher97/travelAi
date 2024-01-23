import React from 'react';
import  Link  from "next/link";
import { getGooglePhotoUrl,formatDate } from '@/lib/utils';
import Image from 'next/image'
const TravelPlan = ({ itinerary, onDelete }) => {
  const { location, date, duration, photoPath } = itinerary;

  const handleDelete =  () => {
    onDelete();
 };

  return (
    <div className="relative">
      <div className='absolute z-50 p-4 bg-gradient-to-b from-transparent text-white font-bold'>
      <Link href="/home" ><button>home</button></Link>
      <button onClick={handleDelete}>Delete</button>
      </div>
       

    <Image
      src={getGooglePhotoUrl(photoPath)}
      alt="Itinerary Photo"
      className="w-full h-[370px] object-cover"
      width={200}
           height={150}
    />

    <div
      className="absolute inset-0 p-4 bg-gradient-to-b from-transparent to-black/50 flex flex-col justify-end items-start"
    >
      <h1 className="text-white font-bold">{location}</h1>
      <p className="text-white">{formatDate(date)}</p>
      <p className="text-white">Duration: {duration} days</p>
    </div>
  </div>
  );
};

export default TravelPlan;
