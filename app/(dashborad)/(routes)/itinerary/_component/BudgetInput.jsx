import React from 'react';
import { Input } from '@/components/ui/input';

const BudgetInput = ({ value, onChange }) => {
  const handleBudgetChange = (e) => {
    const budgetValue = parseFloat(e.target.value);
    onChange(isNaN(budgetValue) ? null : budgetValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Budget:</label>
      <Input
        type="number"
        value={value}
        onChange={handleBudgetChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default BudgetInput;
