"use client";

import React from 'react';

interface ColorOptionProps {
  color: string;
  isSelected: boolean;
  onSelect: () => void;
}

const ColorOption: React.FC<ColorOptionProps> = ({ color, isSelected, onSelect }) => {
  return (
    <div
      className={`w-10 h-10 rounded-full border-2 ${isSelected ? 'border-black' : ''} flex items-center justify-center cursor-pointer`}
      onClick={onSelect}
    >
      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color }}></div>
    </div>
  );
};

export default ColorOption;