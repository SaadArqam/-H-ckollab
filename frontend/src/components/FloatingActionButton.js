import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const FloatingActionButton = () => {
  const { isSignedIn } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isSignedIn) return null;

  const actions = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      label: 'Create Project',
      to: '/create-project',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      label: 'Find Developers',
      to: '/explore',
      color: 'from-accent-500 to-accent-600'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      label: 'Messages',
      to: '/messages',
      color: 'from-success-500 to-success-600'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Items */}
      <div className={`flex flex-col-reverse space-y-reverse space-y-3 mb-3 transition-all duration-300 ${
        isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {actions.map((action, index) => (
          <div
            key={action.to}
            className={`flex items-center space-x-3 transition-all duration-300 ${
              isExpanded 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <span className="bg-white text-secondary-700 px-3 py-2 rounded-xl shadow-medium text-sm font-medium whitespace-nowrap">
              {action.label}
            </span>
            <Link
              to={action.to}
              className={`w-12 h-12 bg-gradient-to-br ${action.color} text-white rounded-full shadow-ultra hover:shadow-glow-lg transform hover:scale-110 transition-all duration-300 flex items-center justify-center`}
              onClick={() => setIsExpanded(false)}
            >
              {action.icon}
            </Link>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 text-white rounded-full shadow-ultra hover:shadow-glow-lg transform hover:scale-110 transition-all duration-300 flex items-center justify-center ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionButton;
