import React from 'react'
import BudgetBreackdown from './BudgetBreackdown'
import Days from './Days'



const calculateTotalPrice = (activitiesForDate) => {
  const activitiesWithPrice = activitiesForDate.filter((activity) => typeof activity.price === 'string');

  const totalPrice = activitiesWithPrice.reduce((total, activity) => {
    const priceRange = activity.price.replace(/\$/g, ''); // Remove dollar signs
    const prices = priceRange.split('-').map((price) => parseInt(price.trim(), 10));


    if (prices.some(isNaN)) {
      console.error('Invalid price format for activity:');
      return total; 
    }

    const averagePrice = prices.reduce((sum, value) => sum + value, 0) / prices.length;

    if (isNaN(averagePrice)) {
      console.error('Average price is NaN for activity:');
      return total; 
    }

    return total + averagePrice;
  }, 0);

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