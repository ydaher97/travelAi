import ItineraryCard from './ItineraryCard';
import { PlaneTakeoff } from 'lucide-react';

const Itineraries = ({ itinerary }) => {

  return (
    <>
    <div>
      <h2 className="text-gray-500 my-3 text-2xl font-bold">  <PlaneTakeoff className='text-2xl mx-2'/> My trips</h2>
    </div>
    <div className="flex  flex-wrap -mx-4">
      {itinerary.map((itinerary) => (
         
          <ItineraryCard key={itinerary.id} itinerary={itinerary} />
        
      ))}
    </div>
    </>
  );
};

export default Itineraries;
