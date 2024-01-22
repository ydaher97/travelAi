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

const itineraryPage = () => {
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


  useEffect( () => {

    const fetchAttractions = async() => {
      if(location){
        const encodedLocation = encodeURIComponent(location);
        try {
          const attractionResponse = await axios.get(`/api/attractions?query=${encodedLocation}+Point+Of+Interest`);
          const attractionsData = attractionResponse.data;
            console.log("attrac" +attractionsData)
          setAttractions(attractionsData);

        // //   let term = 'restaurants'
        // const response = await axios.get('/api/getPlacesData',{
        //   params: {
        //     sw: `${coordinates.lat},${coordinates.lng}`, 
        //     ne: `${coordinates.lat},${coordinates.lng}`, 
        //   },
        // });;
        // console.log("res" +response.data)

        // setRestaurants(response.data)

        // const businesses = yelpResponse.data.businesses;
        //  console.log('Yelp Businesses:', response.data);
        } catch (error) {
          console.error('Error getting attractions:', error);
        }
       
      }
    }
    fetchAttractions()
   
  }, [location]);

  const handleShowMap = async () => {
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


        router.push(`/itinerary/${response.data.id}`);
  
      }
    } catch (error) {
      console.error('Error getting attractions:', error);
    }
    
  };
 
  return (
    <div className="container mx-auto p-4 flex flex-col gap-4 md:items-center">
      <Link href="/home"><Home className="text-2xl" /></Link>
     
      <SearchInput
    setLocation={setLocation}
    setCoordinates={setCoordinates}
    setPhotoPath={setPhotoPath}
  />

  <div >
    <DateInput value={date} onChange={setDate} />
    <DurationInput value={duration} onChange={setDuration} />
    <BudgetInput value={budget} onChange={setBudget} />
    <NumPeopleInput value={numPeople} onChange={setNumPeople} />
  </div>

  <Button type="primary" onClick={handleShowMap}>
      Show Map
    </Button>

    </div>
  )
}

export default itineraryPage