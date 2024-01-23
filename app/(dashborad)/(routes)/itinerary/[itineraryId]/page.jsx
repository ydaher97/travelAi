"use client"

import React, {useEffect, useState} from 'react'
import { redirect } from "next/navigation";
import TravelPlan from './_component/TravelPlan'
import TravelActivites from './_component/TravelActivites';
import GoogleMap from './_component/GoogleMap';
import axios from 'axios'
// import ActivityList from './_component/ActivityList';
import { useRouter } from "next/navigation";
import { SelectedActivityProvider } from '@/context/SelectedActivityContext';

const ItineraryId = ({params}) => {
  const router = useRouter()
const [itineraryObj, setItinerartObj] = useState({})

const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  const [places,setPlaces] = useState([])
  const [deletedIds, setDeletedIds] = useState([]);
 

  const handleDelete = async (itineraryId) => {
    try {
      console.log(itineraryId)
      await axios.delete('/api/itinerary/deleteItinerary', { data: { itineraryId } });
      setDeletedIds((prevIds) => [...prevIds, itineraryId]);
      router.push('/home')
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    console.log('Itinerary deleted!', deletedIds);
  }, [deletedIds]);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/itinerary/getItinerary?itineraryId=${params.itineraryId}`);
      console.log(response.data);
      setItinerartObj(response.data);
    } catch (error) {
      console.error(error);
      return redirect("/home");
    }
  };

  fetchData();
}, [params.itineraryId]);


useEffect(() => {
  const getPlaces = async () => {
    try {
      if (bounds) {
        const response = await axios.get('/api/getPlacesData', {
          params: {
            sw: `${bounds.sw.lat},${bounds.sw.lng}`, 
            ne: `${bounds.ne.lat},${bounds.ne.lng}`, 
          },
        });
        console.log(response.data)
        setPlaces(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  getPlaces();
}, [bounds]);


  // return redirect(`/itinerary/${itinerary.id}/activities/${itinerary.activities[0].id}`);
  
  return(
    <>
    <SelectedActivityProvider>
    <div className="h-screen flex  flex-col md:flex-row">
      <div className="w-full overflow-y-auto  custom-scroll">
        <TravelPlan className="w-full" itinerary={itineraryObj} onDelete={() => handleDelete(itineraryObj.id)}/>
        <TravelActivites activities={itineraryObj.activities} places={places}/>
        {/* <ActivityList places={places}/> */}
      </div>
      <div className="w-full ">
      {places && <GoogleMap 
        latitude={itineraryObj.latitude}
        longitude={itineraryObj.longitude}
        setBounds={setBounds}
        setCoords={setCoords}
        places={places}
        activities={itineraryObj.activities}
        />}
      </div>
    </div>
    </SelectedActivityProvider>
    </>
  )
}

export default ItineraryId