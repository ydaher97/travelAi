import React from 'react'
import BudgetBreackdown from './BudgetBreackdown'
import Days from './Days'



const calculateTotalPrice = (activitiesForDate) => {
  const activitiesWithPrice = activitiesForDate.filter((activity) => typeof activity.price === 'number');

  const totalPrice = activitiesWithPrice.reduce((total, activity) => total + activity.price, 0);

  return totalPrice;
};


const Activities = ({activities}) => {
  const activitiesByDate = activities?.reduce((acc, activity) => {
    const date = new Date(activity.date).toLocaleDateString(); // Convert date to string for grouping
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(activity);
    return acc;
  }, {});

  const totalCostForAllDays = Object.values(activitiesByDate || {}).reduce(
    (total, activitiesForDate) => total + calculateTotalPrice(activitiesForDate),
    0
  );
  
  return (
    <div className='py-5 px-3' >
       {activitiesByDate && Object.entries(activitiesByDate).map(([date, activitiesForDate]) => (
        <Days key={date} date={date} activities={activitiesForDate} />
      ))}
      <BudgetBreackdown totalCost={totalCostForAllDays} />
    </div>
  )
}

export default Activities