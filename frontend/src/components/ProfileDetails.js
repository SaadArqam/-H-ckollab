import React, { useState } from 'react';
import SkillList from './SkillList';

const ProfileDetails = ({ profile, isOwnProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profile);

  const {
    firstName,
    lastName,
    email,
    imageUrl,
    bio,
    skills = [],
    experience,
    location,
    availability,
    githubUrl,
    linkedinUrl,
    portfolioUrl,
    joinedAt,
    projectsCount = 0,
    collaborationsCount = 0
  } = profile;

  const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'Unknown Developer';

  const getExperienceLabel = (exp) => {
    switch(exp) {
      case 'junior': return 'Junior (0-2 years)';
      case 'mid': return 'Mid-level (2-5 years)';
      case 'senior': return 'Senior (5+ years)';
      case 'lead': return 'Tech Lead/Architect';
      default: return exp || 'Not specified';
    }
  };

  const getAvailabilityColor = (avail) => {
    switch(avail) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'freelance': return 'bg-purple-100 text-purple-800';
      case 'contract': return 'bg-orange-100 text-orange-800';
      case 'open': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatJoinDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long'
    });
  };

  const handleSaveProfile = async () => {
    // This would typically make an API call to update the profile
    console.log('Saving profile:', editData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-6">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Profile</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={editData.firstName || ''}
                  onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={editData.lastName || ''}
                  onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={editData.bio || ''}
                onChange={(e) => setEditData({...editData, bio: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell others about yourself..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={editData.location || ''}
                onChange={(e) => setEditData({...editData, location: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City, Country"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditData(profile);
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={fullName}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 flex items-center justify-center">
              <svg className="w-12 h-12 md:w-16 md:h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="flex-grow">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{fullName}</h1>
              {email && (
                <p className="text-gray-600 mt-1">{email}</p>
              )}
            </div>
            
            {isOwnProfile && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {experience && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {getExperienceLabel(experience)}
              </span>
            )}
            {availability && (
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(availability)}`}>
                {availability.replace('-', ' ')}
              </span>
            )}
          </div>

          {/* Location & Join Date */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
            {location && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </span>
            )}
            {joinedAt && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Joined {formatJoinDate(joinedAt)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      {bio && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
          <p className="text-gray-700 leading-relaxed">{bio}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
          <SkillList skills={skills} size="md" />
        </div>
      )}

      {/* Links */}
      {(githubUrl || linkedinUrl || portfolioUrl) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Links</h3>
          <div className="flex flex-wrap gap-4">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            )}
            {portfolioUrl && (
              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Portfolio</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{projectsCount}</div>
          <div className="text-sm text-gray-600">Projects</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{collaborationsCount}</div>
          <div className="text-sm text-gray-600">Collaborations</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{skills.length}</div>
          <div className="text-sm text-gray-600">Skills</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {joinedAt ? Math.floor((Date.now() - new Date(joinedAt)) / (1000 * 60 * 60 * 24 * 30)) : 0}
          </div>
          <div className="text-sm text-gray-600">Months Active</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
