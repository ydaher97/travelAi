'use client'

import ItineraryCard from './ItineraryCard';
import { PlaneTakeoff } from 'lucide-react';
import React, { useState } from 'react';


const Itineraries = ({ itinerary }) => {
  const [filter, setFilter] = useState('');
  const filteredItinerary = itinerary.filter((item) =>
    item.location.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <>
    <div>
      <h2 className="text-gray-500 my-3 text-2xl font-bold">  <PlaneTakeoff className='text-2xl mx-2'/> My trips</h2>
    </div>
    <div>
    <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={handleFilterChange}
          className="border p-2 mb-3"
        />
    </div>
    <div className="flex  flex-wrap justify-center -mx-4">
      {filteredItinerary.map((itinerary) => (
         
          <ItineraryCard key={itinerary.id} itinerary={itinerary} />
        
      ))}
    </div>
    </>
  );
};

export default Itineraries;
