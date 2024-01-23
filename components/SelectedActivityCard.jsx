"use client"
import React from 'react';
import Image from 'next/image'
import { useSelectedActivity } from '@/context/SelectedActivityContext';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from './ui/button';

const SelectedActivityCard = () => {

  const {selectedActivity, setActivity } = useSelectedActivity();
  if (!selectedActivity) {
    return null; 
  }
  const {
    name,
    time,
    rating,
    photoUrl,
    description,
    website,
    phone,
    webUrl,
    price,
    address

  } = selectedActivity;

  return (
    <Card className="max-w-md w-2/3  mx-auto my-5 bg-white rounded-xl overflow-hidden overflow-y-auto  custom-scroll shadow-md md:max-w-2xl absolute bottom-0 right-0 z-10 p-4">
      <Button onClick={() => setActivity(null)}>x</Button>
        <CardHeader className="flex flex-row justify-between">
            <div>
            <h2 className="text-m font-bold">{name}</h2>
            <p className="text-gray-500 flex my-1 items-end">Time: {time}</p>
            <p className="text-yellow-500 flex my-1 items-end">Rating: {rating}</p>
            <p className="text-gray-500 flex my-1 items-end">price: {price}</p>

            </div>
            <Image src={photoUrl}  width={200}
           height={150} alt={name} className="w-30 h-30 object-cover" />
        </CardHeader>
        <CardContent>
            <p>{description}</p>
       

        </CardContent>
        {/* <CardContent>
            <p>{CardContent}</p>
        </CardContent>  */}
        <CardFooter>
        <p className="text-gray-500 ">phone: {phone}</p>
        <p className="text-gray-500"> {address}</p>
        <Button className="mx-2" onClick={() => window.open(website, '_blank')}>
          Website
        </Button>
        <Button  onClick={() => window.open(webUrl, '_blank')}>
          trip advisor
        </Button>
        </CardFooter>
     
     
      
    </Card>
  );
};

export default SelectedActivityCard;