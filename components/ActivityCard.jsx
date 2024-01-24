import { getGooglePhotoUrl } from '@/lib/utils';
import React, {useState,useEffect} from 'react';
import { Star ,Calendar,Trash2   } from 'lucide-react';
import Image from 'next/image'
import { useSelectedActivity } from '@/context/SelectedActivityContext';
import { Button } from './ui/button';
import axios from 'axios'

const ActivityCard = ({ activity }) => {
  const {  setActivity } = useSelectedActivity();
  const [deletedIds, setDeletedIds] = useState([]);

  const {
    name,
    price,
    time,
    description,
    phone,
    website,
     photoUrl,
    rating,
  } = activity;

  const handleActivityClick = ()=> {
    // console.log("ActivityCard")
    // onClick()
    setActivity(activity);

  }

  const handleDelete = async (activityId) => {
    try {
      await axios.delete('/api/activities/deleteActivity', { data: { activityId } });
      setDeletedIds((prevIds) => [...prevIds, activityId]);

    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    console.log('Activity deleted!', deletedIds);
  }, [deletedIds]);

  return (
   
    <div className="max-w-md mx-auto my-5 bg-white rounded-xl overflow-hidden shadow-md md:max-w-2xl relative" >
      <div className="md:flex">
        <Image
          className="h-48 w-full object-cover md:w-48 transition-transform transform hover:scale-105"
          src={photoUrl}  
          alt={name}
          width={200}
           height={150}
           onClick={handleActivityClick}
           style={{ cursor: 'pointer' }}
                  />
        <div className="p-4 ">
          <h2 className="text-m font-bold">{name}</h2>
          <p className="text-gray-500 flex my-1 items-end"><Calendar /> {time}</p>
          <p className="text-yellow-500 flex my-1 items-end"><Star/> {rating}</p>
          <div >
            <Trash2 className="absolute right-0 bottom-0 m-4 transition-transform transform hover:scale-105" style={{ cursor: 'pointer' }} color="#e61e1e" onClick={() => handleDelete(activity.id)} />
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default ActivityCard;
