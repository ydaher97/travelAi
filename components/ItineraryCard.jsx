
import {getGooglePhotoUrl,formatDate} from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { UserRound } from 'lucide-react';
  import Image from 'next/image'

  import { useRouter } from 'next/navigation'

  const ItineraryCard = ({ itinerary  }) => {
  const router = useRouter()
    const { id, location, date, duration, numPeople, photoPath} = itinerary;

 

      const handleClick  = () => {
        router.push(`/itinerary/${id}`)
        console.log('pushed')
      }
  
    return (
      <Card className="shadow-md m-5 w-64 overflow-hidden bg-white flex justify-end flex-col" onClick={handleClick}>
        <CardHeader>
          <p
            className="font-bold text-lg"
          >
            {location}
          </p>
          <p className="text-sm text-gray-500">{`${formatDate(date)} - ${duration} days`}</p>
        </CardHeader>
        <CardContent className="px-0 ">
        <div className="w-full h-40 overflow-hidden"> 
          <Image
            src={getGooglePhotoUrl(photoPath)}
            alt="Itinerary Photo"
            className="w-full h-full object-cover"
            width={200}
           height={150}
          />
        </div>
        </CardContent>
        <CardFooter >
        <UserRound /><p className="text-sm text-gray-500">
          {numPeople}
          </p>
        </CardFooter>
      </Card>
    );
  };

  export default ItineraryCard