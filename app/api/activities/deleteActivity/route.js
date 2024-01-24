import { auth } from '@clerk/nextjs';
import { NextResponse } from "next/server";
import  axios  from 'axios';
import  db  from "@/lib/prismadb";

export async function DELETE(req) {
  try {
      //const {userId} = auth()

    const { activityId } = await req.json();
    await db.activity.delete({
      where: {
        id: activityId 
       },
    })
  


  
      return NextResponse.json('activity deleted successfuly');
  } catch (error) {
      console.log("[delete activity]", error);
      return new NextResponse("Internal Error", { status: 500 });
  }
}
