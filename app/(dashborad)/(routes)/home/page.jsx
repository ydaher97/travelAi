
import  Link  from "next/link";

import Itineraries from "@/components/Itineraries";
import  db  from "@/lib/prismadb";
import { Plus  } from "lucide-react"
 
import { Button } from "@/components/ui/button"
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
   console.log(itinerary.length)
    return(
        <div className='m-6'>
            <Link href='/itinerary'><Button className="rounded-full"><Plus/> Add Trip</Button></Link>
            <div >
            <Itineraries itinerary={itinerary}/>

            </div>
        </div>
    )
}

export default Home