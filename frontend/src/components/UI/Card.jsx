import React from 'react';

const Card = ({ children, className = '', padding = 'p-5', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white border border-[#E5E7EB] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all ${onClick ? 'cursor-pointer hover:shadow-md' : ''} ${className}`}
    >
      <div className={padding}>
        {children}
      </div>
    </div>
  );
};

export default Card;
