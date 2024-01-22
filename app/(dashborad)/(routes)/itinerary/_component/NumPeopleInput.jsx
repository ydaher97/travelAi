import React from 'react';
import { Input } from '@/components/ui/input';

const NumPeopleInput = ({ value, onChange }) => {
  const handleNumPeopleChange = (e) => {
    const numPeopleValue = parseInt(e.target.value);
    onChange(isNaN(numPeopleValue) ? null : numPeopleValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Number of People:</label>
      <Input
        type="number"
        value={value}
        onChange={handleNumPeopleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default NumPeopleInput;
