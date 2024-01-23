import { auth } from '@clerk/nextjs';
import { NextResponse } from "next/server";
import  axios  from 'axios';
import  db  from "@/lib/prismadb";

export async function DELETE(req) {
  try {
      //const {userId} = auth()

    const { itineraryId } = await req.json();
    await db.activity.deleteMany({
      where: {
        itineraryId: itineraryId 
       },
    })
    console.log('activity deleted')
      await db.Itinerary.delete({
            where: {
             id: itineraryId 
            },
        })
        


  
      return NextResponse.json('Itinerary deleted successfuly');
  } catch (error) {
      console.log("[delete itinerary]", error);
      return new NextResponse("Internal Error", { status: 500 });
  }
}
