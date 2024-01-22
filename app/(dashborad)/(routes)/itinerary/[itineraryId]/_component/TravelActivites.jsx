import Activities from '@/components/Activities'
import  TripNavbar  from '@/components/TripNavbar'
import React from 'react'

const TravelActivites = ({activities}) => {
  return (
    <div>
        <TripNavbar/>
        <Activities activities={activities}/>
    </div>
  )
}

export default TravelActivites