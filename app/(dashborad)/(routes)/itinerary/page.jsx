"use client"
import React, {useState, useEffect} from 'react'
import SearchInput from '@/components/SearchInput'
import DateInput from './_component/DateInput';
import BudgetInput from './_component/BudgetInput';
import NumPeopleInput from './_component/NumPeopleInput';
import DurationInput from './_component/DurationInput';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useRouter } from "next/navigation";
import axios  from 'axios';
import  Link  from "next/link";
import Loading from "@/components/Loader"

const ItineraryPage = () => {
  const router = useRouter()
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState(0);
  const [duration, setDuration] = useState(0);

  const [numPeople, setNumPeople] = useState(0);
  const [attractions, setAttractions] = useState([]);
  const [photoPath, setPhotoPath] = useState('')
  const [restaurants, setRestaurants] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [finishedLoading, setFinishedLoading] = useState(false);


  useEffect( () => {

    const fetchAttractions = async() => {
      if(location){
        // const encodedLocation = encodeURIComponent(location);
        try {
          // const attractionResponse = await axios.get(`/api/attractions?query=${encodedLocation}+Point+Of+Interest`);
          // const attractionsData = attractionResponse.data;
          //   console.log("attrac" +attractionsData)



        //   let term = 'restaurants'
        const margin = 0.1;
        const swLat = coordinates.lat - margin;
        const swLng = coordinates.lng - margin;
        const neLat = coordinates.lat + margin;
        const neLng = coordinates.lng + margin;

        const placesResponse = await axios.get('/api/rapidAttractions', {
          params: {
            sw: `${swLat},${swLng}`,
            ne: `${neLat},${neLng}`,
          },
        });
        console.log(placesResponse.data)
        setAttractions(placesResponse.data);

        const resturanteResponse = await axios.get('/api/getPlacesData', {
          params: {
            sw: `${swLat},${swLng}`,
            ne: `${neLat},${neLng}`,
          },
        });
        console.log(resturanteResponse.data)

        setRestaurants(resturanteResponse.data)

        // const businesses = yelpResponse.data.businesses;
        //  console.log('Yelp Businesses:', response.data);
        } catch (error) {
          console.error('Error getting attractions:', error);
        }
       
      }
    }
    fetchAttractions()
   
  }, [location,coordinates.lat,coordinates.lng]);

  const handleShowMap = async () => {
     setShowLoader(false)
    try {
      if (location) {

        const response = await axios.post("/api/itinerary", { 
          location,
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          date,
          numPeople,
          budget,
          duration,
          photoPath,
          restaurants,
          attractions
           });
            setShowLoader(false)
            setFinishedLoading(true);
        router.push(`/itinerary/${response.data.id}`);
  
      }
    } catch (error) {
      console.error('Error getting attractions:', error);
    }
    
  };
 
  return (
    <>
    {showLoader ? (
      <div className="w-1/2 container mx-auto p-6 border-2 flex flex-col gap-4 ">
        <div className='self-start flex '>
        <Link href="/home">
        <div className='flex'>
        <Home className="text-2xl mx-2" />
        Home
        </div>

      </Link>
        </div>
       

        <SearchInput
          setLocation={setLocation}
          setCoordinates={setCoordinates}
          setPhotoPath={setPhotoPath}
        />

        <div>
          <DateInput value={date} onChange={setDate} />
          <DurationInput value={duration} onChange={setDuration} />
          <BudgetInput value={budget} onChange={setBudget} />
          <NumPeopleInput value={numPeople} onChange={setNumPeople} />
        </div>

        <Button type="primary" onClick={handleShowMap}>
          Create Itinerary 
        </Button>
      </div>
    ) : (
      <Loading finished={finishedLoading} />
    )}
  </>
  )
}

export default ItineraryPage