'use client'
import Activities from '@/components/Activities'
import  TripNavbar  from '@/components/TripNavbar'
import React, { useState } from 'react';
import ActivityList from '@/app/(dashborad)/(routes)/itinerary/[itineraryId]/_component/ActivityList';

const TravelActivites = ({activities ,places}) => {
  const [selectedMenu, setSelectedMenu] = useState('plan');

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
  };
  return (
    <div>
        <TripNavbar onMenuSelect={handleMenuSelect}/>
        {selectedMenu === 'plan' && <Activities activities={activities} />}
      {selectedMenu === 'edit' &&   <ActivityList places={places}/>}
      {selectedMenu === 'view' && <OtherComponent2 />}
    </div>
  )
}

export default TravelActivites