
import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import axios from 'axios';

const SearchInput = ({ setLocation, setCoordinates,setPhotoPath }) => {
  const handlePlaceSelected = async (place) => {
    const {place_id} = place
    console.log(place)
    try {
      const response = await axios.get(`/api/places?place_id=${place_id}`);
      const details = response.data.result;
      console.log(details)

      setPhotoPath(details.photos[0].photo_reference)

      setCoordinates({
        lat: details.geometry.location.lat,
        lng: details.geometry.location.lng,
      });

      setLocation(details.formatted_address);
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  return (
    <div>
            <label className="block text-gray-700 font-bold mb-2">Place:</label>
      <Autocomplete
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACES}
       
          
        query={{
          language: 'en',
        }}
        onPlaceSelected={handlePlaceSelected}
        types={['(cities)']}
        defaultValue="Amsterdam"
      />
    </div>
  );
};

export default SearchInput;
