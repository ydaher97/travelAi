import { auth } from '@clerk/nextjs';
import { NextResponse } from "next/server";
import  axios  from 'axios';
import  db  from "@/lib/prismadb";

export async function DELETE(req) {
  try {
      //const {userId} = auth()

    const { itineraryId } = await req.json();
    console.log(itineraryId)
      await db.itinerary.delete({
            where: {
             id: itineraryId 
            },
        })


  
      return NextResponse.json('Itinerary deleted successfuly');
  } catch (error) {
      console.log("[itinerary]", error);
      return new NextResponse("Internal Error", { status: 500 });
  }
}
