import React from 'react';

export default function FullScreenLoader({ message = 'Loading...' }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-lg">{message}</p>
    </div>
  );
} 