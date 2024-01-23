import React from 'react'
import Image from 'next/image'

const PlaceDetails = ({place}) => {
  return (
    <div className="text-center">
      <Image
        src={place?.photo?.images.medium.url}
        alt=""
        className="max-w-full h-auto mb-4"
        width={200}
           height={150}

      />
      <div>{place.name}</div>
    </div>
  );
};


export default PlaceDetails