import React, { useState } from 'react';
import PlaceDetails from '@/components/PlaceDetails';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Plus } from 'lucide-react';
import { useSelectedActivity } from '@/context/SelectedActivityContext';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import ActivityModal from '@/components/Modal';

const ActivityList = ({ places }) => {
  const { setActivity } = useSelectedActivity();
  const path = usePathname();
  const id = path.split('/').pop();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleActivityClick = (activity) => {
    setActivity(activity);
  };

  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleAdd = (place) => {
    setSelectedPlace(place); 
    setSelectedOption(null); 
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSelectChange = (option) => {
    setSelectedOption(option);
  };

  const handleAddActivity = async () => {
    try {
      const response = await axios.post('/api/activities/addActivity', {
        time: selectedOption,
        place: selectedPlace,
        id,
      });
      console.log(response.data);
      setModalIsOpen(false);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <>
      <Carousel
        opts={{
          align: 'center',
        }}
        className="w-3/4 ml-16"
      >
        <CarouselContent className="p-8 h-72">
          {places.map((place, index) => (
            <CarouselItem key={index} className="basis-1/2">
              <div>
                <Plus
                  style={{ cursor: 'pointer' }}
                  className="hover:opacity-70 transition-opacity duration-300"
                  onClick={() => handleAdd(place)}
                  />
              </div>

              <div className="p-1">
                <Card
                  className="transition-transform transform hover:scale-105"
                  onClick={() => handleActivityClick(place)}
                  style={{ cursor: 'pointer' }}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-1 w-full h-fit">
                    <PlaceDetails place={place} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <ActivityModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        handleAdd={handleSelectChange}
        onConfirm={handleAddActivity} 
      />
    </>
  );
};

export default ActivityList;
