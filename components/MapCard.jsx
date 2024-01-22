import Image from 'next/image';
import { Card } from '@/components/ui/card';

const placeData = {
  // Your place data here
};

const PhotoCard = ({ placeData }) => {
  return (
    <Card className="flex flex-col items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="w-full">
        <div className="flex flex-col items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{placeData.name}</h2>
          <p className="text-sm text-gray-500">{placeData.formatted_address}</p>
          <div className="flex items-center space-x-2">
            <Image
              src={placeData.icon}
              alt={placeData.name}
              width={24}
              height={24}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">{placeData.rating} stars</span>
          </div>
          {/* Additional fields */}
          <p className="text-sm text-gray-500 mb-2">Opening Hours: {placeData.opening_hours.open_now ? 'Open Now' : 'Closed'}</p>
          <p className="text-sm text-gray-500">{placeData.user_ratings_total} reviews</p>
        </div>
        <Image
          src={placeData.photos[0].getUrl()} // Assuming photos is an array of Photo objects
          alt={placeData.name}
          layout="fill"
          className="w-64 h-64 object-cover rounded-lg"
        />
      </div>
    </Card>
  );
};

export default PhotoCard;
