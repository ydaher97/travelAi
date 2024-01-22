import React from 'react';
import  Link  from "next/link";
import { getGooglePhotoUrl,formatDate } from '@/lib/utils';

const TravelPlan = ({ itinerary, onDelete }) => {
  const { location, date, duration, photoPath } = itinerary;

  const handleDelete =  () => {
    onDelete();
 };

  // const getGooglePhotoUrl = (photoReference) => {
  //   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACES;
  //   return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoReference}&key=${apiKey}`;
  // };

  return (
    <div className="relative">
      <div className='absolute z-50 p-4 bg-gradient-to-b from-transparent text-white font-bold'>
      <Link href="/home" ><button>home</button></Link>
      <button onClick={handleDelete}>Delete</button>
      </div>
       

    <img
      src={getGooglePhotoUrl(photoPath)}
      alt="Itinerary Photo"
      className="w-full h-[370px] object-cover"
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
