import { auth } from '@clerk/nextjs';
import { NextResponse } from "next/server";
import  axios  from 'axios';
import  db  from "@/lib/prismadb";
import {convertToISOString} from "@/lib/utils"

export async function POST(req) {
  try {

      const { id,place,time} = await req.json();
        console.log({place})

        const itiDate = await db.itinerary.findUnique({
            where: {
                id: id,
              },
              
        })
        console.log(itiDate)
    

         const createActivity = await db.Activity.create({
             data: {
                 name: place.name,
                 price: place.price,
                 time: time,
                 date:itiDate.date,
                 itineraryId: id,
                 description:place.description,
                 latitude: Number(place.latitude),
                 longitude: Number(place.longitude),
                 photoUrl: place.photo.images.medium.url || place.photo.images.small.url,
                 phone: place.phone,
                 website:place.website,
                 rating:place.rating,
                 webUrl:place.web_url,
                 address: place.address
             }
         });
  

   
      return NextResponse.json(createActivity);
  } catch (error) {
      console.log("[add activity]", error);
      return new NextResponse("Internal Error", { status: 500 });
  }
}
