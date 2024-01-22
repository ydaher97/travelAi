import React from 'react';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

const DateInput = ({ value, onChange }) => {
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);

    // Set a default time (midnight)
    selectedDate.setHours(0, 0, 0, 0);

    // Format the date in ISO-8601 DateTime format
    const formattedDate = selectedDate.toISOString();

    console.log("Formatted Date:", formattedDate);

    onChange(formattedDate);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Date:</label>
      <Input
        type="date"
        value={value ? format(new Date(value), 'yyyy-MM-dd') : ''} 
        onChange={handleDateChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default DateInput;
