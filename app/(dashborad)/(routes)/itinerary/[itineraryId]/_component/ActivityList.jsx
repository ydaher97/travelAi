import PlaceDetails from '@/components/PlaceDetails'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useSelectedActivity } from '@/context/SelectedActivityContext';

const ActivityList = ({places}) => {
  const { setActivity } = useSelectedActivity();

  const handleActivityClick = (activity) => {
    console.log(activity)
    setActivity(activity);
  }; 

  return (
    <>
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-3/4 ml-16"
    >
      <CarouselContent className="p-8 h-72">
        {places.map((place, index) => (
          <CarouselItem key={index} className="basis-1/2 " >
            <div className="p-1">
              <Card className="" onClick={() => handleActivityClick(place)}>
                <CardContent className="flex aspect-square items-center justify-center p-1 w-full h-fit">
                  {   
                  <PlaceDetails  place={place} />
                }
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </>
  )
}

export default ActivityList