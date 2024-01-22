
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

  import { useRouter } from 'next/navigation'
  const ItineraryCard = ({ itinerary , onDelete }) => {
  const router = useRouter()
    const { id, location, date, duration, numPeople, photoPath} = itinerary;

    const handleDelete =  () => {
         onDelete();
      };

      const handleClick  = () => {
        router.push(`/itinerary/${id}`)
        console.log('pushed')
      }
  
    return (
      <Card className="shadow-md m-5 w-64 overflow-hidden bg-white" onClick={handleClick}>
        <CardHeader>
          <p
            className="font-bold text-lg"
          >
            {location}
          </p>
          <p className="text-sm text-gray-500">{`${formatDate(date)} - ${duration} days`}</p>
        </CardHeader>
        <CardContent>
        <div className="w-full h-40 overflow-hidden"> 
          <img
            src={getGooglePhotoUrl(photoPath)}
            alt="Itinerary Photo"
            className="w-full h-full object-cover"
          />
        </div>
          {/* <ul className="list-none space-y-2">
            {activities.map((activity) => (
              <li key={activity.id}>
                <Icon name="check" className="mr-2" />
                {activity.name}
              </li>
            ))}
          </ul> */}
        </CardContent>
        <CardFooter>
        <UserRound /><p className="text-sm text-gray-500">
          {numPeople}
          </p>
          {/* <button onClick={handleDelete}>Delete</button> */}
        </CardFooter>
      </Card>
    );
  };

  export default ItineraryCard