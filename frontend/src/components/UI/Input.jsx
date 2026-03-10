import React, { forwardRef } from 'react';

/**
 * Production-ready Input component with built-in label and error handling
 */
const Input = forwardRef(({ 
  label, 
  error, 
  type = 'text', 
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all 
          ${error ? 'border-red-500' : 'border-gray-300'} 
          ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 mt-1">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
