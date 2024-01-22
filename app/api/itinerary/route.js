import { auth } from '@clerk/nextjs';
import { NextResponse } from "next/server";
import  axios  from 'axios';
import  db  from "@/lib/prismadb";
import {handleAttractionResponse} from "@/lib/checkResponse"
import {convertToISOString} from "@/lib/utils"

export async function POST(req) {
  try {
      const {userId} = auth()

      const {  location, latitude, longitude, date, budget,duration,numPeople,photoPath ,attractions, restaurants} = await req.json();

      if (!userId || !location || !latitude || !longitude) {
          return new NextResponse("Invalid request data", { status: 400 });
      }

      
      if (isNaN(latitude) || isNaN(longitude)) {
          return new NextResponse("Invalid latitude or longitude", { status: 400 });
      }

      const itinerary = await db.Itinerary.create({
          data: {
              userId,
              location,
              latitude,
              longitude,
              date,
              budget, 
              duration,
              numPeople,
              photoPath
          }
      });


      // const attractionResponse = await fetch('http://localhost:3000/api/suggestions', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      //     'Content-Type': 'application/json'
      //   },
      //   data: JSON.stringify({ location, budget, duration, restaurants })
      // });
      //   console.log(attractionResponse)
     
      const attractionResponse = await axios.post('http://localhost:3000/api/suggestions', {
        location, 
        date,
        budget, 
        duration,
        attractions, 
        restaurants
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        }
    });

     console.log("parsed" +attractionResponse.data)
     let activities;

     if (Array.isArray(attractionResponse.data)) {
         activities = attractionResponse.data;
     } else {
         const [jsonObjects, remainingString] = handleAttractionResponse(attractionResponse.data);
         console.log("obj", jsonObjects);
         const parsedJsonObject = JSON.parse(jsonObjects)
     
         // Handle jsonObjects as needed
         activities = parsedJsonObject?.attractions || [];
         console.log("string", remainingString);
     }
     
     // Now you can use the suggestions as needed
     activities.map(async (activity) => {
         console.log("activity", activity);
         const createActivity = await db.Activity.createMany({
             data: {
                 name: activity.name,
                 price: activity.price,
                 open: true,
                 lat: activity.location.lat,
                 lng: activity.location.lng,
                 date: convertToISOString(activity.date),
                 itineraryId: itinerary.id
             }
         });
         console.log(createActivity);
     });

   
      return NextResponse.json(itinerary);
  } catch (error) {
      console.log("[itinerary]", error);
      return new NextResponse("Internal Error", { status: 500 });
  }
}
