import React, { createContext, useContext, useState } from 'react';

const SelectedActivityContext = createContext();

export const SelectedActivityProvider = ({ children }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const setActivity = (activity) => {
    setSelectedActivity(activity);
  };

  return (
    <SelectedActivityContext.Provider value={{ selectedActivity, setActivity }}>
      {children}
    </SelectedActivityContext.Provider>
  );
};

export const useSelectedActivity = () => {
  const context = useContext(SelectedActivityContext);
  if (!context) {
    throw new Error('useSelectedActivity must be used within a SelectedActivityProvider');
  }
  return context;
};
