import React, { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className='relative w-full'>
      {/* Dropdown Button */}
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='w-full text-sm text-black outline-none bg-white border border-gray-300 rounded-md flex items-center justify-between px-2.5 py-3 mt-2'
      >
        {value ? options.find((option) => option.value === value)?.label : placeholder}
        <span className='ml-2'>
          {isOpen ? (
            <LuChevronDown className='text-gray-500 rotate-180' />
          ) : (
            <LuChevronDown className='text-gray-500' />
          )}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className='absolute w-full bg-slate-300 border border-gray-500 rounded-md shadow-lg'>
          {options.map((option) => (
            <div
              key={option.value}
              className='px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
