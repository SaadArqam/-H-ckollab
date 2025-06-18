import React from 'react';
import { Link } from 'react-router-dom';
import SkillList from './SkillList';

const DeveloperCard = ({ developer }) => {
  const {
    id,
    firstName,
    lastName,
    email,
    imageUrl,
    bio,
    skills = [],
    experience,
    location,
    availability,
    projectsCount = 0,
    collaborationsCount = 0
  } = developer;

  const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'Unknown Developer';

  const getExperienceConfig = (exp) => {
    switch(exp) {
      case 'junior': 
        return { 
          label: 'Junior (0-2 years)', 
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: '🌱'
        };
      case 'mid': 
        return { 
          label: 'Mid-level (2-5 years)', 
          color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          icon: '🚀'
        };
      case 'senior': 
        return { 
          label: 'Senior (5+ years)', 
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: '⭐'
        };
      case 'lead': 
        return { 
          label: 'Tech Lead/Architect', 
          color: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: '👑'
        };
      default: 
        return { 
          label: exp || 'Not specified', 
          color: 'bg-secondary-100 text-secondary-800 border-secondary-200',
          icon: '💼'
        };
    }
  };

  const getAvailabilityConfig = (avail) => {
    switch(avail) {
      case 'full-time': 
        return { 
          color: 'bg-success-100 text-success-800 border-success-200', 
          icon: '💼',
          label: 'Full-time'
        };
      case 'part-time': 
        return { 
          color: 'bg-primary-100 text-primary-800 border-primary-200', 
          icon: '⏰',
          label: 'Part-time'
        };
      case 'freelance': 
        return { 
          color: 'bg-accent-100 text-accent-800 border-accent-200', 
          icon: '✨',
          label: 'Freelance'
        };
      case 'contract': 
        return { 
          color: 'bg-warning-100 text-warning-800 border-warning-200', 
          icon: '📋',
          label: 'Contract'
        };
      case 'open': 
        return { 
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200', 
          icon: '🎯',
          label: 'Open to opportunities'
        };
      default: 
        return { 
          color: 'bg-secondary-100 text-secondary-800 border-secondary-200', 
          icon: '❓',
          label: avail || 'Not specified'
        };
    }
  };

  const experienceConfig = getExperienceConfig(experience);
  const availabilityConfig = getAvailabilityConfig(availability);

  return (
    <div className="group card-modern card-interactive p-0 overflow-hidden">
      {/* Header gradient */}
      <div className="bg-gradient-to-r from-accent-500 to-primary-500 h-2"></div>
      
      <div className="p-6">
        {/* Profile Header */}
        <div className="flex items-start space-x-4 mb-5">
          <div className="flex-shrink-0 relative">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={fullName}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary-100 group-hover:ring-primary-300 transition-all duration-300"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center ring-2 ring-primary-100 group-hover:ring-primary-300 transition-all duration-300">
                <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            )}
            
            {/* Online status indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-2 border-white"></div>
          </div>
          
          <div className="flex-grow min-w-0">
            <Link 
              to={`/profile/${id}`}
              className="block group"
            >
              <h3 className="text-xl font-bold text-dark-900 group-hover:text-gradient transition-all duration-300 truncate mb-1">
                {fullName}
              </h3>
            </Link>
            
            {location && (
              <div className="flex items-center text-sm text-secondary-600 mb-2">
                <svg className="w-4 h-4 mr-1 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </div>
            )}

            {/* Quick stats */}
            <div className="flex items-center space-x-3 text-xs text-secondary-600">
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {projectsCount} projects
              </span>
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {collaborationsCount} collaborations
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        {bio && (
          <p className="text-secondary-700 text-sm mb-5 line-clamp-3 leading-relaxed">
            {bio}
          </p>
        )}

        {/* Experience & Availability */}
        <div className="flex flex-wrap gap-2 mb-5">
          {experience && (
            <span className={`badge border ${experienceConfig.color}`}>
              <span className="mr-1">{experienceConfig.icon}</span>
              {experienceConfig.label}
            </span>
          )}
          {availability && (
            <span className={`badge border ${availabilityConfig.color}`}>
              <span className="mr-1">{availabilityConfig.icon}</span>
              {availabilityConfig.label}
            </span>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <svg className="w-4 h-4 mr-2 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="text-xs font-medium text-secondary-600 uppercase tracking-wide">Skills & Technologies</span>
            </div>
            <SkillList skills={skills.slice(0, 6)} limit={6} showCount={skills.length > 6} />
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <Link
            to={`/profile/${id}`}
            className="flex-1 btn-primary text-center text-sm py-3"
          >
            <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            View Profile
          </Link>
          <button
            className="flex-1 btn-secondary text-center text-sm py-3"
            onClick={() => {
              // This would typically open a modal or redirect to messaging
              console.log('Send message to', fullName);
            }}
          >
            <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
