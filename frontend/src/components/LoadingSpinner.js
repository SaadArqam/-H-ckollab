import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...', cosmic = false }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  if (cosmic) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 border-4 border-transparent border-t-primary-500 border-r-accent-500 rounded-full animate-spin"></div>
          {/* Inner ring */}
          <div className="absolute inset-2 w-8 h-8 border-4 border-transparent border-b-accent-500 border-l-primary-500 rounded-full animate-spin animation-reverse"></div>
          {/* Center dot */}
          <div className="absolute inset-6 w-4 h-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full animate-pulse"></div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gradient mb-2">{text}</div>
          <div className="text-sm text-secondary-500">Preparing something amazing...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <div className={`${sizeClasses[size]} border-2 border-secondary-200 border-t-primary-500 rounded-full animate-spin`}></div>
      {text && <span className="text-secondary-600 font-medium">{text}</span>}
    </div>
  );
};

const LoadingSkeleton = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className={`skeleton h-4 rounded ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
          style={{ animationDelay: `${i * 100}ms` }}
        ></div>
      ))}
    </div>
  );
};

const LoadingCard = () => {
  return (
    <div className="card-modern p-6 animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="skeleton-circle"></div>
        <div className="flex-1">
          <div className="skeleton h-4 w-1/2 mb-2"></div>
          <div className="skeleton h-3 w-1/4"></div>
        </div>
      </div>
      <LoadingSkeleton lines={3} />
      <div className="flex space-x-2 mt-4">
        <div className="skeleton w-16 h-6 rounded-full"></div>
        <div className="skeleton w-20 h-6 rounded-full"></div>
        <div className="skeleton w-14 h-6 rounded-full"></div>
      </div>
    </div>
  );
};

const LoadingGrid = ({ count = 6, cols = 3 }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols} gap-6`}>
      {[...Array(count)].map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
};

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="text-center">
        <LoadingSpinner cosmic={true} text="Loading H@ckollab" />
        <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm mx-auto">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-2 bg-gradient-to-r from-primary-200 to-accent-200 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { LoadingSpinner, LoadingSkeleton, LoadingCard, LoadingGrid, LoadingPage };
export default LoadingSpinner;
