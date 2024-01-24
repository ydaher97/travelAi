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
        const selectedAttractions = attractions.map(attraction => {
            const openingHours = attraction.hours && attraction.hours.week_ranges ? attraction.hours.week_ranges : null;
          
            return {
              attraction_name: attraction.name,
              rating: attraction.rating || null,  
              openingHours,
              locationId: attraction.location_id
            };
          });
          

    const selectedResturante = restaurants.map(restaurant => {
        const openingHours = restaurant.hours && restaurant.hours.week_ranges ? restaurant.hours.week_ranges : null;
        return{
            attraction_name: restaurant.name,
            rating: restaurant.rating || null,  
            opening_hours: openingHours,
           locationId:restaurant.location_id,
           price: restaurant.price
        }
        
      });


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

     
      const attractionResponse = await axios.post('https://travel-ai-kappa.vercel.app/api/suggestions', {
        location, 
        date,
        budget, 
        duration,
        numPeople,
        selectedAttractions, 
        selectedResturante
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
         const parsedJsonObject = await JSON.parse(jsonObjects)
        console.log({parsedJsonObject})
         // Handle jsonObjects as needed
         activities = parsedJsonObject?.attractions || parsedJsonObject || [];
         console.log("string", remainingString);
         console.log({activities})
     }
    // const activities = [
    //     {
    //         name: 'Rijksmuseum',
    //         locationId: '189379',
    //         price: 0,
    //         time: 'morning',
    //         date: '2024-01-24'
    //       },
    //       {
    //         name: 'Van Gogh Museum',
    //         locationId: '190554',
    //         price: 0,
    //         time: 'morning',
    //         date: '2024-01-24'
    //       },
    //       {
    //         name: 'Museum Het Rembrandthuis',
    //         locationId: '198999',
    //         price: 0,
    //         time: 'afternoon',
    //         date: '2024-01-24'
    //       },
    //       {
    //         name: 'Moco Museum Amsterdam',
    //         locationId: '10355655',
    //         price: 0,
    //         time: 'afternoon',
    //         date: '2024-01-24'
    //       },
    //       {
    //         name: "Graham's Kitchen",
    //         locationId: '10218656',
    //         price: '$41 - $75',
    //         time: 'night',
    //         date: '2024-01-24'
    //       }
    // ]
     
     const findAttractionById = (attractions, locationId) => {
        return attractions.find(attraction => attraction.location_id === locationId);
      };
      
      // Helper function to find a restaurant by locationId
      const findRestaurantById = (restaurants, locationId) => {
        return restaurants.find(restaurant => restaurant.location_id === locationId);
      };
      
      
    //   const fullAttractions = [];
      const fullActivities = [];
      
      activities.forEach((activity) => {
        const attraction = findAttractionById(attractions, activity.locationId);
        const restaurant = findRestaurantById(restaurants, activity.locationId);
    
        console.log(typeof activity.latitude, typeof activity.longitude);

      
        if (attraction) {
            const fullActivity = {
              ...activity,
              ...attraction,
            };
            fullActivities.push(fullActivity);
          }
        
          if (restaurant) {
            const fullActivity = {
              ...activity,
              ...restaurant,
            };
            fullActivities.push(fullActivity);
          }
      });



      fullActivities.map(async (activity) => {
        console.log(typeof activity.latitude, typeof activity.longitude);

         const createActivity = await db.Activity.createMany({
             data: {
                 name: activity.name,
                 price: activity.price,
                 time: activity.time,
                 date: convertToISOString(activity.date),
                 itineraryId: itinerary.id,
                 description:activity.description,
                 latitude: Number(activity.latitude),
                 longitude: Number(activity.longitude),
                 photoUrl: activity.photo.images.medium.url || activity.photo.images.small.url,
                 phone: activity.phone,
                 website:activity.website,
                 rating:activity.rating,
                 webUrl:activity.web_url,
                 address: activity.address
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
