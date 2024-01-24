'use client'

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ActivityCard from './ActivityCard';
import { useSelectedActivity } from '@/context/SelectedActivityContext';

const Days = ({ date, activities }) => {
  const { selectedActivity, setActivity } = useSelectedActivity();

  const handleActivityClick = (activity) => {
    console.log(activity)
    setActivity(activity);
  }; 
  return (
    <>
      <Accordion className='py-5 px-3 my-5' type='single' collapsible>
        <AccordionItem value={date}>
          <AccordionTrigger>{date}</AccordionTrigger>
          <AccordionContent>
            {activities.map((activity,index) => (
            <ActivityCard
            key={activity.id}  
            activity={activity}
            selectedActivity={selectedActivity}
            onClick={() => handleActivityClick(activity)}
            />            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Days;
