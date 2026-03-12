import React from 'react';

export const Avatar = ({ name, src, size = '32px', className = '' }) => {
  const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?';
  
  return (
    <div 
      className={`rounded-full flex items-center justify-center font-semibold text-[11px] overflow-hidden bg-gray-100 text-gray-600 border border-white shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export const AvatarGroup = ({ users = [], size = '28px', limit = 3 }) => {
  const visibleUsers = users.slice(0, limit);
  const remaining = users.length - limit;

  return (
    <div className="flex -space-x-2">
      {visibleUsers.map((user, i) => (
        <Avatar key={i} name={user.name} src={user.src} size={size} className="ring-2 ring-white" />
      ))}
      {remaining > 0 && (
        <div 
          className="rounded-full bg-gray-100 text-gray-500 font-bold text-[10px] flex items-center justify-center ring-2 ring-white"
          style={{ width: size, height: size }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};
