import { auth } from '@clerk/nextjs';
import { NextResponse } from "next/server";
import  axios  from 'axios';
import  db  from "@/lib/prismadb";

export async function GET(req) {
  try {
    const url = new URL(req.url, 'http://localhost:3000');
    const itineraryId = url.searchParams.get('itineraryId');
      const itinerary = await db.Itinerary.findUnique({
        where: {
          id: itineraryId,
        },
        include: {
          activities: {
            where: {
              itineraryId: itineraryId,
            },
          }
        }
      });

console.log(itinerary)
  
      return NextResponse.json(itinerary , {status:200});
  } catch (error) {
      console.log("[itinerary]", error);
      return new NextResponse("Internal Error", { status: 500 });
  }
}
