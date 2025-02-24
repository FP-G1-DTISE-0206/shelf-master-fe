'use client';
import { FC, useState } from "react";

interface SizeOptionProps {
  size: number;
  onSelect: (size: number) => void;
  isSelected: boolean;
  status?: 'active' | 'disabled' | 'default';
}

const SizeOption: FC<SizeOptionProps> = ({ size, onSelect, isSelected, status = 'default' }) => {
  const getStatusClasses = () => {
    if (isSelected) return 'bg-black text-white';
    if (status === 'disabled') return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    return 'bg-white text-black border cursor-pointer';
  };

  const handleClick = () => {
    if (status !== 'disabled') {
      onSelect(size);
    }
  };

  return (
    <div
      className={`flex items-center justify-center w-12 h-12 rounded-lg font-bold ${getStatusClasses()}`}
      onClick={handleClick}
    >
      {size}
    </div>
  );
};

interface SizeSelectorProps {
  sizes: number[];
  sizeStatus: { [size: number]: 'active' | 'disabled' | 'default' };
  onSizeSelect: (size: number) => void;
}

const SizeSelector: FC<SizeSelectorProps> = ({ sizes, sizeStatus, onSizeSelect }) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const handleSelect = (size: number) => {
    setSelectedSize(size);
    onSizeSelect(size);
  };

  return (
    <div className="grid grid-cols-6 gap-2">
      {sizes.map((size) => (
        <SizeOption
          key={size}
          size={size}
          isSelected={selectedSize === size}
          onSelect={handleSelect}
          status={sizeStatus[size] || 'default'}
        />
      ))}
    </div>
  );
};

interface UnifiedSizeSelectorProps {
  sizes: number[];
  sizeStatus: { [size: number]: 'active' | 'disabled' | 'default' };
  onSizeSelect: (size: number) => void;
}

const UnifiedSizeSelector: FC<UnifiedSizeSelectorProps> = ({ sizes, sizeStatus, onSizeSelect }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between mb-2">
        <p className="text-base font-semibold">Size</p>
        <p className="text-[14px] font-semibold underline uppercase cursor-pointer">Size Chart</p>
      </div>
      <SizeSelector sizes={sizes} sizeStatus={sizeStatus} onSizeSelect={onSizeSelect} />
    </div>
  );
};

export default UnifiedSizeSelector;
