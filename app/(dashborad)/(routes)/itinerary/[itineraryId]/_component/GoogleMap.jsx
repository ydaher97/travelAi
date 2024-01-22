
import { MapPin } from 'lucide-react';

import React, {useEffect, useState} from 'react'
import GoogleMapReact from 'google-map-react';
import CustomMarker from '@/components/CustomMarker';
const GoogleMap = ({ latitude, longitude , setCoords, setBounds, places, activities}) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const activitiesArray = Array.isArray(activities) ? activities : [];
    setMarkers([...activitiesArray]);
  }, [activities]);

  const position   = {
        lat: latitude,
        lng: longitude
      }

  return (
    <div  style={{height:'700px'}}>
      
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACES }}
        defaultCenter={position}
        center={position}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true }}
        onChange={(e) => {
          console.log(e)
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        // onChildClick={(child) => setChildClicked(child)}
       
      >
      
      {/* <CustomMarker text={' sdasd'} lat={position.lat} lng={position.lng} /> */}

      {markers.map((marker, i) => (
          <CustomMarker
            key={i}
            lat={marker?.lat}
            lng={marker?.lng}
            text={marker?.name}
          />
        ))}


      {/* {places?.map((place, i) => (
    <CustomMarker
      key={i}
      lat={place?.latitude}
      lng={place?.longitude}
      text={place?.name}
      color='#FF0000'
    />
  ))} */}
      </GoogleMapReact>
    </div>
  )
}

export default GoogleMap