import React from 'react';
import { Input } from '@/components/ui/input';

const DurationInput = ({ value, onChange }) => {
  const handleDurationChange = (e) => {
    const durationValue = parseInt(e.target.value);
    onChange(isNaN(durationValue) ? null : durationValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Duration (in days):</label>
      <Input
        type="number"
        value={value}
        onChange={handleDurationChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default DurationInput;
