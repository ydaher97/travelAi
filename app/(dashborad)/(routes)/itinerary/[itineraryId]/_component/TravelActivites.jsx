'use client'
import Activities from '@/components/Activities'
import  TripNavbar  from '@/components/TripNavbar'
import React, { useState } from 'react';
import ActivityList from '@/app/(dashborad)/(routes)/itinerary/[itineraryId]/_component/ActivityList';

const TravelActivites = ({activities ,places, restaurants}) => {
  const [selectedMenu, setSelectedMenu] = useState('plan');

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
  };
  return (
    <div className='mb-8'>
        <TripNavbar onMenuSelect={handleMenuSelect}/>
        {selectedMenu === 'plan' && <Activities activities={activities} />}
      {selectedMenu === 'edit' &&   <ActivityList places={restaurants}/>}
      {selectedMenu === 'view' && <ActivityList places={places}/>}
    </div>
  )
}

export default TravelActivites