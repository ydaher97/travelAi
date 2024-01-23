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

const ActivityList = ({places}) => {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-3/4 ml-16"
    >
      <CarouselContent className="p-10 h-60">
        {places.map((place, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
            <div className="p-1">
              <Card className="">
                <CardContent className="flex aspect-square items-center justify-center p-2 w-full h-fit">
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
  )
}

export default ActivityList