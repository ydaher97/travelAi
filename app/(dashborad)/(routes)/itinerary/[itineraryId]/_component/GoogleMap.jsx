
import { MapPin } from 'lucide-react';

import React, {useEffect, useState} from 'react'
import GoogleMapReact from 'google-map-react';
import CustomMarker from '@/components/CustomMarker';
import { useSelectedActivity } from '@/context/SelectedActivityContext';
import SelectedActivityCard from '@/components/SelectedActivityCard';

const GoogleMap = ({ latitude, longitude , setCoords, setBounds, places, activities}) => {
  const [markers, setMarkers] = useState([]);
  const {selectedActivity, setActivity } = useSelectedActivity();

  useEffect(() => {
    const activitiesArray = Array.isArray(activities) ? activities : [];
    console.log(activitiesArray)
    setMarkers([...activitiesArray]);
  }, [activities]);
 
  const position   = {
        lat: latitude,
        lng: longitude
      }

      

  return (
    <div  style={{height:'700px'}}>
      <SelectedActivityCard selectedActivity={selectedActivity} />

      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACES }}
        defaultCenter={position}
        center={position}
        defaultZoom={13}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => {
          console.log(child)
          // setActivity(child); 
        }}       
      >
      {markers.map((marker, i) => (
        
          <CustomMarker
            key={i}
            lat={marker?.latitude}
            lng={marker?.longitude}
            text={marker?.name}
            src={marker?.photoUrl}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default GoogleMap