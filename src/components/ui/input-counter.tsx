import React from "react";
import { Plus, Minus } from "lucide-react";

type InputCounterProps = {
  value: number;
  onChange: (value: number) => void;
};

export function InputCounter({ value, onChange }: InputCounterProps) {
  const increment = () => {
    onChange(value + 1);
  };

  const decrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    onChange(isNaN(newValue) || newValue < 1 ? 1 : newValue);
  };

  return (
    <div className="flex items-center gap-[1px] bg-border rounded-md px-[1px]">
      {/* Decrement Button */}
      <div className="h-full bg-white px-2 rounded-s-md">
        <button
          onClick={decrement}
          aria-label="Decrease value"
          className="focus:outline-none"
        >
          <Minus size={12} />
        </button>
      </div>

      {/* Input Field */}
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        className="border border-gray-200 text-center bg-white"
        style={{
          width: `${Math.max(2, value.toString().length + 1)}ch`, // Dynamic width
          minWidth: "3ch",
        }}
        min="1"
        aria-label="Input value"
      />

      {/* Increment Button */}
      <div className="h-full bg-white px-2 rounded-e-md">
        <button
          onClick={increment}
          aria-label="Increase value"
          className="focus:outline-none"
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
}
