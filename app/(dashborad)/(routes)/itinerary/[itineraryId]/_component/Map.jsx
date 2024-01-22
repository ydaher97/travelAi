"use client"
import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect } from 'react';

const MapComponent = ({ latitude, longitude }) => {
  const mapRef = React.useRef(null)

  useEffect(() => {

    const initMap = async ()=> {

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACES,
        version:'weekly'
      });

      const {Map} = await loader.importLibrary('maps');
      const position   = {
        lat: latitude,
        lng: longitude
      }
    

    const mapOptions = {
      center: position,
      zoom: 10,
      mapId: 'MY_NEXTJS_MAPID'
    }

    const map = new Map(mapRef.current, mapOptions)
  }
 
    initMap() 
  },[]);

  return(
    <div style={{height:'700px'}} ref={mapRef} >

    </div>
  )
};

export default MapComponent;
