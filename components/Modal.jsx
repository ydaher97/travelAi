// components/Modal.js
import React from 'react';
import Modal from 'react-modal';
import { Button } from './ui/button';
const ActivityModal = ({ isOpen, onRequestClose, handleAdd, onConfirm }) => {
  const options = ['morning', 'afternoon', 'evening'];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Activity Modal"
      className="modal" // Apply the "modal" class
    >
      <div className="w-64 mx-auto p-4 bg-gray-400 rounded-sm">
        <h2 className="text-xl font-bold mb-4">Select a time:</h2>
        <select
          className="w-full border p-2 rounded"
          onChange={(e) => handleAdd(e.target.value)}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onConfirm}
        >
          Confirm
        </Button>
        <Button
       
          className="m-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          onClick={onRequestClose}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ActivityModal;
