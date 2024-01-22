'use client'
import React, { useState, useEffect } from 'react';
import ItineraryCard from './ItineraryCard';
import axios from 'axios';

const Itineraries = ({ itinerary }) => {
  const [deletedIds, setDeletedIds] = useState([]);

  const handleDelete = async (itineraryId) => {
    try {
      await axios.delete('api/itinerary/deleteItinerary', { data: { itineraryId } });
      setDeletedIds((prevIds) => [...prevIds, itineraryId]);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    console.log('Itinerary deleted!', deletedIds);
  }, [deletedIds]);

  return (
    <div className="flex justify-around flex-wrap -mx-4">
      {itinerary.map((itinerary) => (
        !deletedIds.includes(itinerary.id) && (
          <ItineraryCard key={itinerary.id} itinerary={itinerary} onDelete={() => handleDelete(itinerary.id)} />
        )
      ))}
    </div>
  );
};

export default Itineraries;
