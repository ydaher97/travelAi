import React from 'react'

const PlaceDetails = ({place}) => {
  return (
    <div className="text-center">
      <img
        src={place?.photo?.images.medium.url}
        alt=""
        className="max-w-full h-auto mb-4"
      />
      <div>{place.name}</div>
    </div>
  );
};


export default PlaceDetails