import React from 'react';
import { Link } from 'react-router-dom';
import SkillList from './SkillList';

const ProjectCard = ({ project }) => {
  const {
    id,
    title,
    description,
    techStack = [],
    status,
    teamSize = 0,
    maxTeamSize,
    createdAt,
    owner,
    tags = [],
    isLookingForMembers = false
  } = project;

  const getStatusConfig = (status) => {
    switch(status?.toLowerCase()) {
      case 'planning': 
        return { 
          color: 'bg-warning-100 text-warning-800 border-warning-200', 
          icon: '📋',
          label: 'Planning'
        };
      case 'in-progress': 
        return { 
          color: 'bg-primary-100 text-primary-800 border-primary-200', 
          icon: '⚡',
          label: 'In Progress'
        };
      case 'completed': 
        return { 
          color: 'bg-success-100 text-success-800 border-success-200', 
          icon: '✅',
          label: 'Completed'
        };
      case 'on-hold': 
        return { 
          color: 'bg-secondary-100 text-secondary-800 border-secondary-200', 
          icon: '⏸️',
          label: 'On Hold'
        };
      default: 
        return { 
          color: 'bg-secondary-100 text-secondary-800 border-secondary-200', 
          icon: '📝',
          label: status || 'Unknown'
        };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className="group card-modern card-interactive p-0 overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 h-2"></div>
      
      <div className="p-6">
        {/* Title and Status */}
        <div className="flex items-start justify-between mb-4">
          <Link 
            to={`/projects/${id}`}
            className="block group-hover:text-primary-600 transition-colors flex-grow"
          >
            <h3 className="text-xl font-bold text-dark-900 line-clamp-2 mb-2 group-hover:text-gradient transition-all duration-300">
              {title}
            </h3>
          </Link>
          
          {isLookingForMembers && (
            <div className="ml-3 flex-shrink-0">
              <span className="badge bg-success-100 text-success-800 border border-success-200">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                Hiring
              </span>
            </div>
          )}
        </div>

        {/* Meta Information */}
        <div className="flex items-center flex-wrap gap-3 mb-4">
          {status && (
            <span className={`badge border ${statusConfig.color}`}>
              <span className="mr-1">{statusConfig.icon}</span>
              {statusConfig.label}
            </span>
          )}
          {createdAt && (
            <span className="text-sm text-secondary-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(createdAt)}
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-secondary-700 text-sm mb-5 line-clamp-3 leading-relaxed">
            {description}
          </p>
        )}

        {/* Tech Stack */}
        {techStack.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 mr-2 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="text-xs font-medium text-secondary-600 uppercase tracking-wide">Tech Stack</span>
            </div>
            <SkillList skills={techStack} limit={5} showCount={techStack.length > 5} />
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-5">
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-secondary-100 text-secondary-700 hover:bg-secondary-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-secondary-50 text-secondary-600">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Team Info */}
        <div className="flex items-center justify-between mb-6 p-3 bg-secondary-50 rounded-xl">
          <div className="flex items-center space-x-4 text-sm">
            <span className="flex items-center text-secondary-700">
              <svg className="w-4 h-4 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-medium">{teamSize}</span>
              {maxTeamSize && <span className="text-secondary-500">/{maxTeamSize}</span>}
              <span className="ml-1">members</span>
            </span>
            
            {owner && (
              <span className="flex items-center text-secondary-700">
                <svg className="w-4 h-4 mr-2 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">{owner.firstName} {owner.lastName}</span>
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <Link
            to={`/projects/${id}`}
            className="flex-1 btn-primary text-center text-sm py-3"
          >
            <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </Link>
          
          {isLookingForMembers && (
            <button
              className="flex-1 btn-secondary text-center text-sm py-3 border-success-300 text-success-700 hover:bg-success-50"
              onClick={() => {
                // This would typically open a modal or handle application
                console.log('Apply to project', title);
              }}
            >
              <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

