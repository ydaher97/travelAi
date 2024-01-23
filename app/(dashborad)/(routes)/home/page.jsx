

import Itineraries from "@/components/Itineraries";
import  db  from "@/lib/prismadb";
import Image from 'next/image'

 import { auth } from "@clerk/nextjs";
const Home = async() => {
    const { userId } = auth();
    const itinerary = await db.itinerary.findMany({
       where: {
         userId: userId,
       }, orderBy: {
        id: "desc"
      },
   });
    return(
      <div className="m-6">
      {itinerary.length === 0 ? (
        <div className="flex justify-center items-center flex-col h-screen" >
          <h2 className="text-2xl">no trips found</h2>
          <Image src="/pana.svg" width={300}
           height={200} alt="Empty Itinerary" />
        </div>
      ) : (
        <div>
          <Itineraries itinerary={itinerary} />
        </div>
      )}
    </div>
    )
}

export default Home